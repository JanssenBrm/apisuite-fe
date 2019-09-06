const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')
const chance = require('../../../mocks/chance')

const authPersistence = require('../../../../src/services/oauth/persistence')
const authService = require('../../../../src/services/oauth')

const stubs = {}

describe('(UNIT) services.auth.getStateParameter', async () => {

	afterEach(() => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})

	const clientId = chance.string({ pool: 'abcdefghijkl1234567_', length: 12 })
	const state = chance.string({ pool: 'abcdefghijkl123', length: 6 })
	const stateParam = {
		get: () => state,
	}

	describe('Successfully get state parameter', async () => {
		let result, error

		before(async () => {

			stubs.getStateParameter = stub(authPersistence, 'getStateParameter')
				.resolves(stateParam)

			try {

				result = await authService.getStateParameter(state, clientId)

			} catch (err) {
				error = err
			}
		})

		it('Shouldn\'t throw an error', async () => {
			expect(error).to.not.exist()
		})

		it('Should return the state', async ()=>{
			expect(result).to.be.equal(state)
		})
	})

	describe('Unsuccessfully get state parameter (throws error)', async () => {
		let result, error

		before(async () => {

			stubs.getStateParameter = stub(authPersistence, 'getStateParameter')
				.throws()

			try {

				result = await authService.getStateParameter(state, clientId)

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

	describe('Unsuccessfully get state parameter (null)', async () => {
		let result, error

		before(async () => {

			stubs.getStateParameter = stub(authPersistence, 'getStateParameter')
				.resolves(null)

			try {

				result = await authService.getStateParameter(state, clientId)

			} catch (err) {
				error = err
			}
		})

		it('Should not throw an error', async () => {
			expect(error).to.not.exist()
		})

		it('Should return null', async ()=>{
			expect(result).to.be.null()
		})
	})

})
