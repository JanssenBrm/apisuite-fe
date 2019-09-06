const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')

const userService = require('../../../../src/services/user')

const User = require('../../../../src/models/User')
const Scope = require('../../../../src/models/Scope')

const stubs = {}
let resp

describe('(UNIT) services.user.userRevokeAdmin', async () => {

	afterEach(() => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})

	let error

	before(async () => {
		const userId = 1
		const user = {
			toJSON: () => {
				return { id: userId }
			},
			related: () => {
				return {
					toJSON: () => {
						return []
					},
				}
			},
		}

		const scope = {
			toJSON: () => ({ name: 'admin', id: 1 }),
			get: () => ({ id: 1 }),
		}

		stubs.findOneUser = stub(User, 'findOne')
			.resolves(user)

		stubs.findOneScope = stub(Scope, 'findOne')
			.resolves(scope)

		try {
			resp = await userService.userRevokeAdmin(userId)
		} catch (err) {
			error = err
		}
	})

	it('Shouldn\'t return an error', async () => {
		expect(error).to.be.undefined()
	})

	it('Should not contain the admin scope', async () => {
		const hasAdminScope = resp.scopes.filter(scope => scope === 'admin').length > 0

		expect(hasAdminScope).to.be.false()
	})
})
