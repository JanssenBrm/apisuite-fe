const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')
const chance = require('../../../mocks/chance')

const user2faService = require('../../../../src/services/user2fa')
const userPersistence = require('../../../../src/services/user/persistence')
const stubs = {}

describe('(UNIT) services.user2fa.generateUserRecoveryCodes', async () => {

	afterEach(() => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})

	describe('Generates recovery codes for a given user', async () => {

		let recoveryCodes
		let userID

		before(async () => {
			stubs.getRecoveryCodesByUserID = stub(userPersistence, 'getRecoveryCodesByUserID')
				.resolves([])

			stubs.createUserRecoveryCode = stub(userPersistence, 'createUserRecoveryCode')
				.returns(Promise)

			userID = chance.integer({ min: 1, max: 10 })
			recoveryCodes = await user2faService.generateUserRecoveryCodes(userID)
		})

		it('Should check if the user already have recovery codes', async () => {
			expect(stubs.getRecoveryCodesByUserID.calledOnce).to.be.true()
		})

		it('Should check if the user gets 20 recovery codes', async () => {
			expect(recoveryCodes.codes.length).to.equal(20)
		})

		it('Should create new recovery codes', async () => {
			expect(stubs.createUserRecoveryCode.callCount).to.equal(20)
		})

		it('Should be return a list of recovery codes', async () => {
			expect(recoveryCodes.codes).to.be.an.array()
		})

		it('Each code should be a string with valid format', async () => {
			recoveryCodes.codes.map(code => {
				expect(code).to.be.a.string()
				expect(code).to.match(/^[0-9A-Z-a-z]{5}-[0-9A-Z-a-z]{5}/i)
			})
		})
	})
})
