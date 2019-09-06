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
	require('../../../../src/plugins/app'),
	require('../../../../src/plugins/organizationContainer'),
]

const oauthSrvc = require('../../../../src/services/oauth')
const appService = require('../../../../src/services/app')

const stubs = {}

describe('(UNIT) GET /apps', async () => {

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

	describe('list the app by organization id', async () =>{

		const clientId = chance.string({ pool: 'abcdefghijkl1234567_', length: 12 })
		const userId = chance.integer({ min: 1 })
		const storedToken = {
			toJSON: () => {
				return {
					id: userId,
					clientId,
				}
			},
			related: (rel) => {
				return {
					toJSON: () => {
						return [
							{ scope: {name: 'internal'}, brand: 'bnppf', appId: 1, scopeId: 1},
							{ scope: {name: rel}, brand: 'bnppf', appId: 1, scopeId: 2 },
						]
					},
				}
			},
		}

		describe('Successfully get the list of apps', async () =>{

			let err, res, token, org_id, offset, limit

			before(async ()=> {

				org_id = chance.integer({ min: 1 })
				offset = chance.integer({ min: 1 })
				limit = chance.integer({ min: 1 })
				token = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz123456789.', length: 48 })
				
				stubs.validateBearerToken = stub(oauthSrvc, 'validateBearerToken')
					.resolves(storedToken)
				stubs.listApps = stub(appService, 'listApps')
					.resolves({
						app: [],
						pagination: {},
					})
				
				try {
					res = await server.inject({
						headers: {
							'authorization': `Bearer ${token}`,
						},
						method: 'GET',
						url: `/apps?org_id=${org_id}&offset=${offset}&limit=${limit}`,
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

			it('Should return the apps list', () => {
				const payload = JSON.parse(res.payload)
				expect(payload).to.be.an.object()
				expect(payload).to.include('app')
				expect(payload.app).to.be.an.array()
				expect(payload).to.include('pagination')
			})


		})

		describe('Unsuccessfully get the list of apps', async () =>{

			let err, res, token, org_id, offset, limit

			before(async ()=> {

				org_id = chance.integer({ min: 1 })
				offset = chance.integer({ min: 1 })
				limit = chance.integer({ min: 1 })
				token = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz123456789.', length: 48 })
				
				stubs.validateBearerToken = stub(oauthSrvc, 'validateBearerToken')
					.resolves(storedToken)
				stubs.listApps = stub(appService, 'listApps')
					.throws()
				
				try {
					res = await server.inject({
						headers: {
							'authorization': `Bearer ${token}`,
						},
						method: 'GET',
						url: `/apps?org_id=${org_id}&offset=${offset}&limit=${limit}`,
					})
				} catch(error) {
					err = error
				}
			})

			it('Should not throw an error', () => {
				expect(err).to.be.undefined()
			})

			it('Should return status code 500', () => {
				expect(res.statusCode).to.be.equal(500)
			})

			it('Should return the apps list', () => {
				const payload = JSON.parse(res.payload)
				expect(payload).to.be.an.object()
				expect(payload).to.include('statusCode')
				expect(payload.statusCode).to.be.equal(500)
			})


		})

		describe('Unsuccessfully get the list of apps without org_id', async () =>{

			let err, res, token, offset, limit

			before(async ()=> {

				offset = chance.integer({ min: 1 })
				limit = chance.integer({ min: 1 })
				token = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz123456789.', length: 48 })
				
				stubs.validateBearerToken = stub(oauthSrvc, 'validateBearerToken')
					.resolves(storedToken)
				stubs.listApps = stub(appService, 'listApps')
					.throws()
				
				try {
					res = await server.inject({
						headers: {
							'authorization': `Bearer ${token}`,
						},
						method: 'GET',
						url: `/apps?org_id=&offset=${offset}&limit=${limit}`,
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

			it('Should return the apps list', () => {
				const payload = JSON.parse(res.payload)
				expect(payload).to.be.an.object()
				expect(payload).to.include('statusCode')
				expect(payload.statusCode).to.be.equal(400)
			})


		})
    
		describe('Unsuccessfully get the list of apps, wrong scope', async () =>{

			let err, res, token, org_id, offset, limit

			before(async ()=> {

				org_id = chance.integer({ min: 1 })
				offset = chance.integer({ min: 1 })
				limit = chance.integer({ min: 1 })
				token = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz123456789.', length: 48 })
				
				stubs.validateBearerToken = stub(oauthSrvc, 'validateBearerToken')
					.resolves({
						toJSON: () => {
							return {
								id: userId,
								clientId,
							}
						},
						related: (rel) => {
							return {
								toJSON: () => {
									return [
										{ scope: {name: rel}, brand: 'bnppf', appId: 1, scopeId: 2 },
									]
								},
							}
						},
					})
				stubs.listApps = stub(appService, 'listApps')
					.resolves({
						app: [],
						pagination: {},
					})
				
				try {
					res = await server.inject({
						headers: {
							'authorization': `Bearer ${token}`,
						},
						method: 'GET',
						url: `/apps?org_id=${org_id}&offset=${offset}&limit=${limit}`,
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

			it('Should return forbidden', () => {
				const payload = JSON.parse(res.payload)
				expect(payload).to.be.an.object()
				expect(payload).to.include('statusCode')
				expect(payload.statusCode).to.be.equal(403)
			})


		})


	})
})

