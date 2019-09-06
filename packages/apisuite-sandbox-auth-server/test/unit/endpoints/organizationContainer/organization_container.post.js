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

describe('(UNIT) POST /organization_containers', async () => {

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

	describe('create organization container', async () =>{

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

		describe('Successfully create the container', async () =>{

			let err, res, token, organizationId, name

			before(async ()=> {

				name = chance.string({ pool: 'abcdef123456789-', length: 32 })
				organizationId = chance.integer({ min: 1 })
				token = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz123456789.', length: 48 })
				
				stubs.validateBearerToken = stub(oauthSrvc, 'validateBearerToken')
					.resolves(storedToken)
				stubs.create = stub(orgContainerService, 'create')
					.resolves({
						toJSON: () => {
							return {
								id: chance.integer({ min: 1 }),
								name,
								organizationId,
							}
						},
					})
				
				try {
					res = await server.inject({
						headers: {
							'authorization': `Bearer ${token}`,
						},
						method: 'POST',
						url: '/organization_containers',
						payload: {
							name,
							organizationId,
						},
					})
				} catch(error) {
					err = error
				}
			})

			it('Should not throw an error', () => {
				expect(err).to.be.undefined()
			})

			it('Should return status code 201', () => {
				expect(res.statusCode).to.be.equal(201)
			})

			it('Should return the container', () => {
				const payload = JSON.parse(res.payload)
				expect(payload).to.be.an.object()
				expect(payload).to.include('id')
				expect(payload).to.include('name')
				expect(payload.name).to.be.equal(name)
				expect(payload).to.include('organizationId')
				expect(payload.organizationId).to.be.equal(organizationId)
			})


		})

		describe('Unsuccessfully create the container (duplicated)', async () =>{

			let err, res, token, organizationId, name

			before(async ()=> {
        
				name = chance.string({ pool: 'abcdef123456789-', length: 32 })
				organizationId = chance.integer({ min: 1 })
				token = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz123456789.', length: 48 })
				
				stubs.validateBearerToken = stub(oauthSrvc, 'validateBearerToken')
					.resolves(storedToken)
				stubs.create = stub(orgContainerService, 'create')
					.throws({
						code: 'ER_DUP_ENTRY',
					})

				try {
					res = await server.inject({
						headers: {
							'authorization': `Bearer ${token}`,
						},
						method: 'POST',
						url: '/organization_containers',
						payload: {
							name,
							organizationId,
						},
					})
				} catch(error) {
					err = error
				}
			})

			it('Should not throw an error', () => {
				expect(err).to.be.undefined()
			})

			it('Should return status code 409', () => {
				expect(res.statusCode).to.be.equal(409)
			})

			it('Should return conflict', () => {
				const payload = JSON.parse(res.payload)
				expect(payload).to.be.an.object()
				expect(payload).to.include('statusCode')
				expect(payload.statusCode).to.be.equal(409)
			})

		})
    
		describe('Unsuccessfully create the container', async () =>{

			let err, res, token, organizationId, name

			before(async ()=> {
        
				name = chance.string({ pool: 'abcdef123456789-', length: 32 })
				organizationId = chance.integer({ min: 1 })
				token = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz123456789.', length: 48 })
				
				stubs.validateBearerToken = stub(oauthSrvc, 'validateBearerToken')
					.resolves(storedToken)
				stubs.create = stub(orgContainerService, 'create')
					.throws({
						code: '',
					})

				try {
					res = await server.inject({
						headers: {
							'authorization': `Bearer ${token}`,
						},
						method: 'POST',
						url: '/organization_containers',
						payload: {
							name,
							organizationId,
						},
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

			it('Should return interal server error', () => {
				const payload = JSON.parse(res.payload)
				expect(payload).to.be.an.object()
				expect(payload).to.include('statusCode')
				expect(payload.statusCode).to.be.equal(500)
			})

		})

		describe('Unsuccessfully create the container missing name', async () =>{

			let err, res, token, organizationId

			before(async ()=> {
        
				organizationId = chance.integer({ min: 1 })
				token = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz123456789.', length: 48 })
				
				stubs.validateBearerToken = stub(oauthSrvc, 'validateBearerToken')
					.resolves(storedToken)
				stubs.create = stub(orgContainerService, 'create')
					.throws({
						code: '',
					})

				try {
					res = await server.inject({
						headers: {
							'authorization': `Bearer ${token}`,
						},
						method: 'POST',
						url: '/organization_containers',
						payload: {
							organizationId,
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

			it('Should return bad request', () => {
				const payload = JSON.parse(res.payload)
				expect(payload).to.be.an.object()
				expect(payload).to.include('statusCode')
				expect(payload.statusCode).to.be.equal(400)
			})

		})

		describe('Unsuccessfully create the container missing organizationId', async () =>{

			let err, res, token, name

			before(async ()=> {
        
				name = chance.string({ pool: 'abcdef123456789-', length: 32 })
				token = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz123456789.', length: 48 })
				
				stubs.validateBearerToken = stub(oauthSrvc, 'validateBearerToken')
					.resolves(storedToken)
				stubs.create = stub(orgContainerService, 'create')
					.throws({
						code: '',
					})

				try {
					res = await server.inject({
						headers: {
							'authorization': `Bearer ${token}`,
						},
						method: 'POST',
						url: '/organization_containers',
						payload: {
							name,
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

			it('Should return bad request', () => {
				const payload = JSON.parse(res.payload)
				expect(payload).to.be.an.object()
				expect(payload).to.include('statusCode')
				expect(payload.statusCode).to.be.equal(400)
			})

		})
    
		describe('Unsuccessfully create the container missing valid scope', async () =>{

			let err, res, token, name

			before(async ()=> {
        
				name = chance.string({ pool: 'abcdef123456789-', length: 32 })
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
										{ scope: {name: rel }},
									]
								},
							}
						},
					})
				stubs.create = stub(orgContainerService, 'create')
					.throws({
						code: '',
					})

				try {
					res = await server.inject({
						headers: {
							'authorization': `Bearer ${token}`,
						},
						method: 'POST',
						url: '/organization_containers',
						payload: {
							name,
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

			it('Should return forbidden', () => {
				const payload = JSON.parse(res.payload)
				expect(payload).to.be.an.object()
				expect(payload).to.include('statusCode')
				expect(payload.statusCode).to.be.equal(403)
			})

		})
    
		describe('Unsuccessfully create the container missing scope', async () =>{

			let err, res, token, name

			before(async ()=> {
        
				name = chance.string({ pool: 'abcdef123456789-', length: 32 })
				token = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz123456789.', length: 48 })
				
				stubs.validateBearerToken = stub(oauthSrvc, 'validateBearerToken')
					.resolves({
						toJSON: () => {
							return {
								id: userId,
								clientId,
							}
						},
						related: () => {
							return {
								toJSON: () => {
									return
								},
							}
						},
					})
				stubs.create = stub(orgContainerService, 'create')
					.throws({
						code: '',
					})

				try {
					res = await server.inject({
						headers: {
							'authorization': `Bearer ${token}`,
						},
						method: 'POST',
						url: '/organization_containers',
						payload: {
							name,
						},
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

			it('Should return interal server error', () => {
				const payload = JSON.parse(res.payload)
				expect(payload).to.be.an.object()
				expect(payload).to.include('statusCode')
				expect(payload.statusCode).to.be.equal(500)
			})

		})


	})
})

