const { afterEach, before, after, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')
const chance = require('../../../mocks/chance')
const speakeasy = require('speakeasy')

const config = require('../../../../src/config')
const Hapi = require('hapi')
const server = new Hapi.Server(config.get('server'))

const plugins = [
	require('hapi-auth-bearer-token'),
	require('../../../../src/plugins/userRegistration'),
]

const userRegistrationService = require('../../../../src/services/userRegistration')

const stubs = {}

describe.skip('(UNIT) GET /users_registration/totp_verify', async () => {

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

	describe.skip('Successful request', async () => {

		const token = chance.string({ length: 48 })

		let error, resp

		before(async () => {

			const secret = 'I5LTGKSXIAYUKY3OMJIDAQTBEY7WOVJYJFCEC3BYHNSEUVZ4INNQ'
			const totp = speakeasy.totp({
				secret: secret,
				encoding: 'base32',
				digits: 6,
			})

			stubs.validateRegistrationToken = stub(userRegistrationService, 'validateRegistrationToken')
				.resolves({ user: {email: 'user@cloudoki.com', totp_secret: secret}})

			try {
				resp = await server.inject({
					headers: {
						'authorization': `Bearer ${token}`,
					},
					method: 'GET',
					url: `/users_registration/totp_verify?token=${totp}`,
				})

			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})

		it('Should validate the registration token', () => {
			expect(stubs.validateRegistrationToken.calledWith(token)).to.be.true()
		})

		it('Should return 200 Ok', () => {
			expect(resp.statusCode).to.equal(200)
		})

		it('Should return a true for a valid totp token', () => {
			expect(resp.result).to.be.true()
		})
	})
})
