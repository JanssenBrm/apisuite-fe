const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')
const chance = require('../../../mocks/chance')

const user2faService = require('../../../../src/services/user2fa')
const userPersistence = require('../../../../src/services/user/persistence')
const stubs = {}

describe('(UNIT) services.user2fa.getUserRecoveryCodes', async () => {

	afterEach(() => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})

	describe('Get recovery codes for a given user', async () => {

		let recoveryCodes
		let userID
		let codesStub = [
			{
				id: 1,
				userID: userID,
				code: user2faService.formattedUUID(),
			},
			{
				id: 2,
				userID: userID,
				code: user2faService.formattedUUID(),
			},
		]

		before(async () => {
			stubs.getRecoveryCodesByUserId = stub(userPersistence, 'getRecoveryCodesByUserID')
				.resolves(codesStub)

			userID = chance.integer({ min: 1, max: 10 })
			recoveryCodes = await user2faService.getUserRecoveryCodes(userID)
		})

		it('Should retrieve the recovery codes of a given user', async () => {
			expect(stubs.getRecoveryCodesByUserId.calledOnce).to.be.true()
		})

		it('Each code should be a string with valid format', async () => {
			recoveryCodes.codes.map(code => {
				expect(code).to.be.a.string()
				expect(code).to.match(/^[0-9A-Z-a-z]{5}-[0-9A-Z-a-z]{5}/i)
			})
		})
	})
})
