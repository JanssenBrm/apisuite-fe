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
	require('../../../../src/plugins/organizationContainer'),
]

const oauthSrvc = require('../../../../src/services/oauth')
const orgContainerService = require('../../../../src/services/organizationContainer')

const stubs = {}

describe('(UNIT) GET /organization_containers', async () => {

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

	describe('get container by organization', async () =>{

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

		describe('Successfully get the container', async () =>{

			let err, res, token, org_id

			before(async ()=> {

				org_id = chance.integer({ min: 1 })
				token = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz123456789.', length: 48 })
				
				stubs.validateBearerToken = stub(oauthSrvc, 'validateBearerToken')
					.resolves(storedToken)
				stubs.getContainerByOrganization = stub(orgContainerService, 'getContainerByOrganization')
					.resolves({
						id: chance.integer({ min: 1 }),
						name: chance.string({ pool: 'aeiou1235', length: 8 }),
						organizationId: org_id,
					})
				
				try {
					res = await server.inject({
						headers: {
							'authorization': `Bearer ${token}`,
						},
						method: 'GET',
						url: `/organization_containers?org_id=${org_id}`,
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

			it('Should return the container', () => {
				const payload = JSON.parse(res.payload)
				expect(payload).to.be.an.object()
				expect(payload).to.include('id')
				expect(payload).to.include('name')
				expect(payload).to.include('organizationId')
				expect(payload.organizationId).to.be.equal(org_id)
			})


		})

		describe('Unsuccessfully get the container', async () =>{

			let err, res, token, org_id

			before(async ()=> {
        
				org_id = chance.integer({ min: 1 })
				token = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz123456789.', length: 48 })
				
				stubs.validateBearerToken = stub(oauthSrvc, 'validateBearerToken')
					.resolves(storedToken)
				stubs.getContainerByOrganization = stub(orgContainerService, 'getContainerByOrganization')
					.resolves(null)

				try {
					res = await server.inject({
						headers: {
							'authorization': `Bearer ${token}`,
						},
						method: 'GET',
						url: `/organization_containers?org_id=${org_id}`,
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

			it('Should return null', () => {
				// the return should be null but hapi is returning an empty string
				//expect(res.payload).to.be.null()
				expect(res.payload).to.be.empty()
			})

		})

		describe('Unsuccessfully get the container with missing org_id', async () =>{

			let err, res, token

			before(async ()=> {
        
				token = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz123456789.', length: 48 })
				
				stubs.validateBearerToken = stub(oauthSrvc, 'validateBearerToken')
					.resolves(storedToken)
				stubs.getContainerByOrganization = stub(orgContainerService, 'getContainerByOrganization')
					.throws()

				try {
					res = await server.inject({
						headers: {
							'authorization': `Bearer ${token}`,
						},
						method: 'GET',
						url: '/organization_containers',
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

			it('Should return a bad request', () => {
				const payload = JSON.parse(res.payload)
				expect(payload).to.be.an.object()
				expect(payload).to.include('statusCode')
				expect(payload.statusCode).to.be.equal(400)
			})

		})

		describe('Unsuccessfully get the container with wrong scope', async () =>{

			let err, res, token, org_id

			before(async ()=> {
        
				org_id = chance.integer({ min: 1 })
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
										{ scope: {name: rel } },
									]
								},
							}
						},
					})
				stubs.getContainerByOrganization = stub(orgContainerService, 'getContainerByOrganization')
					.throws()

				try {
					res = await server.inject({
						headers: {
							'authorization': `Bearer ${token}`,
						},
						method: 'GET',
						url: `/organization_containers?org_id=${org_id}`,
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

			it('Should return a forbidden', () => {
				const payload = JSON.parse(res.payload)
				expect(payload).to.be.an.object()
				expect(payload).to.include('statusCode')
				expect(payload.statusCode).to.be.equal(403)
			})

		})

		describe('Unsuccessfully get the container with error', async () =>{

			let err, res, token, org_id

			before(async ()=> {
        
				org_id = chance.integer({ min: 1 })
				token = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz123456789.', length: 48 })
				
				stubs.validateBearerToken = stub(oauthSrvc, 'validateBearerToken')
					.resolves(storedToken)
				stubs.getContainerByOrganization = stub(orgContainerService, 'getContainerByOrganization')
					.throws()

				try {
					res = await server.inject({
						headers: {
							'authorization': `Bearer ${token}`,
						},
						method: 'GET',
						url: `/organization_containers?org_id=${org_id}`,
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

			it('Should return an internal error', () => {
				const payload = JSON.parse(res.payload)
				expect(payload).to.be.an.object()
				expect(payload).to.include('statusCode')
				expect(payload.statusCode).to.be.equal(500)
			})

		})


	})
})

