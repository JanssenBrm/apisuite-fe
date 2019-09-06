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

const orgService = require('../../../../src/services/organization')
const userRegistrationService = require('../../../../src/services/userRegistration')

const UserRegistrationTicket = require('../../../../src/models/UserRegistrationTicket')

const stubs = {}

describe.skip('(UNIT) POST /users_registration/organization_details', async () => {

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

	const registrationTicket = {
		id: chance.integer({ min: 1, max: 10 }),
		registration_code: chance.string({ length: 48 }),
		ip_address: chance.ip(),
		expires_at: new Date(new Date().getTime() + 1000000000).toString(),
		totp_secret: chance.string({ length: 32 }),
		email: chance.email(),
		full_name: chance.name(),
		phone_number: chance.phone(),
	}

	describe('Successful request', async () => {

		let error, resp
		let reqPayload = {
			name: chance.string(),
			vat: chance.string(),
			website: chance.url(),
			role: chance.profession(),
		}

		before(async () => {

			stubs.validateRegistrationToken = stub(userRegistrationService, 'validateRegistrationToken')
				.resolves(new UserRegistrationTicket(registrationTicket))

			stubs.isOrganizationRegistered = stub(orgService, 'isOrganizationRegistered')
				.resolves(false)

			stubs.addOrganizationDetailsToRegistration = stub(userRegistrationService, 'addOrganizationDetailsToRegistration')
				.resolves()

			try {
				resp = await server.inject({
					headers: {
						'authorization': `Bearer ${registrationTicket.registrationCode}`,
					},
					method: 'POST',
					payload: reqPayload,
					url: '/users_registration/organization_details',
				})
			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})

		it('Should validate the registration token', () => {
			expect(stubs.validateRegistrationToken.calledWith(registrationTicket.registration_code)).to.be.true()
		})

		it('Should check if the organization already exists', () => {
			expect(stubs.isOrganizationRegistered.calledWith(reqPayload.name)).to.be.true()
		})

		it('Organization shouldn\'t exist', () => {
			expect(stubs.isOrganizationRegistered).to.be.false()
		})

		it('Should add the organization details to the registration ticket', () => {
			expect(stubs.addOrganizationDetailsToRegistration.calledWith(reqPayload, registrationTicket.registrationCode)).to.be.true()
		})

		it('Should return 204 No content', () => {
			expect(resp.statusCode).to.equal(204)
		})
	})

	describe('Organization name not present', async () => {
		const orgDetails = {
			vat: chance.string({ length: 9 }),
			website: chance.url(),
		}

		const token = chance.string({ length: 48 })

		let error, resp

		before(async () => {

			stubs.validateRegistrationToken = stub(userRegistrationService, 'validateRegistrationToken')
				.resolves(new UserRegistrationTicket(registrationTicket))

			try {
				resp = await server.inject({
					headers: {
						'authorization': `Bearer ${token}`,
					},
					method: 'POST',
					payload: orgDetails,
					url: '/users_registration/organization_details',
				})

			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})

		it('Should return 400 Bad Request', () => {
			expect(resp.statusCode).to.equal(400)
		})
	})

	describe('Organization vat number not present', async () => {
		const orgDetails = {
			name: chance.company(),
			website: chance.url(),
			role: chance.profession(),
		}

		const token = chance.string({ length: 48 })

		let error, resp

		before(async () => {

			stubs.validateRegistrationToken = stub(userRegistrationService, 'validateRegistrationToken')
				.resolves({})

			try {
				resp = await server.inject({
					headers: {
						'authorization': `Bearer ${token}`,
					},
					method: 'POST',
					payload: orgDetails,
					url: '/users_registration/organization_details',
				})

			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})

		it('Should return 400 Bad Request', () => {
			expect(resp.statusCode).to.equal(400)
		})
	})

	describe('Organization website not present', async () => {

		const orgDetails = {
			name: chance.company(),
			vat: chance.string({ length: 9 }),
			role: chance.profession(),
		}

		const token = chance.string({ length: 48 })

		let error, resp

		before(async () => {

			stubs.validateRegistrationToken = stub(userRegistrationService, 'validateRegistrationToken')
				.resolves({})

			try {
				resp = await server.inject({
					headers: {
						'authorization': `Bearer ${token}`,
					},
					method: 'POST',
					payload: orgDetails,
					url: '/users_registration/organization_details',
				})

			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})

		it('Should return 400 Bad Request', () => {
			expect(resp.statusCode).to.equal(400)
		})
	})

	describe('Organization role not present', async () => {

		const orgDetails = {
			name: chance.company(),
			vat: chance.string({ length: 9 }),
			role: chance.profession(),
		}

		const token = chance.string({ length: 48 })

		let error, resp

		before(async () => {

			stubs.validateRegistrationToken = stub(userRegistrationService, 'validateRegistrationToken')
				.resolves({})

			try {
				resp = await server.inject({
					headers: {
						'authorization': `Bearer ${token}`,
					},
					method: 'POST',
					payload: orgDetails,
					url: '/users_registration/organization_details',
				})

			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})

		it('Should return 400 Bad Request', () => {
			expect(resp.statusCode).to.equal(400)
		})
	})

	describe('Organization already registered', async () => {
		const orgDetails = {
			name: chance.company(),
			vat: chance.string({ length: 9 }),
			website: chance.url(),
			role: chance.profession(),
		}

		const token = chance.string({ length: 48 })

		let error, resp

		before(async () => {

			stubs.validateRegistrationToken = stub(userRegistrationService, 'validateRegistrationToken')
				.resolves(new UserRegistrationTicket(registrationTicket))

			stubs.isOrganizationRegistered = stub(orgService, 'isOrganizationRegistered')
				.resolves(true)

			stubs.addOrganizationDetailsToRegistration = stub(userRegistrationService, 'addOrganizationDetailsToRegistration')
				.resolves()

			try {
				resp = await server.inject({
					headers: {
						'authorization': `Bearer ${token}`,
					},
					method: 'POST',
					payload: orgDetails,
					url: '/users_registration/organization_details',
				})

			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})

		it('Should return 409 Conflict', () => {
			expect(resp.statusCode).to.equal(409)
		})

		it('Should check if the organization is already registered', () => {
			expect(stubs.isOrganizationRegistered.calledWith(orgDetails.name)).to.be.true()
		})

		it('Organization should exist', () => {
			expect(stubs.isOrganizationRegistered).to.be.true()
		})

		it('Should not add organization data', () => {
			expect(stubs.addOrganizationDetailsToRegistration.calledOnce).to.be.false()
		})
	})

	describe('validateRegistrationToken throws an error', async () => {
		const orgDetails = {
			name: chance.company(),
			vat: chance.string({ length: 9 }),
			website: chance.url(),
			role: chance.profession(),
		}

		const token = chance.string({ length: 48 })

		let error, resp

		before(async () => {

			stubs.validateRegistrationToken = stub(userRegistrationService, 'validateRegistrationToken')
				.throws(new Error())

			stubs.addOrganizationDetailsToRegistration = stub(userRegistrationService, 'addOrganizationDetailsToRegistration')
				.resolves()

			try {
				resp = await server.inject({
					headers: {
						'authorization': `Bearer ${token}`,
					},
					method: 'POST',
					payload: orgDetails,
					url: '/users_registration/organization_details',
				})

			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})

		it('Should return 401 Unauthorized', () => {
			expect(resp.statusCode).to.equal(401)
		})

		it('Should not add organization data to registration', () => {
			expect(stubs.addOrganizationDetailsToRegistration.called).to.be.false()
		})
	})

	describe('isOrganizationRegistered throws an error', async () => {
		const orgDetails = {
			name: chance.company(),
			vat: chance.string({ length: 9 }),
			website: chance.url(),
			role: chance.profession(),
		}

		const token = chance.string({ length: 48 })

		let error, resp

		before(async () => {

			stubs.validateRegistrationToken = stub(userRegistrationService, 'validateRegistrationToken')
				.resolves(new UserRegistrationTicket(registrationTicket))

			stubs.isOrganizationRegistered = stub(orgService, 'isOrganizationRegistered')
				.throws(new Error())

			stubs.addOrganizationDetailsToRegistration = stub(userRegistrationService, 'addOrganizationDetailsToRegistration')
				.resolves()

			try {
				resp = await server.inject({
					headers: {
						'authorization': `Bearer ${token}`,
					},
					method: 'POST',
					payload: orgDetails,
					url: '/users_registration/organization_details',
				})

			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})

		it('Should return 500 Internal Error', () => {
			expect(resp.statusCode).to.equal(500)
		})

		it('Should not add organization data to registration', () => {
			expect(stubs.addOrganizationDetailsToRegistration.called).to.be.false()
		})
	})

	describe('addOrganizationDetailsToRegistration throws an error', async () => {
		const orgDetails = {
			name: chance.company(),
			vat: chance.string({ length: 9 }),
			website: chance.url(),
			role: chance.profession(),
		}

		const registrationTicket = {
			id: chance.integer({ min: 1, max: 10 }),
			registrationCode: chance.string({ length: 48 }),
			ipAddress: chance.ip(),
			expiresAt: new Date(new Date().getTime() + 1000000000).toString(),
			user: {
				email: chance.email(),
				fullName: chance.name(),
				phoneNumber: chance.phone(),
			},
			company: {
				name: orgDetails.name,
				vatNumber: orgDetails.vat,
				website: orgDetails.website,
				role: orgDetails.role,
			},
		}

		const token = chance.string({ length: 48 })

		let error, resp

		before(async () => {

			stubs.validateRegistrationToken = stub(userRegistrationService, 'validateRegistrationToken')
				.resolves(new UserRegistrationTicket(registrationTicket))

			stubs.isOrganizationRegistered = stub(orgService, 'isOrganizationRegistered')
				.resolves(false)

			stubs.addOrganizationDetailsToRegistration = stub(userRegistrationService, 'addOrganizationDetailsToRegistration')
				.throws(new Error())

			try {
				resp = await server.inject({
					headers: {
						'authorization': `Bearer ${token}`,
					},
					method: 'POST',
					payload: orgDetails,
					url: '/users_registration/organization_details',
				})

			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})

		it('Should return 500 Internal Error', () => {
			expect(resp.statusCode).to.equal(500)
		})
	})

	describe('Registration token is not present', async () => {
		const orgDetails = {
			name: chance.company(),
			vat: chance.string({ length: 9 }),
			website: chance.url(),
			role: chance.profession(),
		}

		let error, resp

		before(async () => {

			try {
				resp = await server.inject({
					method: 'POST',
					payload: orgDetails,
					url: '/users_registration/organization_details',
				})

			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})

		it('Should return 401 Unauthorized', () => {
			expect(resp.statusCode).to.equal(401)
		})
	})

})
