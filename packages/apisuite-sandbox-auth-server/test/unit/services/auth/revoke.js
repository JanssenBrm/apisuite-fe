const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')
const chance = require('../../../mocks/chance')

const authService = require('../../../../src/services/oauth')
const authPersistence = require('../../../../src/services/oauth/persistence')

const stubs = {}

describe('(UNIT) services.auth.revokeToken', async () => {

	afterEach(() => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})

	const scope = chance.string({ scope: 'abc', length: 5 })
	const clientId = chance.string({ scope: 'abc', length: 12 })
	const today = new Date()
	today.setHours(today.getHours() + 1)
	const token = {
		token_type: 'bearer',
		token: chance.string({ scope: 'abc' }),
		expires: today.getTime(),
		refresh: chance.string({ scope: 'xzv' }),
	}
	const refreshToken = {
		id: chance.integer({ min: 1, max: 50 }),
		token: chance.string({ scope: 'abc', length: 32 }),
		clientId,
		userId: chance.integer({ min: 1, max: 50 }),
		scopes: scope,
		expires: today,
	}

	describe('Successfully revoke refresh token (no hint)', async () => {
		let result, error

		before(async () => {

			stubs.removeAccessToken = stub(authPersistence, 'removeAccessToken')
				.resolves()
			stubs.removeRefreshToken = stub(authPersistence, 'removeRefreshToken')
				.resolves()

			try {

				result = await authService.revokeToken(refreshToken.token)

			} catch (err) {
				error = err
			}
		})

		it('Shouldn\'t throw an error', async () => {
			expect(error).to.not.exist()
		})

		it('Should return an array with resolve promises', async () => {
			expect(result).to.be.array()
		})
	})

	describe('Successfully revoke access token (no hint)', async () => {
		let result, error

		before(async () => {

			stubs.removeAccessToken = stub(authPersistence, 'removeAccessToken')
				.resolves()
			stubs.removeRefreshToken = stub(authPersistence, 'removeRefreshToken')
				.resolves()

			try {

				result = await authService.revokeToken(token.token)

			} catch (err) {
				error = err
			}
		})

		it('Shouldn\'t throw an error', async () => {
			expect(error).to.not.exist()
		})

		it('Should return an array with resolve promises', async () => {
			expect(result).to.be.array()
		})
	})

	describe('Successfully revoke refresh token (with hint)', async () => {
		let result, error

		before(async () => {

			stubs.removeAccessToken = stub(authPersistence, 'removeAccessToken')
				.resolves()
			stubs.removeRefreshToken = stub(authPersistence, 'removeRefreshToken')
				.resolves()

			try {

				result = await authService.revokeToken(refreshToken.token, 'refresh_token')

			} catch (err) {
				error = err
			}
		})

		it('Shouldn\'t throw an error', async () => {
			expect(error).to.not.exist()
		})

		it('Should return undefined', async () => {
			expect(result).to.be.undefined()
		})
	})

	describe('Successfully revoke access token (with hint)', async () => {
		let result, error

		before(async () => {

			stubs.removeAccessToken = stub(authPersistence, 'removeAccessToken')
				.resolves()
			stubs.removeRefreshToken = stub(authPersistence, 'removeRefreshToken')
				.resolves()

			try {

				result = await authService.revokeToken(token.token, 'access_token')

			} catch (err) {
				error = err
			}
		})

		it('Shouldn\'t throw an error', async () => {
			expect(error).to.not.exist()
		})

		it('Should return undefined', async () => {
			expect(result).to.be.undefined()
		})
	})

	describe('Unsuccessfully revoke refresh token (no hint)', async () => {
		let result, error

		before(async () => {

			stubs.removeAccessToken = stub(authPersistence, 'removeAccessToken')
				.resolves()
			stubs.removeRefreshToken = stub(authPersistence, 'removeRefreshToken')
				.rejects()

			try {

				result = await authService.revokeToken(refreshToken.token)

			} catch (err) {
				error = err
			}
		})

		it('Shouldn\'t throw an error', async () => {
			expect(error).to.not.exist()
		})

		it('Should return an array with resolve promises', async () => {
			expect(result).to.be.array()
		})
	})

	describe('Unsuccessfully revoke access token (no hint)', async () => {
		let result, error

		before(async () => {

			stubs.removeAccessToken = stub(authPersistence, 'removeAccessToken')
				.rejects()
			stubs.removeRefreshToken = stub(authPersistence, 'removeRefreshToken')
				.resolves()

			try {

				result = await authService.revokeToken(token.token)

			} catch (err) {
				error = err
			}
		})

		it('Shouldn\'t throw an error', async () => {
			expect(error).to.not.exist()
		})

		it('Should return an array with resolve promises', async () => {
			expect(result).to.be.array()
		})
	})

	describe('Unsuccessfully revoke refresh token (with hint)', async () => {
		let result, error

		before(async () => {

			stubs.removeAccessToken = stub(authPersistence, 'removeAccessToken')
				.resolves()
			stubs.removeRefreshToken = stub(authPersistence, 'removeRefreshToken')
				.rejects()

			try {

				result = await authService.revokeToken(refreshToken.token, 'refresh_token')

			} catch (err) {
				error = err
			}
		})

		it('Should throw an error', async () => {
			expect(error).to.exist()
		})

		it('Should return undefined', async () => {
			expect(result).to.be.undefined()
		})
	})

	describe('Unsuccessfully revoke access token (no hint)', async () => {
		let result, error

		before(async () => {

			stubs.removeAccessToken = stub(authPersistence, 'removeAccessToken')
				.rejects()
			stubs.removeRefreshToken = stub(authPersistence, 'removeRefreshToken')
				.resolves()

			try {

				result = await authService.revokeToken(token.token, 'access_token')

			} catch (err) {
				error = err
			}
		})

		it('Should throw an error', async () => {
			expect(error).to.exist()
		})

		it('Should return undefined', async () => {
			expect(result).to.be.undefined()
		})
	})

})
