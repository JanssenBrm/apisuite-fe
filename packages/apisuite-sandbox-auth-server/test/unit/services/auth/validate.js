const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')

const authService = require('../../../../src/services/oauth')
const authPersistence = require('../../../../src/services/oauth/persistence')
const psuService = require('../../../../src/services/psu')
const appSrvc = require('../../../../src/services/app')

const stubs = {}

describe('(UNIT) services.auth.validate', async () => {

	afterEach(() => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})


	describe('Validation is successful', async () => {
		let result, error

		const psu = {
			username: 'test_user',
			password: 'test_password',
		}

		before(async () => {

			stubs.validatePsu = stub(psuService, 'validatePsu')
				.resolves({authenticated: true, psu : psu})

			stubs.saveToken = stub(authPersistence, 'saveToken')
				.resolves({ token: 'token' })

			stubs.getAppScopes = stub(appSrvc, 'getAppScopes')
				.resolves([
					{ scope: {name: 'aisp'}, brand: 'bnppf', appId: 1, scopeId: 2},
					{ scope: {name: 'aisp'}, brand: 'fintro', appId: 1, scopeId: 2 },
					{ scope: {name: 'pisp'}, brand: 'fintro', appId: 1, scopeId: 4},
				])
				
			try {

				result = await authService.authenticate('test_user', 'test_password', 'container', 'client_id')

			} catch (err) {
				error = err
			}
		})

		it('Shouldn\'t throw an error', async () => {
			expect(error).to.not.exist()
		})

		it('Should return the psu', async ()=>{
			expect(result.user).to.equal(psu)
		})
	})
	describe('Validation is not successful', async () => {
		let result, error

		before(async () => {

			stubs.validatePsu = stub(psuService, 'validatePsu')
				.resolves()

			stubs.saveToken = stub(authPersistence, 'saveToken')
				.resolves({ token: 'token' })

			try {
				result = await authService.authenticate('test_user2', 'wrong_password2', 'container', 'client_id')
			} catch (err) {
				error = err
			}
		})

		it('Shouldn\'t throw an error', async () => {
			expect(error).to.not.exist()
		})

		it('Should not return the psu', async ()=>{
			expect(result.user).to.not.exist()
		})

		it('Should not be authenticated', async ()=>{
			expect(result.authenticated).to.be.false()
		})
	})
})
