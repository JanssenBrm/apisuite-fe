const { afterEach, before, after, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')
const chance = require('../../../mocks/chance')

const config = require('../../../../src/config')
const Hapi = require('hapi')
const server = new Hapi.Server(config.get('server'))
const cryptoUtils = require('../../../../src/utils/crypto')

const plugins = [
	require('hapi-auth-bearer-token'),
	require('../../../../src/plugins/userRegistration'),
]

const userRegistrationService = require('../../../../src/services/userRegistration')

const UserRegistrationTicket = require('../../../../src/models/UserRegistrationTicket')

const stubs = {}


describe('(UNIT) GET /users_registration/qrcode', async () => {

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
		expiresAt: new Date(new Date().getTime() + 1000000000).toString(),
		totp_secret: cryptoUtils.encrypt(config.get('twoFactor').totp_encryption_key, 'I5LTGKSXIAYUKY3OMJIDAQTBEY7WOVJYJFCEC3BYHNSEUVZ4INNQ'),
		email: chance.email(),
		full_name: chance.name(),
		phone_number: chance.phone(),
	}

	describe('Successful request', async () => {

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
					method: 'GET',
					url: '/users_registration/2fa/qrcode',
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

		it('Should return a Base64 Data URI', () => {
			expect(resp.result).to.startsWith('data:image/png;base64')
		})
	})

	describe('Unsuccessful request when totp_secret is not present', async () => {

		const token = chance.string({ length: 48 })

		let error, resp

		before(async () => {

			stubs.validateRegistrationToken = stub(userRegistrationService, 'validateRegistrationToken')
				.resolves(new UserRegistrationTicket())

			try {
				resp = await server.inject({
					headers: {
						'authorization': `Bearer ${token}`,
					},
					method: 'GET',
					url: '/users_registration/2fa/qrcode',
				})

			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})

		it('Should return 500 Internal Server Error', () => {
			expect(resp.statusCode).to.equal(422)
		})
	})

})
