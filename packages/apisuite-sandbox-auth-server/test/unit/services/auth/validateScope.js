const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')
const chance = require('../../../mocks/chance')

const authService = require('../../../../src/services/oauth')
const authPersistence = require('../../../../src/services/oauth/persistence')

const stubs = {}

describe('(UNIT) services.auth.validateScope', async () => {

	afterEach(() => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})

	const scope = chance.string({ scope: 'abc', length: 5 })
	const clientId = chance.string({ scope: 'abc', length: 12 })

	describe('Scope is validated successfully', async () => {
		let result, error

		before(async () => {

			stubs.validateScope = stub(authPersistence, 'validateScope')
				.resolves(true)

			try {

				result = await authService.validateScope(clientId, scope)

			} catch (err) {
				error = err
			}
		})

		it('Should not throw an error', async () => {
			expect(error).to.not.exist()
		})

		it('Should be valid', async () => {
			expect(result).to.be.true()
		})
	})

	describe('Unsuccessful scope validation (throws error)', async () => {
		let result, error

		before(async () => {

			stubs.validateScope = stub(authPersistence, 'validateScope')
				.throws()

			try {

				result = await authService.validateScope(clientId, scope)

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

	describe('Unsuccessful scope validation (invalid)', async () => {
		let result, error

		before(async () => {

			stubs.validateScope = stub(authPersistence, 'validateScope')
				.resolves(false)

			try {

				result = await authService.validateScope(clientId, scope)

			} catch (err) {
				error = err
			}
		})

		it('Should throw an error', async () => {
			expect(error).to.exist()
			expect(error.message).to.be.equal('invalid scope')
		})

		it('Should return undefined', async () => {
			expect(result).to.be.undefined()
		})
	})

})
