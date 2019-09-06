const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')
const chance = require('../../../mocks/chance')

const queries = require('../../../../src/services/userRegistration/persistence')
const userRegistrationService = require('../../../../src/services/userRegistration')

const UserRegistrationTicket = require('../../../../src/models/UserRegistrationTicket')

const stubs = {}

describe('(UNIT) services.userRegistration.validateRegistrationToken', async () => {

	afterEach(() => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})

	const registrationTicket = {
		id: chance.integer({ min: 1, max: 10 }),
		registration_code: chance.string({ length: 48 }),
		ip_address: chance.ip(),
		expires_at: new Date(new Date().getTime() + 1000000000).toString(),
		totp_secret: chance.string({ length: 32 }),
		email: chance.email(),
		full_name: chance.name(),
		phone_number: chance.phone(),
	}

	describe('Validation is successful', async () => {
		let result, error

		before(async () => {

			stubs.getUserRegistrationTicket = stub(queries, 'getUserRegistrationTicket')
				.resolves(new UserRegistrationTicket(registrationTicket))

			try {
				result = await userRegistrationService.validateRegistrationToken(registrationTicket.registration_code)
			} catch (err) {
				error = err
			}
		})

		it('Shouldn\'t throw an error', async () => {
			expect(error).to.not.exist
		})

		it('Should check if token exists in database', async () => {
			expect(stubs.getUserRegistrationTicket.calledWith(registrationTicket.registration_code)).to.be.true()
		})

		it('Should return a UserRegistrationTicket model', async () => {
			expect(result instanceof UserRegistrationTicket).to.be.true()
		})
	})

	describe('Token not found', async () => {
		let error, token

		before(async () => {

			token = chance.string({ length: 48 })

			stubs.getUserRegistrationTicket = stub(queries, 'getUserRegistrationTicket')
				.resolves()

			try {
				await userRegistrationService.validateRegistrationToken(token)
			} catch (err) {
				error = err
			}
		})

		it('Should check if token exists in database', async () => {
			expect(stubs.getUserRegistrationTicket.calledWith(token)).to.be.true()
		})

		it('Should throw an error', async () => {
			expect(error).to.exist()
		})
	})

	describe('Token is expired', async () => {
		let error

		const registrationTicket = {
			id: chance.integer({ min: 1, max: 10 }),
			registration_code: chance.string({ length: 48 }),
			ip_address: chance.ip(),
			expires_at: new Date(new Date().getTime() - 10000).toString(),
			totp_secret: chance.string({ length: 32 }),
			email: chance.email(),
			full_name: chance.name(),
			phone_number: chance.phone(),
		}

		before(async () => {

			stubs.getUserRegistrationTicket = stub(queries, 'getUserRegistrationTicket')
				.resolves(new UserRegistrationTicket(registrationTicket))

			stubs.deleteRegistrationTicket = stub(queries, 'deleteRegistrationTicket')
				.resolves()

			try {
				await userRegistrationService.validateRegistrationToken(registrationTicket.registration_code)
			} catch (err) {
				error = err
			}
		})

		it('Should check if token exists in database', async () => {
			expect(stubs.getUserRegistrationTicket.calledWith(registrationTicket.registration_code)).to.be.true()
		})

		it('Should remove ticket data from database', async () => {
			expect(stubs.deleteRegistrationTicket.calledWith(registrationTicket.registration_code)).to.be.true()
		})

		it('Should throw an error', async () => {
			expect(error).to.exist()
		})
	})
})
