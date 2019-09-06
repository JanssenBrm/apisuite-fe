const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')
const chance = require('../../../mocks/chance')

const authService = require('../../../../src/services/oauth')
const authPersistence = require('../../../../src/services/oauth/persistence')
const appService = require('../../../../src/services/app')

const stubs = {}

describe('(UNIT) services.auth.clientCredentials', async () => {

	afterEach(() => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})

	const token = {
		token_type: 'bearer',
		token: chance.string({ scope: 'abc' }),
		expires: new Date().getTime(),
		refresh: chance.string({ scope: 'xzv' }),
	}
	const scope = chance.string({ scope: 'abc', length: 5 })
	const clientId = chance.string({ scope: 'abc', length: 12 })
	const clientSecret = chance.string({ scope: 'abc123456789', length: 12 })
	const name = chance.company()
	const description = chance.paragraph()
	const publicURL = chance.url()
	const iconURL = chance.url({ extensions: ['ico'] })
	const redirectURLs = [...Array(chance.integer({ min: 1, max: 5 }))].map(() => chance.url())
	const ownerId = chance.integer({ min: 1 })
	const organizationId = chance.integer({ min: 1 })
	const appId = chance.integer({ min: 1 })

	describe('Get token with client credentials is successful', async () => {
		let result, error

		before(async () => {

			stubs.findClientByCredentials = stub(appService, 'findClientByCredentials')
				.resolves({
					id: appId,
					name,
					description,
					publicURL,
					clientId,
					ownerId,
					organizationId,
					iconURL,
					clientSecret,
					redirectURLs,
					grants: ['authorization_code', 'client_credentials'],
					createdAt: Date(),
					updatedAt: Date(),
					scopes: {
						toJSON : () => {
							return [
								{ scope: {name: 'aisp'}, brand: 'bnppf', appId: 1, scopeId: 2},
								{ scope: {name: 'aisp'}, brand: 'fintro', appId: 1, scopeId: 2 },
								{ scope: {name: 'pisp'}, brand: 'fintro', appId: 1, scopeId: 4},
							]
						},
					},
				})
				
			stubs.saveToken = stub(authPersistence, 'saveToken')
				.resolves(token)

			try {

				result = await authService.clientCredentials(clientId, clientSecret, scope)

			} catch (err) {
				error = err
			}
		})

		it('Shouldn\'t throw an error', async () => {
			expect(error).to.not.exist()
		})

		it('Should return the token', async () => {
			expect(result).to.be.object()
			expect(result).to.include('token')
			expect(result.token).to.equal(token.token)
		})

		it('Should return the token_type', async () => {
			expect(result).to.include('token_type')
			expect(result.token_type).to.equal(token.token_type)
		})

		it('Should return the expires', async () => {
			expect(result).to.include('expires')
			expect(result.expires).to.equal(token.expires)
		})

		it('Should return the refresh', async () => {
			expect(result).to.include('refresh')
			expect(result.refresh).to.equal(token.refresh)
		})
	})

	describe('Get token is not successful (no app)', async () => {
		let result, error

		before(async () => {

			stubs.findClientByCredentials = stub(appService, 'findClientByCredentials')
				.resolves()
			stubs.saveToken = stub(authPersistence, 'saveToken')
				.resolves(token)

			try {

				result = await authService.clientCredentials(clientId, clientSecret, scope)

			} catch (err) {
				error = err
			}
		})

		it('Should throw an error', async () => {
			expect(error).to.exist()
		})

		it('Should return undefined', async () => {
			expect(result).to.be.undefined()
		})
	})

	describe('Get token is not successful (generateToken throws error)', async () => {
		let result, error

		before(async () => {

			stubs.findClientByCredentials = stub(appService, 'findClientByCredentials')
				.resolves({
					toJSON: () => {
						return {
							id: appId,
							name,
							description,
							publicURL,
							clientId,
							ownerId,
							organizationId,
							iconURL,
							clientSecret,
							redirectURLs,
							grants: ['authorization_code', 'client_credentials'],
							createdAt: Date(),
							updatedAt: Date(),
						}
					},
				})
			stubs.saveToken = stub(authPersistence, 'saveToken')
				.throws()

			try {

				result = await authService.clientCredentials(clientId, clientSecret, scope)

			} catch (err) {
				error = err
			}
		})

		it('Should throw an error', async () => {
			expect(error).to.exist()
		})

		it('Should return undefined', async () => {
			expect(result).to.be.undefined()
		})
	})

})
