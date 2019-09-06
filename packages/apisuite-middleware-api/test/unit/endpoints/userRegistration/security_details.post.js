const { afterEach, before, after, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')
const chance = require('../../../mocks/chance')

const config = require('../../../../src/config')
const Hapi = require('hapi')
const server = new Hapi.Server(config.get('server'))

const plugins = [
	require('hapi-auth-bearer-token'),
	require('../../../../src/plugins/userRegistration'),
]

const user2faService = require('../../../../src/services/user2fa')
const userRegistrationService = require('../../../../src/services/userRegistration')
const userService = require('../../../../src/services/user')
const emailService = require('../../../../src/services/email')
const sandboxAuthServer = require('../../../../src/services/sandboxAuthServer')

const UserRegistrationTicket = require('../../../../src/models/UserRegistrationTicket')
const UserActivationTicket = require('../../../../src/models/UserActivationTicket')
const User = require('../../../../src/models/User')
const Organization = require('../../../../src/models/Organization')

const stubs = {}

describe.skip('(UNIT) POST /users_registration/security_details', async () => {

	before(async () => {
		await server.register(plugins)
		await server.start()
	})

	after(async () => {
		await server.stop()
	})

	afterEach(async () => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})

	describe('Successful request', async () => {
		const securityDetails = {
			password: chance.string({ length: 5 }),
			method: chance.pickone(['authorizationApp', 'authorizationSms']),
			confirmationCode: chance.string({ pool: '1234567890', lenght: 6 }),
		}

		const registrationTicket = {
			id: chance.integer({ min: 1, max: 10 }),
			registration_code: chance.string({ length: 48 }),
			ip_address: chance.ip(),
			expires_at: new Date(new Date().getTime() + 1000000000).toString(),
			totp_secret: chance.string({ length: 32 }),
			email: chance.email(),
			full_name: chance.name(),
			phone_number: chance.phone(),
			organization_name: chance.company(),
			organization_vat: chance.string({ pool: '1234567890' }),
			organization_website: chance.url(),
			organization_role: chance.profession(),
		}

		const activationTicket = {
			id: chance.integer({ min: 1, max: 10 }),
			activation_code: chance.string({ length: 48 }),
			expires_at: new Date(new Date().getTime() + 1000000000).toString(),
		}

		const userId = chance.integer({ min: 1, max: 10 })
		const orgId = chance.integer({ min: 1, max: 10 })

		let error, resp

		before(async () => {

			stubs.validateRegistrationToken = stub(userRegistrationService, 'validateRegistrationToken')
				.resolves(new UserRegistrationTicket(registrationTicket))

			stubs.verifyTOTP = stub(user2faService, 'verifyTOTP')
				.returns(true)

			stubs.submitUserRegistration = stub(userRegistrationService, 'submitUserRegistration')
				.resolves({
					user: new User({
						id: userId,
						name: registrationTicket.name,
						email: registrationTicket.email,
						full_name: registrationTicket.full_name,
						phone_number: registrationTicket.phone_number,
						password: chance.string({ length: 10 }),
					}),
					organization: new Organization({
						id: orgId,
						name: registrationTicket.organization_name,
						vat_number: registrationTicket.organization_vat,
						website: registrationTicket.organization_website,
					}),
				})

			stubs.generateUserActivationTicket = stub(userService, 'generateUserActivationTicket')
				.resolves(new UserActivationTicket(activationTicket))

			stubs.sendUserAccountActivationCode = stub(emailService, 'sendUserAccountActivationCode')
				.resolves()

			stubs.generateUserRecoveryCodes = stub(user2faService, 'generateUserRecoveryCodes')
				.resolves({ codes: [] })

			stubs.createOrganizationContainer = stub(sandboxAuthServer, 'createOrganizationContainer')
				.resolves({})

			try {
				resp = await server.inject({
					headers: {
						'authorization': `Bearer ${registrationTicket.registrationCode}`,
					},
					method: 'POST',
					payload: securityDetails,
					url: '/users_registration/security_details',
				})
			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})

		it('Should validate the registration token', () => {
			expect(stubs.validateRegistrationToken.calledWith(registrationTicket.registrationCode)).to.be.true()
		})

		it('Should verify 2fa totp', () => {
			expect(stubs.verifyTOTP.calledWith(registrationTicket.totp_secret, 'base32', securityDetails.confirmationCode)).to.be.true()
		})

		it('2fa totp validation should suceed', () => {
			expect(stubs.verifyTOTP).to.be.true()
		})

		it('Should submit registration', () => {
			expect(stubs.submitUserRegistration.calledWith(securityDetails, registrationTicket, securityDetails.confirmationCode)).to.be.true()
		})

		it('Should generate an activation ticket', () => {
			expect(stubs.generateUserActivationTicket.calledWith(userId)).to.be.true()
		})

		it('Should send the activation code through email', () => {
			expect(stubs.sendUserAccountActivationCode.calledWith(registrationTicket.email, activationTicket.activation_code)).to.be.true()
		})

		it('Should return 200 OK', () => {
			expect(resp.statusCode).to.equal(200)
		})

		it('Should return the user and the codes', () => {
			let parsedAnswer = JSON.parse(resp.payload)
			expect(parsedAnswer).to.equal({
				user: {
					id: userId,
					email: registrationTicket.email,
					full_name: registrationTicket.full_name,
					phone_number: registrationTicket.phone_number,
				},
				codes: [],
			})
		})
	})

	describe('2FA validation fails', async () => {
		const securityDetails = {
			password: chance.string({ length: 5 }),
			method: chance.pickone(['authorizationApp', 'authorizationSms']),
			confirmationCode: chance.string({ pool: '1234567890', lenght: 6 }),
		}

		const registrationTicket = {
			id: chance.integer({ min: 1, max: 10 }),
			registration_code: chance.string({ length: 48 }),
			ip_address: chance.ip(),
			expires_at: new Date(new Date().getTime() + 1000000000).toString(),
			totp_secret: chance.string({ length: 32 }),
			email: chance.email(),
			full_name: chance.name(),
			phone_number: chance.phone(),
			organization_name: chance.company(),
			organization_vat: chance.string({ pool: '1234567890' }),
			organization_website: chance.url(),
			organization_role: chance.profession(),
		}

		const activationCode = chance.guid({ version: 4 })
		const userId = chance.integer({ min: 1, max: 10 })
		const orgId = chance.integer({ min: 1, max: 10 })

		let error, resp

		before(async () => {

			stubs.validateRegistrationToken = stub(userRegistrationService, 'validateRegistrationToken')
				.resolves(new UserRegistrationTicket(registrationTicket))

			stubs.verifyTOTP = stub(user2faService, 'verifyTOTP')
				.returns(false)

			stubs.submitUserRegistration = stub(userRegistrationService, 'submitUserRegistration')
				.resolves({
					user: new User({
						id: userId,
						name: registrationTicket.name,
						email: registrationTicket.email,
						full_name: registrationTicket.full_name,
						phone_number: registrationTicket.phone_number,
						password: chance.string({ length: 10 }),
					}),
					organization: new Organization({
						id: orgId,
						name: registrationTicket.organization_name,
						vat_number: registrationTicket.organization_vat,
						website: registrationTicket.organization_website,
					}),
				})

			stubs.generateUserActivationTicket = stub(userService, 'generateUserActivationTicket')
				.resolves(activationCode)

			stubs.sendUserAccountActivationCode = stub(emailService, 'sendUserAccountActivationCode')
				.resolves()

			try {
				resp = await server.inject({
					headers: {
						'authorization': `Bearer ${registrationTicket.registrationCode}`,
					},
					method: 'POST',
					payload: securityDetails,
					url: '/users_registration/security_details',
				})
			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})

		it('Should validate the registration token', () => {
			expect(stubs.validateRegistrationToken.calledWith(registrationTicket.registrationCode)).to.be.true()
		})

		it('Should verify 2fa totp', () => {
			expect(stubs.verifyTOTP.calledWith(registrationTicket.totp_secret, 'base32', securityDetails.confirmationCode)).to.be.true()
		})

		it('2fa totp validation should fail', () => {
			expect(stubs.verifyTOTP).to.be.false()
		})

		it('Should not submit registration', () => {
			expect(stubs.submitUserRegistration.calledWith(securityDetails, registrationTicket, securityDetails.confirmationCode)).to.be.false()
		})

		it('Should return 403 Forbbiden', () => {
			expect(resp.statusCode).to.equal(403)
		})

	})

})
