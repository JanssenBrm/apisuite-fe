const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')
const chance = require('../../../mocks/chance')

const authService = require('../../../../src/services/oauth')
const appService = require('../../../../src/services/app')

const stubs = {}

describe('(UNIT) services.auth.internal', async () => {

	afterEach(() => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})

	const scope = chance.string({ scope: 'abc', length: 5 })
	const clientId = chance.string({ scope: 'abc', length: 12 })
	const clientSecret = chance.string({ scope: 'abc123456789', length: 12 })
	const userId = chance.integer({ min: 1, max: 100 })

	describe('Successfully do the internal validation', async () => {
		let result, error

		before(async () => {

			stubs.findClientByCredentials = stub(appService, 'findClientByCredentials')
				.resolves({})

			try {

				result = await authService.internal(clientId, clientSecret, userId, scope)

			} catch (err) {
				error = err
			}
		})

		it('Should not throw an error', async () => {
			expect(error).to.not.exist()
		})

		it('Should be valid', async () => {
			expect(result).to.be.object()
			expect(result).to.include('isValid')
			expect(result.isValid).to.be.true()
		})

		it('Should return the credentials', async () => {
			expect(result).to.include('credentials')
			expect(result.credentials).to.equal({ clientId, userId, scope })
		})
	})

	describe('Unsuccessfully do the internal validation (throws error)', async () => {
		let result, error

		before(async () => {

			stubs.findClientByCredentials = stub(appService, 'findClientByCredentials')
				.throws()

			try {

				result = await authService.internal(clientId, clientSecret, userId, scope)

			} catch (err) {
				error = err
			}
		})

		it('Should not throw an error', async () => {
			expect(error).to.not.exist()
		})

		it('Should not be valid', async () => {
			expect(result).to.be.object()
			expect(result).to.include('isValid')
			expect(result.isValid).to.be.false()
		})
	})

	describe('Unsuccessfully do the internal validation (no app)', async () => {
		let result, error

		before(async () => {

			stubs.findClientByCredentials = stub(appService, 'findClientByCredentials')
				.resolves(null)

			try {

				result = await authService.internal(clientId, clientSecret, userId, scope)

			} catch (err) {
				error = err
			}
		})

		it('Should not throw an error', async () => {
			expect(error).to.not.exist()
		})

		it('Should not be valid', async () => {
			expect(result).to.be.object()
			expect(result).to.include('isValid')
			expect(result.isValid).to.be.false()
		})
	})

})
