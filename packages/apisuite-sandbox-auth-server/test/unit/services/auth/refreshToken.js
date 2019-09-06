const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')
const chance = require('../../../mocks/chance')

const authService = require('../../../../src/services/oauth')
const authPersistence = require('../../../../src/services/oauth/persistence')

const stubs = {}

describe('(UNIT) services.auth.refreshToken', async () => {

	afterEach(() => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})

	const scopeList = [
		{ scope: {name: 'aisp'}, brand: 'bnppf', appId: 1, scopeId: 2},
		{ scope: {name: 'aisp'}, brand: 'fintro', appId: 1, scopeId: 2 },
		{ scope: {name: 'pisp'}, brand: 'fintro', appId: 1, scopeId: 4},
	]
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
		scopes: scopeList,
		expires: today,
	}

	describe('Successfully exchange refresh token for access token', async () => {
		let result, error

		before(async () => {

			stubs.getRefreshToken = stub(authPersistence, 'getRefreshToken')
				.resolves(refreshToken)
			stubs.removeRefreshToken = stub(authPersistence, 'removeRefreshToken')
				.resolves()
			stubs.saveToken = stub(authPersistence, 'saveToken')
				.resolves(token)

			try {

				result = await authService.refreshToken(refreshToken.token)

			} catch (err) {
				error = err
			}
		})

		it('Shouldn\'t throw an error', async () => {
			expect(error).to.not.exist()
		})

		it('Should return the token', async () => {
			expect(result).to.be.object()
			expect(result).to.include('token')
			expect(result.token).to.equal(token.token)
		})

		it('Should return the token_type', async () => {
			expect(result).to.include('token_type')
			expect(result.token_type).to.equal(token.token_type)
		})

		it('Should return the expires', async () => {
			expect(result).to.include('expires')
			expect(result.expires).to.equal(token.expires)
		})

		it('Should return the refresh', async () => {
			expect(result).to.include('refresh')
			expect(result.refresh).to.equal(token.refresh)
		})
	})

	describe('Unsuccessfully exchange refresh token for access token (fail to find refresh token throw error)', async () => {
		let result, error

		before(async () => {

			stubs.getRefreshToken = stub(authPersistence, 'getRefreshToken')
				.throws()
			stubs.removeRefreshToken = stub(authPersistence, 'removeRefreshToken')
				.resolves()
			stubs.saveToken = stub(authPersistence, 'saveToken')
				.resolves(token)

			try {

				result = await authService.refreshToken(refreshToken.token)

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

	describe('Unsuccessfully exchange refresh token for access token (fail to find refresh token)', async () => {
		let result, error

		before(async () => {

			stubs.getRefreshToken = stub(authPersistence, 'getRefreshToken')
				.resolves(null)
			stubs.removeRefreshToken = stub(authPersistence, 'removeRefreshToken')
				.resolves()
			stubs.saveToken = stub(authPersistence, 'saveToken')
				.resolves(token)

			try {

				result = await authService.refreshToken(refreshToken.token)

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

	describe('Unsuccessfully exchange refresh token for access token (fail to remove refresh token)', async () => {
		let result, error

		before(async () => {

			stubs.getRefreshToken = stub(authPersistence, 'getRefreshToken')
				.resolves(refreshToken)
			stubs.removeRefreshToken = stub(authPersistence, 'removeRefreshToken')
				.throws()
			stubs.saveToken = stub(authPersistence, 'saveToken')
				.resolves(token)

			try {

				result = await authService.refreshToken(refreshToken.token)

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

	describe('Unsuccessfully exchange refresh token for access token (fail to generate token)', async () => {
		let result, error

		before(async () => {

			stubs.getRefreshToken = stub(authPersistence, 'getRefreshToken')
				.resolves(refreshToken)
			stubs.removeRefreshToken = stub(authPersistence, 'removeRefreshToken')
				.resolves()
			stubs.saveToken = stub(authPersistence, 'saveToken')
				.throws()

			try {

				result = await authService.refreshToken(refreshToken.token)

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
