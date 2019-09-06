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

const stubs = {}

describe('(UNIT) POST /instrospect', async () => {

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

	describe('instrospect flow', async () =>{

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

		const storedTokenWithBrands = {
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
							{ scope: {name: `${rel}1`}, brand: 'bnppf' },
							{ scope: {name: `${rel}2`}, brand: 'hb'},
							{ scope: {name: `${rel}3`}, brand: 'fintro' },
						]
					},
				}
			},
		}

		describe('Successful retrival of auth data', async () =>{

			let err, res, token

			before(async ()=> {

				token = chance.string({pool: 'abcdefghijkl1234567_'})
				stubs.validateBearerToken = stub(oauthSrvc, 'validateBearerToken')
					.resolves(storedToken)
				
				try {
					res = await server.inject({
						headers: {
							'authorization': `Bearer ${token}`,
						},
						method: 'POST',
						url: '/introspect',
						payload:{
							token,
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

			it('Should get auth data', () => {
				const payload = JSON.parse(res.payload)
				expect(payload).to.be.an.object()
				expect(payload).to.include('isAuthenticated')
				expect(payload).to.include('isAuthorized')
				expect(payload).to.include('credentials')
				expect(payload.credentials).to.include('token')
				expect(payload.credentials.token).to.be.equal(token)
				expect(payload).to.include('artifacts')
				expect(payload.artifacts).to.include('client')
				expect(payload.artifacts.client).to.be.equal(clientId)
				expect(payload).to.include('strategy')
				expect(payload).to.include('mode')
				expect(payload).to.include('error')
			})


		})

		describe('Successful retrival of auth data with branded scopes', async () =>{

			let err, res, token

			before(async ()=> {

				token = chance.string({pool: 'abcdefghijkl1234567_'})
				stubs.validateBearerToken = stub(oauthSrvc, 'validateBearerToken')
					.resolves(storedTokenWithBrands)
				
				try {
					res = await server.inject({
						headers: {
							'authorization': `Bearer ${token}`,
						},
						method: 'POST',
						url: '/introspect?brand=bnppf',
						payload:{
							token,
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

			it('Should get auth data', () => {
				const payload = JSON.parse(res.payload)
				expect(payload).to.be.an.object()
				expect(payload).to.include('isAuthenticated')
				expect(payload).to.include('isAuthorized')
				expect(payload).to.include('credentials')
				expect(payload.credentials).to.include('token')
				expect(payload.credentials.token).to.be.equal(token)
				expect(payload).to.include('artifacts')
				expect(payload.artifacts).to.include('client')
				expect(payload.artifacts.client).to.be.equal(clientId)
				expect(payload).to.include('strategy')
				expect(payload).to.include('mode')
				expect(payload).to.include('error')
			})

			it('Should contain only 1 scope', () => {
				const payload = JSON.parse(res.payload)
				expect(payload.credentials.scope.length).to.be.equal(1)
			})

			it('Should have a single scope named `scopes1` when brand is bnppf', () => {
				const payload = JSON.parse(res.payload)
				expect(payload.credentials.scope[0]).to.be.equal('scopes1')
			})


		})

		describe('Unsuccessful retrieval without authorization header', async () =>{

			let err, res, token

			before(async ()=> {
        
				token = chance.string({pool: 'abcdefghijkl1234567_'})

				try {
					res = await server.inject({
						method: 'POST',
						url: '/introspect',
						payload:{
							token,
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

			it('Should not return auth data', () => {
				const payload = JSON.parse(res.payload)
				expect(payload).to.be.an.object()
				expect(payload).to.include('statusCode')
				expect(payload.statusCode).to.be.equal(401)
			})

		})

		describe('Unsuccessful retrieval with empty payload', async () =>{

			let err, res, token

			before(async ()=> {
        
				token = chance.string({pool: 'abcdefghijkl1234567_'})
				stubs.validateBearerToken = stub(oauthSrvc, 'validateBearerToken')
					.resolves(storedToken)

				try {
					res = await server.inject({
						headers: {
							'authorization': `Bearer ${token}`,
						},
						method: 'POST',
						url: '/introspect',
						payload:{},
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

			it('Should not return auth data', () => {
				const payload = JSON.parse(res.payload)
				expect(payload).to.be.an.object()
				expect(payload).to.include('statusCode')
				expect(payload.statusCode).to.be.equal(400)
			})


		})
	})
})

