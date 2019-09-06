const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')
const chance = require('../../../mocks/chance')

const authService = require('../../../../src/services/oauth')
const authPersistence = require('../../../../src/services/oauth/persistence')

const stubs = {}

describe('(UNIT) services.auth.validateToken', async () => {

	afterEach(() => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})


	describe('Validation is successful', async () => {
		let result, error

		const token = chance.string({ scope: 'abc123', length: 42 })
		const scope = chance.string({ scope: 'abc', length: 5 })
		const clientId = chance.string({ scope: 'abc', length: 12 })
		const userId = chance.integer({ min: 1, max: 100 })
		const container = chance.string({ scope: 'aeiou', length: 10 })

		before(async () => {

			stubs.getTokenHierarchy = stub(authPersistence, 'getTokenHierarchy')
				.resolves({
					token: {
						token,
						scope,
						clientId,
						userId,
					},
					container: { name: container },
				})

			try {

				result = await authService.validateToken(token)

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
			expect(result.token).to.equal(token)
		})

		it('Should return the scope', async () => {
			expect(result).to.include('scope')
			expect(result.scope).to.equal(scope)
		})

		it('Should return the clientId', async () => {
			expect(result).to.include('clientId')
			expect(result.clientId).to.equal(clientId)
		})

		it('Should return the userId', async () => {
			expect(result).to.include('userId')
			expect(result.userId).to.equal(userId)
		})

		it('Should return the container', async () => {
			expect(result).to.include('container')
			expect(result.container).to.equal(container)
		})
	})

	describe('Validation is not successful', async () => {
		let result, error

		const token = chance.string({ scope: 'abc123', length: 42 })

		before(async () => {

			stubs.getTokenHierarchy = stub(authPersistence, 'getTokenHierarchy')
				.resolves()

			try {
				result = await authService.validateToken(token)
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
