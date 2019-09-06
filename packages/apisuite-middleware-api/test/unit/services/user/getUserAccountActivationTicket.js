const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')

const userService = require('../../../../src/services/user')
// const userPersistence = require('../../../../src/services/user/persistence')
const chance = require('../../../mocks/chance')

const UserActivationTicket = require('../../../../src/models/UserActivationTicket')

const stubs = {}

describe('(UNIT) services.user.getUserActivationTicket', async () => {

	afterEach(() => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})

	let error
	let activationTicket
	const activationCode = chance.guid({ version: 4 })

	before(async () => {
		stubs.findOne = stub(UserActivationTicket, 'findOne')
			.resolves([{}])

		try {
			activationTicket = await userService.getUserAccountActivationTicket(activationCode)
		} catch (err) {
			error = err
		}
	})

	it('Shouldn\'t return an error', async () => {
		expect(error).to.be.undefined()
	})

	it('Should retrieve the user activation ticket', async () => {
		expect(stubs.findOne.calledWith({ activation_code: activationCode })).to.be.true()
	})

	it('Activation ticket should exist', async () => {
		expect(activationTicket).to.exist()
	})

})
