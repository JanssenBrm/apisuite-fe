const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')

const userService = require('../../../../src/services/user')
const userPersistence = require('../../../../src/services/user/persistence')

const stubs = {}

describe('(UNIT) services.user.getUsersWithScopes', async () => {

	afterEach(() => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})

	let error, resp
	const users = []

	before(async () => {
		stubs.usersGetAll = stub(userPersistence, 'usersGetAll')
			.resolves(users)

		const options = {
			page: 1,
			pageSize: 20,
		}

		try {
			resp = await userService.getUsersWithScopes(options)
		} catch (err) {
			error = err
		}
	})

	it('Shouldn\'t return an error', async () => {
		expect(error).to.be.undefined()
	})

	it('Should retrieve the users', async () => {
		expect(stubs.usersGetAll.calledOnce).to.be.true()
		expect(resp).to.be.an.object()
		expect(resp.users).to.exists()
		expect(resp.users).to.be.an.array()
		expect(resp.users.length).to.be.equal(users.length)
	})

})
