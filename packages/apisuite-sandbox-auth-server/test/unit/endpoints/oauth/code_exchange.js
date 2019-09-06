const { afterEach, before, after, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')
const chance = require('../../../mocks/chance')

const config = require('../../../../config')
const Hapi = require('hapi')
const boom = require('boom')

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
const session = require('../../../../src/utils/session')

const stubs = {}

describe('(UNIT) POST /token', async () => {

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

	describe('authorization_code flow', async () =>{

		describe('Successful code exchange for access token', async () =>{

			let err, res, access_token, refresh_token

			before(async ()=> {
				access_token = chance.string({scope: 'abcdefghijkl'})
				refresh_token = chance.string({scope:'abcdefgh'})

				stubs.get = stub(session,'get').returns()
				const code = chance.string({scope: 'abcdefghijkl'})
				const redirect_uri = 'http://localhost:3000/cb'
				const client_id = chance.string({scope: 'abcdefghijkl'})
				const client_secret = chance.string({scope: 'abcdefghijkl'})

				stubs.codeExchange = stub(oauthSrvc, 'codeExchange')
					.resolves({
						token_type: 'bearer',
						token: access_token,
						expires: new Date().getTime() + 7200,
						refresh: refresh_token,
					})
				stubs.validateScope = stub( oauthSrvc, 'validateScope')
					.resolves({isValid:true, message:null})

				stubs.validateGrantType = stub( oauthSrvc, 'validateGrantType')
					.resolves({isValid:true, message:null})

				stubs.set = stub(session,'set').returns()
				try {
					res = await server.inject({
						method: 'POST',
						url: '/token',
						payload: {
							grant_type :'authorization_code',
							code : code,
							redirect_uri: redirect_uri,
							client_id: client_id,
							client_secret: client_secret,
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
			
		})
		
		describe('Unsuccessful code exchange for access token when code has expired', async () =>{

			let err, res

			before(async ()=> {

				stubs.get = stub(session,'get').returns()
				const code = chance.string({scope: 'abcdefghijkl'})
				const redirect_uri = 'http://localhost:3000/cb'
				const client_id = chance.string({scope: 'abcdefghijkl'})
				const client_secret = chance.string({scope: 'abcdefghijkl'})

				stubs.codeExchange = stub(oauthSrvc, 'codeExchange')
					.throws(boom.unauthorized('Code has expired'))

				stubs.set = stub(session,'set').returns()
				
				stubs.validateScope = stub( oauthSrvc, 'validateScope')
					.resolves({isValid:true, message:null})

				stubs.validateGrantType = stub( oauthSrvc, 'validateGrantType')
					.resolves({isValid:true, message:null})

				try {
					res = await server.inject({
						method: 'POST',
						url: '/token',
						payload: {
							grant_type :'authorization_code',
							code : code,
							redirect_uri: redirect_uri,
							client_id: client_id,
							client_secret: client_secret,
						},
					})
				} catch(error) {
					err = error
				}
			})

			it('Should not throw an error', () => {
				expect(err).to.be.undefined()
			})

			it('Should return status code 401', () => {
				expect(res.statusCode).to.be.equal(401)
			})

			it('Should indicate that the request failed due to an expired code', () => {
				expect(res.result.message).to.be.equal('Code has expired')
			})
			
		})
		
		describe('Unsuccessful code exchange  for access token when client_id is not found', async () =>{

			let err, res

			before(async ()=> {

				stubs.get = stub(session,'get').returns()
				const code = chance.string({scope: 'abcdefghijkl'})
				const redirect_uri = 'http://localhost:3000/cb'
				const client_id = chance.string({scope: 'abcdefghijkl'})
				const client_secret = chance.string({scope: 'abcdefghijkl'})

				stubs.codeExchange = stub(oauthSrvc, 'codeExchange')
					.throws(boom.unauthorized('Unknown client app'))

				stubs.validateScope = stub( oauthSrvc, 'validateScope')
					.resolves({isValid:true, message:null})

				stubs.validateGrantType = stub( oauthSrvc, 'validateGrantType')
					.resolves({isValid:true, message:null})

				stubs.set = stub(session,'set').returns()
				try {
					res = await server.inject({
						method: 'POST',
						url: '/token',
						payload: {
							grant_type :'authorization_code',
							code : code,
							redirect_uri: redirect_uri,
							client_id: client_id,
							client_secret: client_secret,
						},
					})
				} catch(error) {
					err = error
				}
			})

			it('Should not throw an error', () => {
				expect(err).to.be.undefined()
			})

			it('Should return status code 401', () => {
				expect(res.statusCode).to.be.equal(401)
			})

			it('Should indicate that the request failed due to an expired code', () => {
				expect(res.result.message).to.be.equal('Unknown client app')
			})
			
		})

		describe('Unsuccessful code exchange  for access token when redirect_uri doesnt match the registred redirect_uri', async () =>{

			let err, res

			before(async ()=> {

				stubs.get = stub(session,'get').returns()
				const code = chance.string({scope: 'abcdefghijkl'})
				const redirect_uri = 'http://localhost:3000/cb'
				const client_id = chance.string({scope: 'abcdefghijkl'})
				const client_secret = chance.string({scope: 'abcdefghijkl'})

				stubs.codeExchange = stub(oauthSrvc, 'codeExchange')
					.throws(boom.unauthorized('The Redirect Url must match the registred callback url(s)'))

				stubs.validateScope = stub( oauthSrvc, 'validateScope')
					.resolves({isValid:true, message:null})

				stubs.validateGrantType = stub( oauthSrvc, 'validateGrantType')
					.resolves({isValid:true, message:null})

				stubs.set = stub(session,'set').returns()
				try {
					res = await server.inject({
						method: 'POST',
						url: '/token',
						payload: {
							grant_type :'authorization_code',
							code : code,
							redirect_uri: redirect_uri,
							client_id: client_id,
							client_secret: client_secret,
						},
					})
				} catch(error) {
					err = error
				}
			})

			it('Should not throw an error', () => {
				expect(err).to.be.undefined()
			})

			it('Should return status code 401', () => {
				expect(res.statusCode).to.be.equal(401)
			})

			it('Should indicate that the request failed due to an expired code', () => {
				expect(res.result.message).to.be.equal('The Redirect Url must match the registred callback url(s)')
			})
			
		})

	})

})

