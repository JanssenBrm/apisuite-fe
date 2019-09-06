const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')

const bookshelf = require('../../../../src/utils/bookshelf')

const userService = require('../../../../src/services/user')

const stubs = {}

describe('(UNIT) services.user.activateUserAccount', async () => {

	afterEach(() => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})

	let error

	before(async () => {
		stubs.activateUserAccount = stub(bookshelf, 'transaction')
			.resolves({})

		try {
			await userService.activateUserAccount({})
		} catch (err) {
			error = err
		}
	})

	it('Shouldn\'t return an error', async () => {
		expect(error).to.be.undefined()
	})

	it('Should activate the user account', async () => {
		expect(stubs.activateUserAccount.calledOnce).to.be.true()
	})

})
