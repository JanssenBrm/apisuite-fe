const { afterEach, before, after, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')
const chance = require('../../../mocks/chance')
const bcrypt = require('bcrypt')


const config = require('../../../../config')
const Hapi = require('hapi')

const server = new Hapi.Server(config.get('server'))

const plugins = [
	require('hapi-auth-cookie'),
	require('hapi-auth-bearer-token'),
	require('vision'),
	require('../../../../src/plugins/internal/x-request-id'),
	require('../../../../src/plugins/internal/internationalization'),
	require('../../../../src/plugins/internal/session'),
	require('../../../../src/plugins/internal/cache'),
	require('../../../../src/plugins/internal/authStrategies'),
	require('../../../../src/plugins/oauth'),
]

const oauthSrvc = require('../../../../src/services/oauth')
const appService = require('../../../../src/services/app')
const psuService = require('../../../../src/services/psu')
const authPersistence = require('../../../../src/services/oauth/persistence')
const authHelper = require('../../../../src/services/oauth/helper')
const session = require('../../../../src/utils/session')

const stubs = {}

describe('(UNIT) POST /token?...', async () => {

	before(async () => {
		await server.register(plugins)
		await server.start()
	})

	after(async () => {
		await server.stop()
	})

	afterEach(async () =>{
		Object.keys(stubs).map((stb)=> stubs[stb].restore())
	})

	describe('Successful request', async () =>{

		describe('Successful authtoken generation', async () =>{

			let err, res, state, code, challenge, token

			before(async ()=> {
				const grantType = 'authorization_code'
				const redirectUri = 'https://test.com/cb'
				const clientId = chance.string({pool: 'abcdefghijkl123456789'})
				const scope = 'aisp;pisp'

				code = chance.string({pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'})
				
				token = chance.string({pool: 'abcdefghijkl1234567_'})

				const challengePlain = chance.string({pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_*&?^!'})

				challenge = await bcrypt.hash(challengePlain, 5)

				stubs.get = stub(session,'get').returns({
					req_state : state,
				})

				stubs.set = stub(session,'set').returns()

				stubs.validateScope = stub( oauthSrvc, 'validateScope')
					.resolves({isValid:true, message: null})
				stubs.validateGrantType = stub( oauthSrvc, 'validateGrantType')
					.resolves({isValid:true, message: null})
			
				const expires = new Date()
				expires.setTime(expires.getTime() + (1*60*60*1000)) // + 1 hour
				stubs.fetchAuthorizationCode = stub(authHelper, 'fetchAuthorizationCode')
					.resolves({
						id: 1,
						code: code,
						clientId: clientId,
						userId: 1,
						scopes: [
							{ scope: {name: 'aisp'}, brand: 'bnppf', appId: 1, scopeId: 2},
							{ scope: {name: 'aisp'}, brand: 'fintro', appId: 1, scopeId: 2 },
							{ scope: {name: 'pisp'}, brand: 'fintro', appId: 1, scopeId: 4},
						],
						codeChallenge: challenge,
						codeChallengeMethod: 'S256',
						expires: expires,
					})
				
				stubs.removeCode = stub(authPersistence, 'removeCode')
					.resolves()
			
				stubs.createAccreditation = stub(psuService, 'createAccreditation')
					.resolves()

				stubs.findClientById = stub(appService, 'findClientById')
					.resolves({ })
				stubs.findRedirectUrl = stub(appService, 'findRedirectUrl')
					.resolves({ })
				
				stubs.saveToken = stub(authPersistence, 'saveToken')
					.resolves({
						token,
					})
				
				try {
					res = await server.inject({
						method: 'POST',
						url: `/token?client_id=${clientId}`,
						payload:{
							grant_type: grantType,
							redirect_uri: redirectUri,
							scope: scope,
							code_verifier: challengePlain,
							client_id: clientId,
						},
					})
				} catch(error) {
					err = error
				}
			})

			it('Should not throw an error', () => {
				expect(err).to.be.undefined()
			})

			it('Should return status code 200', () => {
				expect(res.statusCode).to.be.equal(200)
			})

			it('Should generate a token', () => {
				expect(JSON.parse(res.payload).token).to.be.equal(token)
			})


		})

		describe('Unsuccessful authtoken generation with wrong code verifier', async () =>{

			let err, res, state, code, challenge, token

			before(async ()=> {
				const grantType = 'authorization_code'
				const redirectUri = 'https://test.com/cb'
				const clientId = chance.string({pool: 'abcdefghijkl123456789'})
				const scope = 'aisp;pisp'

				code = chance.string({pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'})
				
				token = chance.string({pool: 'abcdefghijkl1234567_'})

				const challengePlain = chance.string({pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_*&?^!'})

				challenge = await bcrypt.hash(challengePlain, 5)

				stubs.get = stub(session,'get').returns({
					req_state : state,
				})

				stubs.set = stub(session,'set').returns()

				stubs.validateScope = stub( oauthSrvc, 'validateScope')
					.resolves({isValid:true, message: null})
				stubs.validateGrantType = stub( oauthSrvc, 'validateGrantType')
					.resolves({isValid:true, message: null})
			
				const expires = new Date()
				expires.setTime(expires.getTime() + (1*60*60*1000)) // + 1 hour
				stubs.getCode = stub(authPersistence, 'getCode')
					.resolves({
						id: 1,
						code: code,
						clientId: clientId,
						userId: 1,
						scopes: [
							{name: 'aisp'},
							{name: 'pisp'},
						],
						codeChallenge: challenge,
						codeChallengeMethod: 'S256',
						expires: expires,
					})
				
				stubs.removeCode = stub(authPersistence, 'removeCode')
					.resolves()
			
				stubs.createAccreditation = stub(psuService, 'createAccreditation')
					.resolves()

				stubs.findClientById = stub(appService, 'findClientById')
					.resolves({ })
				stubs.findRedirectUrl = stub(appService, 'findRedirectUrl')
					.resolves({ })
				
				stubs.saveToken = stub(authPersistence, 'saveToken')
					.resolves({
						token,
					})
				
				try {
					res = await server.inject({
						method: 'POST',
						url: `/token?client_id=${clientId}`,
						payload:{
							grant_type: grantType,
							redirect_uri: redirectUri,
							scope: scope,
							code_verifier: 'wrong_verifier',
							client_id: clientId,
						},
					})
				} catch(error) {
					err = error
				}
			})

			it('Should not throw an error', () => {
				expect(err).to.be.undefined()
			})

			it('Should return status code 403', () => {
				expect(res.statusCode).to.be.equal(403)
			})

			it('Should generate a token', () => {
				expect(JSON.parse(res.payload).token).to.be.undefined()
			})


		})

		describe('Unsuccessful authtoken generation with undefined verifier and secret', async () =>{

			let err, res, state, code, challenge, token

			before(async ()=> {
				const grantType = 'authorization_code'
				const redirectUri = 'https://test.com/cb'
				const clientId = chance.string({pool: 'abcdefghijkl123456789'})
				const scope = 'aisp;pisp'

				code = chance.string({pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'})
				
				token = chance.string({pool: 'abcdefghijkl1234567_'})

				const challengePlain = chance.string({pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_*&?^!'})

				challenge = await bcrypt.hash(challengePlain, 5)

				stubs.get = stub(session,'get').returns({
					req_state : state,
				})

				stubs.set = stub(session,'set').returns()

				stubs.validateScope = stub( oauthSrvc, 'validateScope')
					.resolves({isValid:true, message: null})
				stubs.validateGrantType = stub( oauthSrvc, 'validateGrantType')
					.resolves({isValid:true, message: null})
			
				const expires = new Date()
				expires.setTime(expires.getTime() + (1*60*60*1000)) // + 1 hour

				stubs.getCode = stub(authPersistence, 'getCode')
					.resolves({
						id: 1,
						code: code,
						clientId: clientId,
						userId: 1,
						scopes: scope,
						codeChallenge: challenge,
						codeChallengeMethod: 'S256',
						expires: expires,
					})
				
				stubs.removeCode = stub(authPersistence, 'removeCode')
					.resolves()
			
				stubs.createAccreditation = stub(psuService, 'createAccreditation')
					.resolves()

				stubs.findClientById = stub(appService, 'findClientById')
					.resolves({ })
				stubs.findRedirectUrl = stub(appService, 'findRedirectUrl')
					.resolves({ })
				
				stubs.saveToken = stub(authPersistence, 'saveToken')
					.resolves({
						token,
					})
				
				try {
					res = await server.inject({
						method: 'POST',
						url: `/token?client_id=${clientId}`,
						payload:{
							grant_type: grantType,
							redirect_uri: redirectUri,
							scope: scope,
							client_id: clientId,
						},
					})
				} catch(error) {
					err = error
				}
			})

			it('Should not throw an error', () => {
				expect(err).to.be.undefined()
			})

			it('Should return status code 400', () => {
				expect(res.statusCode).to.be.equal(400)
			})

			it('Should not generate a token', () => {
				expect(JSON.parse(res.payload).token).to.be.undefined()
			})


		})

		describe('Unsuccessful authtoken generation with empty code verifier', async () =>{

			let err, res, state, code, challenge, token

			before(async ()=> {
				const grantType = 'authorization_code'
				const redirectUri = 'https://test.com/cb'
				const clientId = chance.string({pool: 'abcdefghijkl123456789'})
				const scope = 'aisp;pisp'

				code = chance.string({pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'})
				
				token = chance.string({pool: 'abcdefghijkl1234567_'})

				const challengePlain = chance.string({pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_*&?^!'})

				challenge = await bcrypt.hash(challengePlain, 5)

				stubs.get = stub(session,'get').returns({
					req_state : state,
				})

				stubs.set = stub(session,'set').returns()

				stubs.validateScope = stub( oauthSrvc, 'validateScope')
					.resolves({isValid:true, message: null})
				stubs.validateGrantType = stub( oauthSrvc, 'validateGrantType')
					.resolves({isValid:true, message: null})
			
				const expires = new Date()
				expires.setTime(expires.getTime() + (1*60*60*1000)) // + 1 hour
				stubs.getCode = stub(authPersistence, 'getCode')
					.resolves({
						id: 1,
						code: code,
						clientId: clientId,
						userId: 1,
						scopes: scope,
						codeChallenge: challenge,
						codeChallengeMethod: 'S256',
						expires: expires,
					})
				
				stubs.removeCode = stub(authPersistence, 'removeCode')
					.resolves()
			
				stubs.createAccreditation = stub(psuService, 'createAccreditation')
					.resolves()

				stubs.findClientById = stub(appService, 'findClientById')
					.resolves({ })
				stubs.findRedirectUrl = stub(appService, 'findRedirectUrl')
					.resolves({ })
				
				stubs.saveToken = stub(authPersistence, 'saveToken')
					.resolves({
						token,
					})
				
				try {
					res = await server.inject({
						method: 'POST',
						url: `/token?client_id=${clientId}`,
						payload:{
							grant_type: grantType,
							redirect_uri: redirectUri,
							scope: scope,
							code_verifier: '',
							client_id: clientId,
						},
					})
				} catch(error) {
					err = error
				}
			})

			it('Should not throw an error', () => {
				expect(err).to.be.undefined()
			})

			it('Should return status code 400', () => {
				expect(res.statusCode).to.be.equal(400)
			})

			it('Should generate a token', () => {
				expect(JSON.parse(res.payload).token).to.be.undefined()
			})


		})

		describe('Unsuccessful authtoken generation if scopes mismatch', async () =>{

			let err, res, state, code, challenge, token

			before(async ()=> {
				const grantType = 'authorization_code'
				const redirectUri = 'https://test.com/cb'
				const clientId = chance.string({pool: 'abcdefghijkl123456789'})
				const scope = 'aisp;pisp'

				code = chance.string({pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'})
				
				token = chance.string({pool: 'abcdefghijkl1234567_'})

				const challengePlain = chance.string({pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_*&?^!'})

				challenge = await bcrypt.hash(challengePlain, 5)

				stubs.get = stub(session,'get').returns({
					req_state : state,
				})

				stubs.set = stub(session,'set').returns()

				stubs.validateScope = stub( oauthSrvc, 'validateScope')
					.resolves({isValid:true, message: null})
				stubs.validateGrantType = stub( oauthSrvc, 'validateGrantType')
					.resolves({isValid:true, message: null})
			
				const expires = new Date()
				expires.setTime(expires.getTime() + (1*60*60*1000)) // + 1 hour
				stubs.fetchAuthorizationCode = stub(authHelper, 'fetchAuthorizationCode')
					.resolves({
						id: 1,
						code: code,
						clientId: clientId,
						userId: 1,
						scopes: [
							{ scope: {name: 'aisp'}, brand: 'bnppf', appId: 1, scopeId: 2},
						],
						codeChallenge: challenge,
						codeChallengeMethod: 'S256',
						expires: expires,
					})
				
				stubs.removeCode = stub(authPersistence, 'removeCode')
					.resolves()
			
				stubs.createAccreditation = stub(psuService, 'createAccreditation')
					.resolves()

				stubs.findClientById = stub(appService, 'findClientById')
					.resolves({ })
				stubs.findRedirectUrl = stub(appService, 'findRedirectUrl')
					.resolves({ })
				
				stubs.saveToken = stub(authPersistence, 'saveToken')
					.resolves({
						token,
					})
				
				try {
					res = await server.inject({
						method: 'POST',
						url: `/token?client_id=${clientId}`,
						payload:{
							grant_type: grantType,
							redirect_uri: redirectUri,
							scope: scope,
							code_verifier: challengePlain,
							client_id: clientId,
						},
					})
				} catch(error) {
					err = error
				}
			})

			it('Should not throw an error', () => {
				expect(err).to.be.undefined()
			})

			it('Should return status code 400', () => {
				expect(res.statusCode).to.be.equal(400)
			})

		})
	})
})

