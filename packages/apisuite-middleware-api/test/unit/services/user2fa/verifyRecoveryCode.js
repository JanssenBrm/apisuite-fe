const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')
const chance = require('../../../mocks/chance')

const user2faService = require('../../../../src/services/user2fa')
const userPersistence = require('../../../../src/services/user/persistence')
const stubs = {}

describe('(UNIT) services.user2fa.verifyRecoveryCode', async () => {

	afterEach(() => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})

	describe('Verify a recovery code', async () => {

		let codeStub
		let userID
		let error
		let retrievedCodes

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
			stubs.getRecoveryCodesByUserID = stub(userPersistence, 'getRecoveryCodesByUserID')
				.resolves(codesStub)

			stubs.removeRecoveryCodeByID = stub(userPersistence, 'removeRecoveryCodeByID')
				.returns(Promise)

			userID = chance.integer({ min: 1, max: 10 })
			retrievedCodes = await user2faService.getUserRecoveryCodes(userID)

			it('Should not call removeRecoveryCodeByID when the code does not exist', async () => {
				codeStub = 'abcde-fghij'
				try {
					await user2faService.verifyRecoveryCode(userID, codeStub)
					expect(stubs.removeRecoveryCodeByID.calledOnce).to.be.false()
				} catch (err) {
					error = err
				}
			})
	
			it('Should return an error when the code does not exist', async () => {
				expect(error).not.to.be.undefined()
			})
	
			it('Should call removeRecoveryCodeByID when the id exists', async () => {
				codeStub = retrievedCodes.codes[0]
				try {
					await user2faService.verifyRecoveryCode(userID, codeStub)
					expect(stubs.removeRecoveryCodeByID.calledOnce).to.be.true()
				} catch (err) {
					error = err
				}
			})
	
			it('Shouldn\'t return an error', async () => {
				expect(error).to.be.undefined()
			})
		})

	})
})
