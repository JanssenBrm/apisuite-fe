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

const userService = require('../../../../src/services/user')
const user2faService = require('../../../../src/services/user2fa')
const userRegistrationService = require('../../../../src/services/userRegistration')

const stubs = {}

describe('(UNIT) POST /users_registration/user_details', async () => {

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

		const secret = chance.string()

		const userDetails = {
			email: chance.email(),
			fullName: chance.name(),
			phoneNumber: chance.phone(),
		}

		const token = chance.string({ length: 48 })
		const expiresAt = new Date()

		let error, resp, payload

		before(async () => {

			stubs.existsByEmail = stub(userService, 'existsByEmail')
				.resolves(false)

			stubs.createUserRegistrationToken = stub(userRegistrationService, 'createUserRegistrationToken')
				.returns({
					token,
					expiresAt,
				})

			stubs.generate2FASecret = stub(user2faService, 'generate2FASecret')
				.returns(secret)

			stubs.createUserRegistration = stub(userRegistrationService, 'createUserRegistration')
				.resolves()

			try {
				resp = await server.inject({
					method: 'POST',
					payload: userDetails,
					url: '/users_registration/user_details',
				})

			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})

		it('Should return 200 Ok', () => {
			expect(resp.statusCode).to.equal(200)
		})

		it('Should check if the email is already in use', () => {
			expect(stubs.existsByEmail.calledWith(userDetails.email)).to.be.true()
		})

		it('Email shouldn\'t exist', async () => {
			let result = await stubs.existsByEmail.getCall(0).returnValue
			expect(result).to.be.false()
		})

		it('Should generate a registration token', () => {
			expect(stubs.createUserRegistrationToken.calledWith()).to.be.true()
		})

		it('Should generate a 2fa secret', () => {
			expect(stubs.generate2FASecret.calledWith('base32')).to.be.true()
		})

		it('Should create a registration ticket', () => {
			expect(stubs.createUserRegistration.calledWith(userDetails, {token, expiresAt}, resp.headers['x-forwarded-for'], secret)).to.be.true()
		})

		it('Should return a valid registration token and expiration date', () => {
			payload = JSON.parse(resp.payload || {})
			expect(payload).to.only.include({ token, expiresAt: expiresAt.getTime() })
		})
	})

	describe('Email not present', async () => {
		const userDetails = {
			fullName: chance.name(),
			phoneNumber: chance.phone(),
		}

		let error, resp

		before(async () => {
			try {
				resp = await server.inject({
					method: 'POST',
					payload: userDetails,
					url: '/users_registration/user_details',
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

	describe('fullName not present', async () => {
		const userDetails = {
			email: chance.email(),
			phoneNumber: chance.phone(),
		}

		let error, resp

		before(async () => {
			try {
				resp = await server.inject({
					method: 'POST',
					payload: userDetails,
					url: '/users_registration/user_details',
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

	describe('phoneNumber not present', async () => {
		const userDetails = {
			email: chance.email(),
			fullName: chance.name(),
		}

		let error, resp

		before(async () => {
			try {
				resp = await server.inject({
					method: 'POST',
					payload: userDetails,
					url: '/users_registration/user_details',
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

	describe('Email already in use', async () => {
		const userDetails = {
			email: chance.email(),
			fullName: chance.name(),
			phoneNumber: chance.phone(),
		}

		let error, resp

		before(async () => {

			stubs.existsByEmail = stub(userService, 'existsByEmail')
				.resolves(true)

			stubs.createUserRegistration = stub(userRegistrationService, 'createUserRegistration')
				.resolves()

			try {
				resp = await server.inject({
					method: 'POST',
					payload: userDetails,
					url: '/users_registration/user_details',
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

		it('Should check if the email is already in use', () => {
			expect(stubs.existsByEmail.calledWith(userDetails.email)).to.be.true()
		})

		it('Email should exist', async () => {
			let result = await stubs.existsByEmail.getCall(0).returnValue
			expect(result).to.be.true()
		})

		it('Should not create a token', () => {
			expect(stubs.createUserRegistration.calledOnce).to.be.false()
		})
	})

	describe('existsByEmail throws an error', async () => {
		const userDetails = {
			email: chance.email(),
			fullName: chance.name(),
			phoneNumber: chance.phone(),
		}

		let error, resp

		before(async () => {

			stubs.existsByEmail = stub(userService, 'existsByEmail')
				.throws(new Error())

			stubs.createUserRegistratio = stub(userRegistrationService, 'createUserRegistration')
				.resolves()

			try {
				resp = await server.inject({
					method: 'POST',
					payload: userDetails,
					url: '/users_registration/user_details',
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

		it('Should not create a token', () => {
			expect(stubs.createUserRegistration.called).to.be.false()
		})
	})

	describe('createUserRegistration throws an error', async () => {
		const userDetails = {
			email: chance.email(),
			fullName: chance.name(),
			phoneNumber: chance.phone(),
		}

		let error, resp

		before(async () => {

			stubs.existsByEmail = stub(userService, 'existsByEmail')
				.resolves()

			stubs.createUserRegistration = stub(userRegistrationService, 'createUserRegistration')
				.throws(new Error())

			try {
				resp = await server.inject({
					method: 'POST',
					payload: userDetails,
					url: '/users_registration/user_details',
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

})
