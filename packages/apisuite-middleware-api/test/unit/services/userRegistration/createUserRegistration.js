const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')
const chance = require('../../../mocks/chance')

const queries = require('../../../../src/services/userRegistration/persistence')
const userRegistrationService = require('../../../../src/services/userRegistration')
// const config = require('../../../../src/config')
const cryptoUtils = require('../../../../src/utils/crypto')
const stubs = {}

describe('(UNIT) services.userRegistration.createUserRegistration', async () => {

	let ipAddress, userDetails, error, token, totpSecret

	afterEach(() => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})


	before(async () => {

		ipAddress = chance.ip()

		userDetails = {
			email: chance.email(),
			fullName: chance.name(),
			phoneNumber: chance.phone(),
		}

		token = {
			token: chance.string({ length: 48 }),
			expiresAt: new Date().toString(),
		}

		totpSecret = chance.string({ length: 32 })

		stubs.createRegistrationTicket = stub(queries, 'createRegistrationTicket')
			.resolves()

		stubs.encrypt = stub(cryptoUtils, 'encrypt')
			.returns(':encryptedTotp')

		try {
			await userRegistrationService.createUserRegistration(userDetails, token, ipAddress, totpSecret)
		} catch (err) {
			error = err
		}
	})

	it('Shouldn\'t return an error', async () => {
		expect(error).to.be.undefined()
	})

	it('Should create a registration ticket', async () => {
		expect(stubs.createRegistrationTicket.calledWith({
			invitation_id: null,
			email: userDetails.email,
			full_name: userDetails.fullName,
			phone_number: userDetails.phoneNumber,
			ip_address: ipAddress,
			registration_code: token.token,
			expires_at: token.expiresAt,
			totp_secret: ':encryptedTotp',
		})).to.be.true()
	})

})

