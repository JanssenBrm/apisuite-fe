const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')
const chance = require('../../../mocks/chance')

const bcrypt = require('bcrypt')
const authService = require('../../../../src/services/oauth')
const authPersistence = require('../../../../src/services/oauth/persistence')
const authHelper = require('../../../../src/services/oauth/helper')
const appService = require('../../../../src/services/app')
const psuService = require('../../../../src/services/psu')

const stubs = {}

describe('(UNIT) services.auth.codeExchange', async () => {

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
	const today = new Date()
	today.setHours(today.getHours() + 1)
	const authCode = {
		id: chance.integer({ min: 1, max: 50 }),
		code: chance.string({ scope: 'abc', length: 32 }),
		clientId,
		userId: chance.integer({ min: 1, max: 50 }),
		scopes: [
			
			{ scope: {name: scope}, brand: 'bnppf', appId: 1, scopeId: 2},
			
		],
		codeChallenge: chance.string({ scope: 'abc', length: 12 }),
		codeChallengeMethod: 'S256',
		expires: today,
	}

	describe('Exchanging code with token is successful (with verifier)', async () => {
		let result, error

		before(async () => {

			stubs.fetchAuthorizationCode = stub(authHelper, 'fetchAuthorizationCode')
				.resolves(authCode)

			stubs.compare = stub(bcrypt, 'compare')
				.resolves(true)
			stubs.findClientById = stub(appService, 'findClientById')
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
			stubs.findRedirectUrl = stub(appService, 'findRedirectUrl')
				.resolves(redirectURLs[0])
			stubs.saveToken = stub(authPersistence, 'saveToken')
				.resolves(token)
			stubs.removeCode = stub(authPersistence, 'removeCode')
				.resolves()
			stubs.createAccreditation = stub(psuService, 'createAccreditation')
				.resolves()

			

			try {

				result = await authService.codeExchange(authCode.code, clientId, clientSecret, redirectURLs[0], scope, authCode.codeChallenge)

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

	describe('Exchanging code with token is successful (without verifier)', async () => {
		let result, error

		before(async () => {

			stubs.getCode = stub(authHelper, 'fetchAuthorizationCode')
				.resolves(authCode)

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
			stubs.findRedirectUrl = stub(appService, 'findRedirectUrl')
				.resolves(redirectURLs[0])
			stubs.saveToken = stub(authPersistence, 'saveToken')
				.resolves(token)
			stubs.removeCode = stub(authPersistence, 'removeCode')
				.resolves()
			stubs.createAccreditation = stub(psuService, 'createAccreditation')
				.resolves()

			try {

				result = await authService.codeExchange(authCode.code, clientId, clientSecret, redirectURLs[0], scope)

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

	describe('Exchanging code with token is unsuccessful (error getting code)', async () => {
		let result, error

		before(async () => {

			stubs.getCode = stub(authPersistence, 'getCode')
				.throws()
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
			stubs.findRedirectUrl = stub(appService, 'findRedirectUrl')
				.resolves(redirectURLs[0])
			stubs.saveToken = stub(authPersistence, 'saveToken')
				.resolves(token)
			stubs.removeCode = stub(authPersistence, 'removeCode')
				.resolves()
			stubs.createAccreditation = stub(psuService, 'createAccreditation')
				.resolves()

			try {

				result = await authService.codeExchange(authCode.code, clientId, clientSecret, redirectURLs[0], scope, authCode.codeChallenge)

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

	describe('Exchanging code with token is unsuccessful (no code)', async () => {
		let result, error

		before(async () => {

			stubs.getCode = stub(authPersistence, 'getCode')
				.resolves(null)
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
			stubs.findRedirectUrl = stub(appService, 'findRedirectUrl')
				.resolves(redirectURLs[0])
			stubs.saveToken = stub(authPersistence, 'saveToken')
				.resolves(token)
			stubs.removeCode = stub(authPersistence, 'removeCode')
				.resolves()
			stubs.createAccreditation = stub(psuService, 'createAccreditation')
				.resolves()

			try {

				result = await authService.codeExchange(authCode.code, clientId, clientSecret, redirectURLs[0], scope, authCode.codeChallenge)

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

	describe('Exchanging code with token is unsuccessful (invalid challenge)', async () => {
		let result, error

		before(async () => {

			stubs.getCode = stub(authPersistence, 'getCode')
				.resolves(authCode)
			stubs.compare = stub(bcrypt, 'compare')
				.resolves(false)
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
			stubs.findRedirectUrl = stub(appService, 'findRedirectUrl')
				.resolves(redirectURLs[0])
			stubs.saveToken = stub(authPersistence, 'saveToken')
				.resolves(token)
			stubs.removeCode = stub(authPersistence, 'removeCode')
				.resolves()
			stubs.createAccreditation = stub(psuService, 'createAccreditation')
				.resolves()

			try {

				result = await authService.codeExchange(authCode.code, clientId, clientSecret, redirectURLs[0], scope, authCode.codeChallenge)

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

	describe('Exchanging code with token is unsuccessful (expired code)', async () => {
		let result, error
		const past = new Date()
		past.setHours(past.getHours() - 1)
		const expCode = {
			id: chance.integer({ min: 1, max: 50 }),
			code: chance.string({ scope: 'abc', length: 32 }),
			clientId,
			userId: chance.integer({ min: 1, max: 50 }),
			scopes: scope,
			codeChallenge: chance.string({ scope: 'abc', length: 12 }),
			codeChallengeMethod: 'S256',
			expires: past,
		}

		before(async () => {

			stubs.getCode = stub(authPersistence, 'getCode')
				.resolves(expCode)
			stubs.compare = stub(bcrypt, 'compare')
				.resolves(true)
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
			stubs.findRedirectUrl = stub(appService, 'findRedirectUrl')
				.resolves(redirectURLs[0])
			stubs.saveToken = stub(authPersistence, 'saveToken')
				.resolves(token)
			stubs.removeCode = stub(authPersistence, 'removeCode')
				.resolves()
			stubs.createAccreditation = stub(psuService, 'createAccreditation')
				.resolves()

			try {

				result = await authService.codeExchange(authCode.code, clientId, clientSecret, redirectURLs[0], scope, authCode.codeChallenge)

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

	describe('Exchanging code with token is unsuccessful (fail to find app findClientByCredentials error)', async () => {
		let result, error

		before(async () => {

			stubs.getCode = stub(authPersistence, 'getCode')
				.resolves(authCode)
			stubs.compare = stub(bcrypt, 'compare')
				.resolves(true)
			stubs.findClientByCredentials = stub(appService, 'findClientByCredentials')
				.throws()
			stubs.findRedirectUrl = stub(appService, 'findRedirectUrl')
				.resolves(redirectURLs[0])
			stubs.saveToken = stub(authPersistence, 'saveToken')
				.resolves(token)
			stubs.removeCode = stub(authPersistence, 'removeCode')
				.resolves()
			stubs.createAccreditation = stub(psuService, 'createAccreditation')
				.resolves()

			try {

				result = await authService.codeExchange(authCode.code, clientId, clientSecret, redirectURLs[0], scope)

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

	describe('Exchanging code with token is unsuccessful (fail to find app findClientById error)', async () => {
		let result, error

		before(async () => {

			stubs.getCode = stub(authPersistence, 'getCode')
				.resolves(authCode)
			stubs.compare = stub(bcrypt, 'compare')
				.resolves(true)
			stubs.findClientById = stub(appService, 'findClientById')
				.throws()
			stubs.findRedirectUrl = stub(appService, 'findRedirectUrl')
				.resolves(redirectURLs[0])
			stubs.saveToken = stub(authPersistence, 'saveToken')
				.resolves(token)
			stubs.removeCode = stub(authPersistence, 'removeCode')
				.resolves()
			stubs.createAccreditation = stub(psuService, 'createAccreditation')
				.resolves()

			try {

				result = await authService.codeExchange(authCode.code, clientId, clientSecret, redirectURLs[0], scope, authCode.codeChallenge)

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

	describe('Exchanging code with token is unsuccessful (fail to find app)', async () => {
		let result, error

		before(async () => {

			stubs.getCode = stub(authPersistence, 'getCode')
				.resolves(authCode)
			stubs.compare = stub(bcrypt, 'compare')
				.resolves(true)
			stubs.findClientById = stub(appService, 'findClientById')
				.resolves(null)
			stubs.findRedirectUrl = stub(appService, 'findRedirectUrl')
				.resolves(redirectURLs[0])
			stubs.saveToken = stub(authPersistence, 'saveToken')
				.resolves(token)
			stubs.removeCode = stub(authPersistence, 'removeCode')
				.resolves()
			stubs.createAccreditation = stub(psuService, 'createAccreditation')
				.resolves()

			try {

				result = await authService.codeExchange(authCode.code, clientId, clientSecret, redirectURLs[0], scope, authCode.codeChallenge)

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

	describe('Exchanging code with token is unsuccessful (fail to find app redirect url findRedirectUrl error)', async () => {
		let result, error

		before(async () => {

			stubs.getCode = stub(authPersistence, 'getCode')
				.resolves(authCode)
			stubs.compare = stub(bcrypt, 'compare')
				.resolves(true)
			stubs.findClientById = stub(appService, 'findClientById')
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
			stubs.findRedirectUrl = stub(appService, 'findRedirectUrl')
				.throws()
			stubs.saveToken = stub(authPersistence, 'saveToken')
				.resolves(token)
			stubs.removeCode = stub(authPersistence, 'removeCode')
				.resolves()
			stubs.createAccreditation = stub(psuService, 'createAccreditation')
				.resolves()

			try {

				result = await authService.codeExchange(authCode.code, clientId, clientSecret, redirectURLs[0], scope, authCode.codeChallenge)

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

	describe('Exchanging code with token is unsuccessful (fail to find app redirect url)', async () => {
		let result, error

		before(async () => {

			stubs.getCode = stub(authPersistence, 'getCode')
				.resolves(authCode)
			stubs.compare = stub(bcrypt, 'compare')
				.resolves(true)
			stubs.findClientById = stub(appService, 'findClientById')
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
			stubs.findRedirectUrl = stub(appService, 'findRedirectUrl')
				.resolves(null)
			stubs.saveToken = stub(authPersistence, 'saveToken')
				.resolves(token)
			stubs.removeCode = stub(authPersistence, 'removeCode')
				.resolves()
			stubs.createAccreditation = stub(psuService, 'createAccreditation')
				.resolves()

			try {

				result = await authService.codeExchange(authCode.code, clientId, clientSecret, redirectURLs[0], scope, authCode.codeChallenge)

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

	describe('Exchanging code with token is unsuccessful (fail to generate token)', async () => {
		let result, error

		before(async () => {

			stubs.getCode = stub(authPersistence, 'getCode')
				.resolves(authCode)
			stubs.compare = stub(bcrypt, 'compare')
				.resolves(true)
			stubs.findClientById = stub(appService, 'findClientById')
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
			stubs.findRedirectUrl = stub(appService, 'findRedirectUrl')
				.resolves(redirectURLs[0])
			stubs.saveToken = stub(authPersistence, 'saveToken')
				.throws()
			stubs.removeCode = stub(authPersistence, 'removeCode')
				.resolves()
			stubs.createAccreditation = stub(psuService, 'createAccreditation')
				.resolves()

			try {

				result = await authService.codeExchange(authCode.code, clientId, clientSecret, redirectURLs[0], scope, authCode.codeChallenge)

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

	describe('Exchanging code with token is unsuccessful (fail to remove code)', async () => {
		let result, error

		before(async () => {

			stubs.getCode = stub(authPersistence, 'getCode')
				.resolves(authCode)
			stubs.compare = stub(bcrypt, 'compare')
				.resolves(true)
			stubs.findClientById = stub(appService, 'findClientById')
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
			stubs.findRedirectUrl = stub(appService, 'findRedirectUrl')
				.resolves(redirectURLs[0])
			stubs.saveToken = stub(authPersistence, 'saveToken')
				.resolves(token)
			stubs.removeCode = stub(authPersistence, 'removeCode')
				.throws()
			stubs.createAccreditation = stub(psuService, 'createAccreditation')
				.resolves()

			try {

				result = await authService.codeExchange(authCode.code, clientId, clientSecret, redirectURLs[0], scope, authCode.codeChallenge)

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

	describe('Exchanging code with token is unsuccessful (fail to create accreditation)', async () => {
		let result, error

		before(async () => {

			stubs.getCode = stub(authPersistence, 'getCode')
				.resolves(authCode)
			stubs.compare = stub(bcrypt, 'compare')
				.resolves(true)
			stubs.findClientById = stub(appService, 'findClientById')
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
			stubs.findRedirectUrl = stub(appService, 'findRedirectUrl')
				.resolves(redirectURLs[0])
			stubs.saveToken = stub(authPersistence, 'saveToken')
				.resolves(token)
			stubs.removeCode = stub(authPersistence, 'removeCode')
				.resolves()
			stubs.createAccreditation = stub(psuService, 'createAccreditation')
				.throws()

			try {

				result = await authService.codeExchange(authCode.code, clientId, clientSecret, redirectURLs[0], scope, authCode.codeChallenge)

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
