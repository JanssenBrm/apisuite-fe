const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')
const chance = require('../../../mocks/chance')

const authQueries = require('../../../../src/services/oauth/persistence')
const authService = require('../../../../src/services/oauth')

const stubs = {}

describe('(UNIT) services.auth.validateGrantType', async () => {

	afterEach(() => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})


	describe('Grant type is allowed', async () => {
		let result, error

		const grantType = 'authorization_code'
		const app = {
			id: chance.integer(),
			name: chance.string({pool: 'abcdefgh'}),
			description: chance.string({pool: 'abcdefgh'}),
			publicURL: chance.string({pool: 'abcdefgh'}),
			clientId: chance.string({pool: 'abcdefgh'}),
			ownerId: chance.integer(),
			organizationId: chance.integer(),
			iconURL: chance.string({pool: 'abcdefgh'}),
			clientSecret: chance.string({pool: 'abcdefgh'}),
			redirectURLs: [
				chance.string({pool: 'abcdefgh'}),
				chance.string({pool: 'abcdefgh'}),
			],
			grants: [
				'authorization_code',
				'client_credentials',
			],
			createdAt: new Date(),
			updatedAt: new Date(),
		}

		before(async () => {
			
			stubs.validateGrantType = stub(authQueries, 'validateGrantType')
				.resolves({isValid: true, message: null}) 

			try {

				result = await authService.validateGrantType(app.clientId, grantType)

			} catch (err) {
				error = err
			}
		})

		it('Shouldn\'t throw an error', async () => {
			expect(error).to.not.exist()
		})

		it('Should return true with an valid grant type for the app', async ()=>{
			expect(result.isValid).to.be.equal(true)
		})
	})

	describe('Grant type is not allowed', async () => {
		let result, error

		const grantType = 'client_credentials'
		const app = {
			id: chance.integer(),
			name: chance.string({pool: 'abcdefgh'}),
			description: chance.string({pool: 'abcdefgh'}),
			publicURL: chance.string({pool: 'abcdefgh'}),
			clientId: chance.string({pool: 'abcdefgh'}),
			ownerId: chance.integer(),
			organizationId: chance.integer(),
			iconURL: chance.string({pool: 'abcdefgh'}),
			clientSecret: chance.string({pool: 'abcdefgh'}),
			redirectURLs: [
				chance.string({pool: 'abcdefgh'}),
				chance.string({pool: 'abcdefgh'}),
			],
			grants: [
				'authorization_code',
			],
			createdAt: new Date(),
			updatedAt: new Date(),
		}

		before(async () => {
			
			stubs.validateGrantType = stub(authQueries, 'validateGrantType')
				.resolves({isValid: false, message: null}) 

			try {

				result = await authService.validateGrantType(app.clientId, grantType)

			} catch (err) {
				error = err
			}
		})

		it('Shouldn\'t throw an error', async () => {
			expect(error).to.not.exist
		})

		it('Should return true with an valid grant type for the app', async ()=>{
			expect(result.isValid).to.be.equal(false)
		})

	})

})
