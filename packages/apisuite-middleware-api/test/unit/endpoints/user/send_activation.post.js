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
	require('../../../../src/plugins/internal/authStrategies'),
	require('../../../../src/plugins/user'),
]

const oauth2Srvc = require('../../../../src/services/oauth2')
const userSrvc = require('../../../../src/services/user')
const emailSrvc = require('../../../../src/services/email')
const User = require('../../../../src/models/User')
const UserActivationTicket = require('../../../../src/models/UserActivationTicket')

const stubs = {}

describe.skip('(UNIT) POST /users/send_activation', async () => {

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
		const token = chance.string({ length: 48 })
		let error, resp

		const user = new User({
			id: chance.integer({ min: 1, max: 10 }),
			email: chance.email(),
			full_name: chance.name(),
			phone_number: chance.phone(),
			created_at: new Date(),
			updated_at: new Date(),
		}).toJSON()

		const activationTicket = {
			id: chance.integer({ min: 1, max: 10 }),
			user_id: chance.integer({ min: 1, max: 10 }),
			activation_code: chance.guid({ version: 4 }),
			expires_at: new Date(),
		}

		before(async () => {

			stubs.validateBearerToken = stub(oauth2Srvc, 'validateBearerToken')
				.resolves({ user })

			stubs.generateUserActivationTicket = stub(userSrvc, 'generateUserActivationTicket')
				.resolves(new UserActivationTicket(activationTicket))

			stubs.sendUserAccountActivationCode = stub(emailSrvc, 'sendUserAccountActivationCode')
				.resolves()

			try {
				resp = await server.inject({
					headers: {
						'authorization': `Bearer ${token}`,
					},
					method: 'POST',
					url: '/users/send_activation',
				})

			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})


		it('Should validate the bearer token', () => {
			expect(stubs.validateBearerToken.calledWith(token)).to.equal(true)
		})

		it('Should send the email to the correct user', () => {
			expect(stubs.sendUserAccountActivationCode.calledWith(user.email, activationTicket.activation_code)).to.equal(true)
		})

		it('Should return 200 OK', () => {
			expect(resp.statusCode).to.equal(200)
		})
	})
})
