const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')

const queries = require('../../../../src/services/userRegistration/persistence')
const userRegistrationService = require('../../../../src/services/userRegistration')

const stubs = {}

describe('(UNIT) services.userRegistration.removeExpiredRegistrationTickets', async () => {


	afterEach(() => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})

	describe('Removes expired tickets', async () => {
		let error

		before(async () => {

			stubs.deleteExpiredRegistrationTickets = stub(queries, 'deleteExpiredRegistrationTickets')
				.resolves([{}])

			try {
				await userRegistrationService.removeExpiredRegistrationTickets()
			} catch (err) {
				error = err
			}
		})

		it('Shouldn\'t throw an error', async () => {
			expect(error).to.not.exist
		})

		it('Should remove expired tickets', async () => {
			expect(stubs.deleteExpiredRegistrationTickets.calledWith()).to.be.true()
		})
	})

	describe('Db throws error', async () => {
		let error

		before(async () => {

			stubs.deleteExpiredRegistrationTicketst = stub(queries, 'deleteExpiredRegistrationTickets')
				.throws(new Error())

			try {
				await userRegistrationService.removeExpiredRegistrationTickets()
			} catch (err) {
				error = err
			}
		})

		it('Should throw an error', async () => {
			expect(error).to.exist()
		})
	})
})
