const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')
const chance = require('../../../mocks/chance')

const authService = require('../../../../src/services/oauth')
const authPersistence = require('../../../../src/services/oauth/persistence')
const psuService = require('../../../../src/services/psu')
const appSrvc = require('../../../../src/services/app')

const stubs = {}

describe('(UNIT) services.auth.authenticate', async () => {

	afterEach(() => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})


	describe('Authentication is successfull', async () => {
		let result, error

		const username = 'test_user'
		const password = 'test_pwd'
		const container = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz1234567890' })
		const clientId = chance.string({ pool: 'abcdefghijkl1234567_', length: 12 })
		const psu = {
			id: chance.integer({ min: 1, max: 100 }),
			username,
			password,
		}
		const token = {
			token_type: 'bearer',
			token: chance.string({ scope: 'abc' }),
			expires: new Date().getTime(),
			refresh: chance.string({ scope: 'xzv' }),
		}

		before(async () => {

			stubs.validatePsu = stub(psuService, 'validatePsu')
				.resolves({ authenticated: true, psu })
			stubs.saveToken = stub(authPersistence, 'saveToken')
				.resolves(token)

			stubs.getAppScopes = stub(appSrvc, 'getAppScopes')
				.resolves([
					{ scope: {name: 'aisp'}, brand: 'bnppf', appId: 1, scopeId: 2},
					{ scope: {name: 'aisp'}, brand: 'fintro', appId: 1, scopeId: 2 },
					{ scope: {name: 'pisp'}, brand: 'fintro', appId: 1, scopeId: 4},
				])

			try {

				result = await authService.authenticate(username, password, container, clientId)

			} catch (err) {
				error = err
			}
		})

		it('Shouldn\'t throw an error', async () => {
			expect(error).to.not.exist()
		})

		it('Should return authenticated as true', async () => {
			expect(result).to.be.object()
			expect(result).to.include('authenticated')
			expect(result.authenticated).to.be.true()
		})

		it('Should return the psu', async () => {
			expect(result).to.include('user')
			expect(result.user).to.be.equal(psu)
		})

		it('Should return the token', async () => {
			expect(result).to.include('token')
			expect(result.token).to.be.equal(token)
			expect(result).to.include('clientId')
			expect(result.clientId).to.be.equal(clientId)
		})

		it('Should return the clientId', async () => {
			expect(result).to.include('clientId')
			expect(result.clientId).to.be.equal(clientId)
		})
	})

	describe('Authentication is unsuccessfull with error in validate', async () => {
		let result, error

		const username = 'test_user'
		const password = 'test_pwd'
		const container = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz1234567890' })
		const clientId = chance.string({ pool: 'abcdefghijkl1234567_', length: 12 })
		const token = {
			token_type: 'bearer',
			token: chance.string({ scope: 'abc' }),
			expires: new Date().getTime(),
			refresh: chance.string({ scope: 'xzv' }),
		}

		before(async () => {

			stubs.validatePsu = stub(psuService, 'validatePsu')
				.throws()
			stubs.saveToken = stub(authPersistence, 'saveToken')
				.resolves(token)

			try {

				result = await authService.authenticate(username, password, container, clientId)

			} catch (err) {
				error = err
			}
		})

		it('Shouldn\'t throw an error', async () => {
			expect(error).to.not.exist()
		})

		it('Should return authenticated as false', async () => {
			expect(result).to.be.object()
			expect(result).to.include('authenticated')
			expect(result.authenticated).to.be.false()
		})

		it('Should return the psu null', async () => {
			expect(result).to.include('user')
			expect(result.user).to.be.null()
		})
	})

	describe('Authentication is unsuccessfull with status code 403 in validate', async () => {
		let result, error

		const username = 'test_user'
		const password = 'test_pwd'
		const container = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz1234567890' })
		const clientId = chance.string({ pool: 'abcdefghijkl1234567_', length: 12 })
		const psu = {
			id: chance.integer({ min: 1, max: 100 }),
			username,
			password,
		}
		const token = {
			token_type: 'bearer',
			token: chance.string({ scope: 'abc' }),
			expires: new Date().getTime(),
			refresh: chance.string({ scope: 'xzv' }),
		}

		before(async () => {

			stubs.validatePsu = stub(psuService, 'validatePsu')
				.resolves({ authenticated: false, psu, statusCode: 403 })
			stubs.saveToken = stub(authPersistence, 'saveToken')
				.resolves(token)

			try {

				result = await authService.authenticate(username, password, container, clientId)

			} catch (err) {
				error = err
			}
		})

		it('Shouldn\'t throw an error', async () => {
			expect(error).to.not.exist()
		})

		it('Should return authenticated as false', async () => {
			expect(result).to.be.object()
			expect(result).to.include('authenticated')
			expect(result.authenticated).to.be.false()
		})

		it('Should return the psu null', async () => {
			expect(result).to.include('user')
			expect(result.user).to.be.null()
		})
	})

	describe('Authentication is unsuccessfull with status code 401 in validate', async () => {
		let result, error

		const username = 'test_user'
		const password = 'test_pwd'
		const container = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz1234567890' })
		const clientId = chance.string({ pool: 'abcdefghijkl1234567_', length: 12 })
		const psu = {
			id: chance.integer({ min: 1, max: 100 }),
			username,
			password,
		}
		const token = {
			token_type: 'bearer',
			token: chance.string({ scope: 'abc' }),
			expires: new Date().getTime(),
			refresh: chance.string({ scope: 'xzv' }),
		}

		before(async () => {

			stubs.validatePsu = stub(psuService, 'validatePsu')
				.resolves({ authenticated: false, psu, statusCode: 401 })
			stubs.saveToken = stub(authPersistence, 'saveToken')
				.resolves(token)

			try {

				result = await authService.authenticate(username, password, container, clientId)

			} catch (err) {
				error = err
			}
		})

		it('Shouldn\'t throw an error', async () => {
			expect(error).to.not.exist()
		})

		it('Should return authenticated as false', async () => {
			expect(result).to.be.object()
			expect(result).to.include('authenticated')
			expect(result.authenticated).to.be.false()
		})

		it('Should return the psu null', async () => {
			expect(result).to.include('user')
			expect(result.user).to.be.null()
		})
	})

	describe('Authentication is unsuccessfull with error in generateToken', async () => {
		let result, error

		const username = 'test_user'
		const password = 'test_pwd'
		const container = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz1234567890' })
		const clientId = chance.string({ pool: 'abcdefghijkl1234567_', length: 12 })
		const psu = {
			id: chance.integer({ min: 1, max: 100 }),
			username,
			password,
		}

		before(async () => {

			stubs.validatePsu = stub(psuService, 'validatePsu')
				.resolves(psu)
			stubs.saveToken = stub(authPersistence, 'saveToken')
				.throws()

			try {

				result = await authService.authenticate(username, password, container, clientId)

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
