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

describe('(UNIT) POST /revoke', async () => {

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

	describe('Token revoke flow', async () => {

		const clientId = chance.string({pool: 'abcdefghijkl1234567_', length: 12})
		const storedToken = {
			toJSON: () => {
				return {
					id: chance.integer({ min: 1 }),
					clientId,
				}
			},
			related: (rel) => {
				return {
					toJSON: () => {
						return [
							{ scope: {name: `${rel}1`} },
							{ scope: {name: `${rel}2`} },
							{ scope: {name: `${rel}3`} },
						]
					},
				}
			},
		}
		const token_type_hint = 'access_token'


		describe('Successfully revoke token', async () =>{

			let err, res, state, token

			before(async ()=> {
				token = chance.string({pool: 'abcdefghijkl1234567_'})

				stubs.get = stub(session,'get').returns({
					req_state : state,
				})
				stubs.set = stub(session,'set').returns()
        
				stubs.validateBearerToken = stub(oauthSrvc, 'validateBearerToken')
					.resolves(storedToken)

				stubs.validateTokenOwnership = stub( oauthSrvc, 'validateTokenOwnership')
					.resolves({ exists: true, isFromUser: true })
				stubs.revokeToken = stub( oauthSrvc, 'revokeToken')
					.resolves()
				
				try {
					res = await server.inject({
						headers: {
							'authorization': `Bearer ${token}`,
						},
						method: 'POST',
						url: '/revoke',
						payload:{
							token,
							token_type_hint,
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

		describe('Successfully revoke token (token does not exist)', async () =>{

			let err, res, state, token

			before(async ()=> {
				token = chance.string({pool: 'abcdefghijkl1234567_'})

				stubs.get = stub(session,'get').returns({
					req_state : state,
				})
				stubs.set = stub(session,'set').returns()
        
				stubs.validateBearerToken = stub(oauthSrvc, 'validateBearerToken')
					.resolves(storedToken)

				stubs.validateTokenOwnership = stub( oauthSrvc, 'validateTokenOwnership')
					.resolves({ exists: false, isFromUser: true })
				stubs.revokeToken = stub( oauthSrvc, 'revokeToken')
					.resolves()
				
				try {
					res = await server.inject({
						headers: {
							'authorization': `Bearer ${token}`,
						},
						method: 'POST',
						url: '/revoke',
						payload:{
							token,
							token_type_hint,
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

		describe('Successfully revoke token response (failed to revoke)', async () =>{

			let err, res, state, token

			before(async ()=> {
				token = chance.string({pool: 'abcdefghijkl1234567_'})

				stubs.get = stub(session,'get').returns({
					req_state : state,
				})
				stubs.set = stub(session,'set').returns()
        
				stubs.validateBearerToken = stub(oauthSrvc, 'validateBearerToken')
					.resolves(storedToken)

				stubs.validateTokenOwnership = stub( oauthSrvc, 'validateTokenOwnership')
					.resolves({ exists: true, isFromUser: true })
				stubs.revokeToken = stub( oauthSrvc, 'revokeToken')
					.rejects()
				
				try {
					res = await server.inject({
						headers: {
							'authorization': `Bearer ${token}`,
						},
						method: 'POST',
						url: '/revoke',
						payload:{
							token,
							token_type_hint,
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

		describe('Unsuccessfully revoke token (bad request no token)', async () =>{

			let err, res, state, token

			before(async ()=> {
				token = chance.string({pool: 'abcdefghijkl1234567_'})

				stubs.get = stub(session,'get').returns({
					req_state : state,
				})
				stubs.set = stub(session,'set').returns()
        
				stubs.validateBearerToken = stub(oauthSrvc, 'validateBearerToken')
					.resolves(storedToken)

				stubs.validateTokenOwnership = stub( oauthSrvc, 'validateTokenOwnership')
					.resolves({ exists: true, isFromUser: true })
				stubs.revokeToken = stub( oauthSrvc, 'revokeToken')
					.resolves()
				
				try {
					res = await server.inject({
						headers: {
							'authorization': `Bearer ${token}`,
						},
						method: 'POST',
						url: '/revoke',
						payload: {},
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

		describe('Unsuccessfully revoke token (not the token owner)', async () =>{

			let err, res, state, token

			before(async ()=> {
				token = chance.string({pool: 'abcdefghijkl1234567_'})

				stubs.get = stub(session,'get').returns({
					req_state : state,
				})
				stubs.set = stub(session,'set').returns()
        
				stubs.validateBearerToken = stub(oauthSrvc, 'validateBearerToken')
					.resolves(storedToken)

				stubs.validateTokenOwnership = stub( oauthSrvc, 'validateTokenOwnership')
					.resolves({ exists: true, isFromUser: false })
				stubs.revokeToken = stub( oauthSrvc, 'revokeToken')
					.resolves()
				
				try {
					res = await server.inject({
						headers: {
							'authorization': `Bearer ${token}`,
						},
						method: 'POST',
						url: '/revoke',
						payload: {
							token,
							token_type_hint,
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

