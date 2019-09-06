const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub, match } = require('sinon')
const chance = require('../../../mocks/chance')

const userService = require('../../../../src/services/user')

const UserActivationTicket = require('../../../../src/models/UserActivationTicket')

const stubs = {}

describe('(UNIT) services.user.generateUserActivationTicket', async () => {

	afterEach(() => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})

	describe('Creating an activation ticket', async () => {
		const obj = {
			user_id: chance.integer({ min: 1, max: 10 }),
			activation_code: chance.guid({ version: 4 }),
			expires_at: new Date(),
		}

		let userTicket

		before(async () => {
			stubs.upsert = stub(UserActivationTicket, 'upsert')
				.resolves(new UserActivationTicket(obj))

			userTicket = await userService.generateUserActivationTicket(obj.user_id)
		})

		it('Should update the user activation ticket', async () => {
			expect(stubs.upsert.calledWith({ user_id: obj.user_id }, { activation_code: match.any, expires_at: match.any })).to.be.true()
		})

		it('Activation code should exist', async () => {
			expect(userTicket.get('activation_code')).to.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
		})
	})
})
