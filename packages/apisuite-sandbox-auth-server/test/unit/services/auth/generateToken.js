const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')
const chance = require('../../../mocks/chance')

const authQueries = require('../../../../src/services/oauth/persistence')
const authService = require('../../../../src/services/oauth')

const stubs = {}

describe('(UNIT) services.auth.generateToken', async () => {

	afterEach(() => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})


	describe('Token is generated successfuly', async () => {
		let result, error

		const token = {
			token_type: 'bearer',
			token: chance.string({scope: 'abc'}),
			expires: new Date().getTime(),
			refresh: chance.string({scope: 'xzv'}),
		}

		const app = {
			client_id: '12345',
			user_id: 1,
			scope: 'test_scope',
		}

		before(async () => {
			
			stubs.saveToken = stub(authQueries, 'saveToken')
				.resolves(token)

			try {
				
				result = await authService.generateToken(app)
				
			} catch (err) {
				error = err
			}
		})

		it('Shouldn\'t throw an error', async () => {
			expect(error).to.not.exist()
		})

		it('Should return the refresh token', async ()=>{
			expect(result).to.exist()
		})
	})
})
