const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')
const chance = require('../../../mocks/chance')

const authService = require('../../../../src/services/oauth')
const authPersistence = require('../../../../src/services/oauth/persistence')

const stubs = {}

describe('(UNIT) services.auth.validateBearerToken', async () => {

	afterEach(() => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})

	const today = new Date()
	today.setHours(today.getHours() + 1)
	const token = {
		id: chance.integer({ min: 1, max: 100 }),
		token: chance.string({ scope: 'abc' }),
		get: () => today.getTime(), // expires
		clientId: chance.string({ scope: 'abc', length: 12 }),
		userId: chance.integer({ min: 1, max: 100 }),
		scopes: chance.string({ scope: 'abc', length: 5 }),
		expires_in: 3600,
	}
	describe('Token is validated successfully', async () => {
		let result, error

		before(async () => {

			stubs.getBearerWithScopes = stub(authPersistence, 'getBearerWithScopes')
				.resolves(token)

			try {

				result = await authService.validateBearerToken(token.token)

			} catch (err) {
				error = err
			}
		})

		it('Should not throw an error', async () => {
			expect(error).to.not.exist()
		})

		it('Should return the token', async () => {
			expect(result).to.be.object()
			expect(result).to.include('token')
			expect(result.token).to.equal(token.token)
		})

		it('Should return the expire_in', async () => {
			expect(result).to.include('expires_in')
		})

	})

	describe('Unsuccessful token validation (throws error)', async () => {
		let result, error

		before(async () => {

			stubs.getBearerWithScopes = stub(authPersistence, 'getBearerWithScopes')
				.throws()

			try {

				result = await authService.validateBearerToken(token.token)

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

	describe('Unsuccessful token validation (no token)', async () => {
		let result, error

		before(async () => {

			stubs.getBearerWithScopes = stub(authPersistence, 'getBearerWithScopes')
				.resolves(null)

			try {

				result = await authService.validateBearerToken(token.token)

			} catch (err) {
				error = err
			}
		})

		it('Should not throw an error', async () => {
			expect(error).to.not.exist()
		})

		it('Should return undefined', async () => {
			expect(result).to.be.undefined()
		})
	})

	describe('Unsuccessful token validation (expired)', async () => {
		let result, error

		before(async () => {

			const past = new Date()
			past.setHours(past.getHours() - 1)
			const token = {
				id: chance.integer({ min: 1, max: 100 }),
				token: chance.string({ scope: 'abc' }),
				get: () => past.getTime(), // expires
				clientId: chance.string({ scope: 'abc', length: 12 }),
				userId: chance.integer({ min: 1, max: 100 }),
				scopes: chance.string({ scope: 'abc', length: 5 }),
			}

			stubs.getBearerWithScopes = stub(authPersistence, 'getBearerWithScopes')
				.resolves(token)

			try {

				result = await authService.validateBearerToken(token.token)

			} catch (err) {
				error = err
			}
		})

		it('Should not throw an error', async () => {
			expect(error).to.not.exist()
		})

		it('Should return undefined', async () => {
			expect(result).to.be.undefined()
		})
	})

})
