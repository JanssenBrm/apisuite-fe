const { afterEach, before, after, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')
const chance = require('../../../mocks/chance')


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

	describe('Refresh token flow', async () =>{

		describe('Successfully get access token', async () =>{

			let err, res, state, token, refresh

			before(async ()=> {
				const grantType = 'refresh_token'
				const scope = 'aisp;pisp'
				
				token = chance.string({ pool: 'abcdefghijkl1234567_' })
				refresh = chance.string({ pool: 'abcdefghijkl1234567_' })

				stubs.get = stub(session,'get').returns({
					req_state : state,
				})

				stubs.set = stub(session,'set').returns()

				stubs.validateScope = stub( oauthSrvc, 'validateScope')
					.resolves({ isValid: true, message: null })
				stubs.validateGrantType = stub( oauthSrvc, 'validateGrantType')
					.resolves({ isValid: true, message: null })
			
				const expires = new Date()
				expires.setTime(expires.getTime() + (1*60*60*1000)) // + 1 hour
				stubs.refreshToken = stub(oauthSrvc, 'refreshToken')
					.resolves({
						token_type: 'bearer',
						token,
						expires,
						refresh,
					})
				
				try {
					res = await server.inject({
						method: 'POST',
						url: '/token',
						payload:{
							grant_type: grantType,
							scope: scope,
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
				expect(JSON.parse(res.payload).refresh).to.be.equal(refresh)
			})


		})

		describe('Unsuccessfully authtoken generation with wrong refresh token', async () =>{

			let err, res, state

			before(async ()=> {
				const grantType = 'refresh_token'
				const scope = 'aisp;pisp'

				stubs.get = stub(session,'get').returns({
					req_state : state,
				})

				stubs.set = stub(session,'set').returns()

				stubs.validateScope = stub( oauthSrvc, 'validateScope')
					.resolves({ isValid: true, message: null })
				stubs.validateGrantType = stub( oauthSrvc, 'validateGrantType')
					.resolves({ isValid: true, message: null })
			
				const expires = new Date()
				expires.setTime(expires.getTime() + (1*60*60*1000)) // + 1 hour
				stubs.refreshToken = stub(oauthSrvc, 'refreshToken')
					.rejects()
				
				try {
					res = await server.inject({
						method: 'POST',
						url: '/token',
						payload:{
							grant_type: grantType,
							scope: scope,
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

			it('Should not generate a token', () => {
				expect(JSON.parse(res.payload).token).to.be.undefined()
			})


		})

	})
})

