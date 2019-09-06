const { afterEach, before, after, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')
const chance = require('../../../mocks/chance')

const config = require('../../../../src/config')
const Hapi = require('hapi')
const server = new Hapi.Server(config.get('server'))

const plugins = [
	require('bell'),
	require('hapi-auth-bearer-token'),
	require('../../../../src/plugins/userRegistration'),
	require('../../../../src/plugins/internal/authStrategies'),
	require('../../../../src/plugins/user'),
]

const userService = require('../../../../src/services/user')
const orgService = require('../../../../src/services/organization')
const emailService = require('../../../../src/services/email')

const UserActivationTicket = require('../../../../src/models/UserActivationTicket')

const stubs = {}

describe('(UNIT) GET /users/confirmation_ticket', async () => {

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

	describe('Successful response', async () => {
		const activationTicket = {
			id: chance.integer({ min: 1, max: 10}),
			user_id: chance.integer({ min: 1, max: 10}),
			activation_code: chance.guid({ version: 4 }),
			expires_at: new Date(),
		}

		let error, resp

		before(async () => {
			stubs.getUserAccountActivationTicket = stub(userService, 'getUserAccountActivationTicket')
				.resolves(new UserActivationTicket(activationTicket))

			stubs.getByID = stub(userService, 'getByID')
				.resolves({})

			stubs.activateUserAccount = stub(userService, 'activateUserAccount')
				.resolves({})

			stubs.listUserOrganizations = stub(orgService, 'listUserOrganizations')
				.resolves([])
			stubs.notifyAdminToApproveOrganization = stub(emailService, 'notifyAdminToApproveOrganization')
				.resolves()

			try {
				resp = await server.inject({
					method: 'GET',
					url: '/users/confirmation_ticket?ac=' + activationTicket.activation_code,
				})
			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})

		it('Should search the activation ticket', () => {
			expect(stubs.getUserAccountActivationTicket.calledWith(activationTicket.activation_code)).to.be.true()
		})

		it('Activation ticket should exist', () => {
			expect(stubs.getUserAccountActivationTicket).to.exist()
		})

		it('Should check if user is already registered', () => {
			expect(stubs.getByID.calledWith(activationTicket.user_id)).to.exist()
		})

		it('User should exist', () => {
			expect(stubs.getByID).to.exist()
		})

		it('Should activate user', () => {
			expect(stubs.activateUserAccount.calledWith(activationTicket.id)).to.exist()
		})

		it('Should return 302 Found', () => {
			expect(resp.statusCode).to.equal(302)
		})

		it('Should redirect user to dashboard', () => {
			expect(resp.headers).to.include({ location: config.get('appcenter').url + '/dashboard' })
		})
	})


	describe('Activation code not found', async () => {
		const activationCode = chance.guid({ version: 4 })
		let error, resp

		before(async () => {

			stubs.getUserAccountActivationTicket = stub(userService, 'getUserAccountActivationTicket')
				.resolves(undefined)

			stubs.getByID = stub(userService, 'getByID')
				.resolves({})

			stubs.activateUserAccount = stub(userService, 'activateUserAccount')
				.resolves({})

			stubs.listUserOrganizations = stub(orgService, 'listUserOrganizations')
				.resolves([])
			stubs.notifyAdminToApproveOrganization = stub(emailService, 'notifyAdminToApproveOrganization')
				.resolves()

			try {
				resp = await server.inject({
					method: 'GET',
					url: '/users/confirmation_ticket?ac=' + activationCode,
				})
			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})

		it('Should return 302 Found', () => {
			expect(resp.statusCode).to.equal(302)
		})

		it('Should redirect user to homepage', () => {
			expect(resp.headers).to.include({ location: config.get('appcenter').url })
		})
	})

	describe('User not found', async () => {
		const activationCode = chance.guid({ version: 4 })
		let error, resp

		before(async () => {

			stubs.getUserAccountActivationTicket = stub(userService, 'getUserAccountActivationTicket')
				.resolves({})

			stubs.getByID = stub(userService, 'getByID')
				.resolves(undefined)

			stubs.activateUserAccount = stub(userService, 'activateUserAccount')
				.resolves({})

			stubs.listUserOrganizations = stub(orgService, 'listUserOrganizations')
				.resolves([])
			stubs.notifyAdminToApproveOrganization = stub(emailService, 'notifyAdminToApproveOrganization')
				.resolves()

			try {
				resp = await server.inject({
					method: 'GET',
					url: '/users/confirmation_ticket?ac=' + activationCode,
				})
			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})

		it('Should return 302 Found', () => {
			expect(resp.statusCode).to.equal(302)
		})

		it('Should redirect user to homepage', () => {
			expect(resp.headers).to.include({ location: config.get('appcenter').url })
		})
	})

})
