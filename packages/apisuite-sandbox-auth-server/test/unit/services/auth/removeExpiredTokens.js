const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')

const authPersistence = require('../../../../src/services/oauth/persistence')
const authService = require('../../../../src/services/oauth')

const stubs = {}

describe('(UNIT) services.auth.removeExpiredTokens', async () => {

	afterEach(() => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})


	describe('Successfully remove expired tokens', async () => {
		let result, error

		before(async () => {

			stubs.removeExpiredTokens = stub(authPersistence, 'removeExpiredTokens')
				.resolves()

			try {

				result = await authService.removeExpiredTokens()

			} catch (err) {
				error = err
			}
		})

		it('Shouldn\'t throw an error', async () => {
			expect(error).to.not.exist()
		})

		it('Should return undefiend', async ()=>{
			expect(result).to.be.undefined()
		})
	})

	describe('Remove expired tokens fails', async () => {
		let result, error

		before(async () => {

			stubs.removeExpiredTokens = stub(authPersistence, 'removeExpiredTokens')
				.throws()

			try {

				result = await authService.removeExpiredTokens()

			} catch (err) {
				error = err
			}
		})

		it('Should throw an error', async () => {
			expect(error).to.exist()
		})

		it('Should return undefiend', async ()=>{
			expect(result).to.be.undefined()
		})
	})

})
