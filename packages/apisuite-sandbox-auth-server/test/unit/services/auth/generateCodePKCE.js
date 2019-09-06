const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')
const chance = require('../../../mocks/chance')
const bcrypt = require('bcrypt')

const authQueries = require('../../../../src/services/oauth/persistence')
const authService = require('../../../../src/services/oauth')

const stubs = {}

describe('(UNIT) services.auth.generateCode', async () => {

	afterEach(() => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})


	describe('Code is generated successfuly', async () => {
		let result, error

		const challengePlain = chance.string()
		const challenge = await bcrypt.hash(challengePlain, 5)

		const code = chance.string({scope: 'abcdefgh'})
		const app = {
			client_id: '12345',
			user_id: 1,
			scope: 'test_scope',
		}

		before(async () => {
			
			stubs.saveCode = stub(authQueries, 'saveCode')
				.resolves({
					code: code,
					scope: 'test_scope',
					client_id: app.client_id,
					user_id: app.user_id,
					code_challenge: challenge,
					code_challenge_method: 'S256',
				})

			stubs.checkIfCodeExistsAndRemove = stub(authQueries, 'checkIfCodeExistsAndRemove')
				.resolves()

			try {
				
				result = await authService.generateCode('12345', 1, 'test_scope', challenge, 'S256')
				
			} catch (err) {
				error = err
			}
		})

		it('Shouldn\'t throw an error', async () => {
			expect(error).to.not.exist()
		})

		it('Should return the code', async ()=>{
			expect(result).to.be.equal(code)
		})
	})
})
