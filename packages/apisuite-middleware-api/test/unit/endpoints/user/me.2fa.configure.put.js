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
const user2faSrvc = require('../../../../src/services/user2fa')

const UserTwoFa = require('../../../../src/models/UserTwoFa')
const User = require('../../../../src/models/User')
const OauthAccessToken = require('../../../../src/models/OauthAccessToken')

const stubs = {}

describe.skip('(UNIT) PUT /users/me/2fa/configure', async () => {

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
		let error, resp

		const user = new User({
			id: chance.integer({ min: 1, max: 10 }),
			email: chance.email(),
			full_name: chance.name(),
			phone_number: chance.phone(),
			created_at: new Date(),
			updated_at: new Date(),
		})

		const accessToken = new OauthAccessToken({
			access_token: chance.string({ length: 48 }),
		})

		accessToken.related('user').set(user)

		const user2fa = {
			id: chance.integer({ min: 1, max: 10 }),
			secret: chance.string({ length: 48 }),
			verified: 0,
			user_id: user.id,
		}

		const payload = {
			confirmationCode: '123456',
			method: 'authorizationSms',
		}

		before(async () => {

			stubs.validateBearerToken = stub(oauth2Srvc, 'validateBearerToken')
				.resolves(accessToken)

			stubs.getUser2faData = stub(user2faSrvc, 'getUser2faData')
				.resolves(new UserTwoFa(user2fa))

			stubs.verifyTOTP = stub(user2faSrvc, 'verifyTOTP')
				.resolves()

			stubs.update2faData = stub(user2faSrvc, 'update2faData')
				.resolves({})

			try {
				resp = await server.inject({
					headers: {
						'authorization': `Bearer ${accessToken.get('access_token')}`,
					},
					method: 'PUT',
					url: '/users/me/2fa/configure',
					payload,
				})

			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})

		it('Should validate the bearer token', () => {
			expect(stubs.validateBearerToken.calledWith(accessToken.get('access_token'))).to.equal(true)
		})

		it('Should return 200 OK', () => {
			expect(resp.statusCode).to.equal(200)
		})
	})

	describe('Confirmation code is incorrect', async () => {
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

		const user2fa = {
			id: chance.integer({ min: 1, max: 10 }),
			secret: chance.string({ length: 48 }),
			verified: 0,
			user_id: user.id,
		}

		const payload = {
			confirmationCode: '123456',
			method: 'authorizationSms',
		}

		before(async () => {

			stubs.validateBearerToken = stub(oauth2Srvc, 'validateBearerToken')
				.resolves({ user })

			stubs.getUser2faData = stub(user2faSrvc, 'getUser2faData')
				.resolves(new UserTwoFa(user2fa))

			try {
				resp = await server.inject({
					headers: {
						'authorization': `Bearer ${token}`,
					},
					method: 'PUT',
					url: '/users/me/2fa/configure',
					payload,
				})

			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})

		it('Should return 403 Forbidden', () => {
			expect(resp.statusCode).to.equal(403)
		})
	})
})
