const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')
const chance = require('../../../mocks/chance')

const authService = require('../../../../src/services/oauth')
const authPersistence = require('../../../../src/services/oauth/persistence')

const stubs = {}

describe('(UNIT) services.auth.tokenIntrospection', async () => {

	afterEach(() => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})

	const today = new Date()
	today.setHours(today.getHours() + 1)
	const token = {
		token: chance.string({ scope: 'abc' }),
		expires: today.getTime(),
		userId: chance.integer({ min: 1, max: 50 }),
		refresh: chance.string({ scope: 'xzv' }),
		scope: chance.string({ scope: 'abc', length: 5 }),
		clientId: chance.string({ scope: 'abc', length: 12 }),
	}
	const t = {
		token,
	}

	describe('Successfully get token', async () => {
		let result, error

		before(async () => {

			stubs.getTokenHierarchy = stub(authPersistence, 'getTokenHierarchy')
				.resolves(t)

			try {

				result = await authService.tokenIntrospection(token.token)

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
			expect(result.token).to.equal(t.token.token)
		})

		it('Should return the expires', async () => {
			expect(result).to.include('expires')
			expect(result.expires).to.equal(t.token.expires)
		})

		it('Should return expires_in property', async () => {
			expect(result.expires_in).to.be.greaterThan(0)
		})

		it('Should return the scope', async () => {
			expect(result).to.include('scope')
			expect(result.scope).to.equal(t.token.scope)
		})

		it('Should return the clientId', async () => {
			expect(result).to.include('clientId')
			expect(result.clientId).to.equal(t.token.clientId)
		})

		it('Should return the userId', async () => {
			expect(result).to.include('userId')
			expect(result.userId).to.equal(t.token.userId)
		})
	})

	describe('Unsuccessfully get token (throws error)', async () => {
		let result, error

		before(async () => {

			stubs.getTokenHierarchy = stub(authPersistence, 'getTokenHierarchy')
				.throws()

			try {

				result = await authService.tokenIntrospection(token.token)

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

	describe('Unsuccessfully get token (fail to find)', async () => {
		let result, error

		before(async () => {

			stubs.getTokenHierarchy = stub(authPersistence, 'getTokenHierarchy')
				.resolves(null)

			try {

				result = await authService.tokenIntrospection(token.token)

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

	describe('Unsuccessfully get token (expired token)', async () => {
		let result, error

		before(async () => {

			const past = new Date()
			past.setHours(today.getHours() - 1)
			const tok = {
				token: chance.string({ scope: 'abc' }),
				expires: today.getTime(),
				userId: chance.integer({ min: 1, max: 50 }),
				refresh: chance.string({ scope: 'xzv' }),
				scope: chance.string({ scope: 'abc', length: 5 }),
				clientId: chance.string({ scope: 'abc', length: 12 }),
			}
			const tk = {
				tok,
			}

			stubs.getTokenHierarchy = stub(authPersistence, 'getTokenHierarchy')
				.resolves(tk)

			try {

				result = await authService.tokenIntrospection(token.token)

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
