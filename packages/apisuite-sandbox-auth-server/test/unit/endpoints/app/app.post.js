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
const orgContainerService = require('../../../../src/services/organizationContainer')

const stubs = {}

describe('(UNIT) POST /apps', async () => {

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

	describe('create a new organization app', async () =>{

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

		describe('Successfully create app', async () =>{

			let err, res, token, name, description, publicURL, ownerId, organizationId, iconURL, redirectURLs, scopes

			before(async ()=> {

				token = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz123456789.', length: 48 })
				name = chance.company()
				description = chance.paragraph()
				publicURL = chance.url()
				ownerId = chance.integer({ min: 1 })
				organizationId = chance.integer({ min: 1 })
				iconURL = chance.url({ extensions: ['ico'] })
				redirectURLs = [...Array(chance.integer({ min: 1, max: 5 }))].map(() => chance.url())
				scopes = [{scope: chance.string({ length: 8 }), brand: chance.string({ length: 8 })}]

				stubs.validateBearerToken = stub(oauthSrvc, 'validateBearerToken')
					.resolves(storedToken)
				stubs.getContainerByOrganization = stub(orgContainerService, 'getContainerByOrganization')
					.resolves({
						get: () => {
							return chance.integer({ min: 1 })
						},
					})
				stubs.create = stub(appService, 'create')
					.resolves({
						toJSON: () => {
							return {
								id: chance.integer({ min: 1 }),
								name,
								description,
								publicURL,
								clientId: chance.string({ pool: 'abcdef123456789_', length: 12 }),
								ownerId,
								organizationId,
								iconURL,
								clientSecret: chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz123456790.', length: 12 }),
								redirectURLs,
								grants: ['authorization_code', 'client_credentials'],
								createdAt: Date(),
								updatedAt: Date(),
								scopes,
							}
						},
					})

				try {
					res = await server.inject({
						headers: {
							'authorization': `Bearer ${token}`,
						},
						method: 'POST',
						url: '/apps',
						payload: {
							name,
							description,
							publicURL,
							ownerId,
							organizationId,
							iconURL,
							redirectURLs,
							products: scopes,
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

			it('Should return create the app', () => {
				const payload = JSON.parse(res.payload)
				expect(payload).to.be.an.object()
				expect(payload).to.include('name')
				expect(payload).to.include('description')
				expect(payload).to.include('publicURL')
				expect(payload).to.include('clientId')
				expect(payload).to.include('ownerId')
				expect(payload).to.include('organizationId')
				expect(payload).to.include('iconURL')
				expect(payload).to.include('clientSecret')
				expect(payload).to.include('redirectURLs')
				expect(payload).to.include('grants')
				expect(payload).to.include('createdAt')
				expect(payload).to.include('updatedAt')
				expect(payload).to.include('scopes')
				expect(payload.grants).to.be.an.array()
				expect(payload.redirectURLs).to.be.an.array()
				expect(payload.name).to.be.equal(name)
				expect(payload.description).to.be.equal(description)
				expect(payload.publicURL).to.be.equal(publicURL)
				expect(payload.ownerId).to.be.equal(ownerId)
				expect(payload.organizationId).to.be.equal(organizationId)
				expect(payload.iconURL).to.be.equal(iconURL)
				expect(payload.redirectURLs).to.be.equal(redirectURLs)
				expect(payload.scopes).to.be.equal(scopes)
			})


		})

		describe('Unsuccessfully create app', async () =>{

			let err, res, token, name, description, publicURL, ownerId, organizationId, iconURL, redirectURLs

			before(async ()=> {

				token = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz123456789.', length: 48 })
				name = chance.company()
				description = chance.paragraph()
				publicURL = chance.url()
				ownerId = chance.integer({ min: 1 })
				organizationId = chance.integer({ min: 1 })
				iconURL = chance.url({ extensions: ['ico'] })
				redirectURLs = [...Array(chance.integer({ min: 1, max: 5 }))].map(() => chance.url())

				stubs.validateBearerToken = stub(oauthSrvc, 'validateBearerToken')
					.resolves(storedToken)
				stubs.getContainerByOrganization = stub(orgContainerService, 'getContainerByOrganization')
					.resolves({
						get: () => {
							return chance.integer({ min: 1 })
						},
					})
				stubs.create = stub(appService, 'create')
					.throws()

				try {
					res = await server.inject({
						headers: {
							'authorization': `Bearer ${token}`,
						},
						method: 'POST',
						url: '/apps',
						payload: {
							name,
							description,
							publicURL,
							ownerId,
							organizationId,
							iconURL,
							redirectURLs,
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

		describe('Unsuccessfully create app without container', async () =>{

			let err, res, token, name, description, publicURL, ownerId, organizationId, iconURL, redirectURLs

			before(async ()=> {

				token = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz123456789.', length: 48 })
				name = chance.company()
				description = chance.paragraph()
				publicURL = chance.url()
				ownerId = chance.integer({ min: 1 })
				organizationId = chance.integer({ min: 1 })
				iconURL = chance.url({ extensions: ['ico'] })
				redirectURLs = [...Array(chance.integer({ min: 1, max: 5 }))].map(() => chance.url())

				stubs.validateBearerToken = stub(oauthSrvc, 'validateBearerToken')
					.resolves(storedToken)
				stubs.getContainerByOrganization = stub(orgContainerService, 'getContainerByOrganization')
					.throws()
				stubs.create = stub(appService, 'create')
					.resolves({
						toJSON: () => {
							return {
								id: chance.integer({ min: 1 }),
								name,
								description,
								publicURL,
								clientId: chance.string({ pool: 'abcdef123456789_', length: 12 }),
								ownerId,
								organizationId,
								iconURL,
								clientSecret: chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz123456790.', length: 12 }),
								redirectURLs,
								grants: ['authorization_code', 'client_credentials'],
								createdAt: Date(),
								updatedAt: Date(),
							}
						},
					})

				try {
					res = await server.inject({
						headers: {
							'authorization': `Bearer ${token}`,
						},
						method: 'POST',
						url: '/apps',
						payload: {
							name,
							description,
							publicURL,
							ownerId,
							organizationId,
							iconURL,
							redirectURLs,
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

		describe('Unsuccessfully create app without name', async () =>{

			let err, res, token, name, description, publicURL, ownerId, organizationId, iconURL, redirectURLs

			before(async ()=> {

				token = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz123456789.', length: 48 })
				name = chance.company()
				description = chance.paragraph()
				publicURL = chance.url()
				ownerId = chance.integer({ min: 1 })
				organizationId = chance.integer({ min: 1 })
				iconURL = chance.url({ extensions: ['ico'] })
				redirectURLs = [...Array(chance.integer({ min: 1, max: 5 }))].map(() => chance.url())

				stubs.validateBearerToken = stub(oauthSrvc, 'validateBearerToken')
					.resolves(storedToken)
				stubs.getContainerByOrganization = stub(orgContainerService, 'getContainerByOrganization')
					.resolves({
						get: () => {
							return chance.integer({ min: 1 })
						},
					})
				stubs.create = stub(appService, 'create')
					.resolves({
						toJSON: () => {
							return {
								id: chance.integer({ min: 1 }),
								name,
								description,
								publicURL,
								clientId: chance.string({ pool: 'abcdef123456789_', length: 12 }),
								ownerId,
								organizationId,
								iconURL,
								clientSecret: chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz123456790.', length: 12 }),
								redirectURLs,
								grants: ['authorization_code', 'client_credentials'],
								createdAt: Date(),
								updatedAt: Date(),
							}
						},
					})

				try {
					res = await server.inject({
						headers: {
							'authorization': `Bearer ${token}`,
						},
						method: 'POST',
						url: '/apps',
						payload: {
							// name,
							description,
							publicURL,
							ownerId,
							organizationId,
							iconURL,
							redirectURLs,
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

		describe('Unsuccessfully create app without ownerId', async () =>{

			let err, res, token, name, description, publicURL, ownerId, organizationId, iconURL, redirectURLs

			before(async ()=> {

				token = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz123456789.', length: 48 })
				name = chance.company()
				description = chance.paragraph()
				publicURL = chance.url()
				ownerId = chance.integer({ min: 1 })
				organizationId = chance.integer({ min: 1 })
				iconURL = chance.url({ extensions: ['ico'] })
				redirectURLs = [...Array(chance.integer({ min: 1, max: 5 }))].map(() => chance.url())

				stubs.validateBearerToken = stub(oauthSrvc, 'validateBearerToken')
					.resolves(storedToken)
				stubs.getContainerByOrganization = stub(orgContainerService, 'getContainerByOrganization')
					.resolves({
						get: () => {
							return chance.integer({ min: 1 })
						},
					})
				stubs.create = stub(appService, 'create')
					.resolves({
						toJSON: () => {
							return {
								id: chance.integer({ min: 1 }),
								name,
								description,
								publicURL,
								clientId: chance.string({ pool: 'abcdef123456789_', length: 12 }),
								ownerId,
								organizationId,
								iconURL,
								clientSecret: chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz123456790.', length: 12 }),
								redirectURLs,
								grants: ['authorization_code', 'client_credentials'],
								createdAt: Date(),
								updatedAt: Date(),
							}
						},
					})

				try {
					res = await server.inject({
						headers: {
							'authorization': `Bearer ${token}`,
						},
						method: 'POST',
						url: '/apps',
						payload: {
							name,
							description,
							publicURL,
							// ownerId,
							organizationId,
							iconURL,
							redirectURLs,
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

		describe('Unsuccessfully create app without organizationId', async () =>{

			let err, res, token, name, description, publicURL, ownerId, organizationId, iconURL, redirectURLs

			before(async ()=> {

				token = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz123456789.', length: 48 })
				name = chance.company()
				description = chance.paragraph()
				publicURL = chance.url()
				ownerId = chance.integer({ min: 1 })
				organizationId = chance.integer({ min: 1 })
				iconURL = chance.url({ extensions: ['ico'] })
				redirectURLs = [...Array(chance.integer({ min: 1, max: 5 }))].map(() => chance.url())

				stubs.validateBearerToken = stub(oauthSrvc, 'validateBearerToken')
					.resolves(storedToken)
				stubs.getContainerByOrganization = stub(orgContainerService, 'getContainerByOrganization')
					.resolves({
						get: () => {
							return chance.integer({ min: 1 })
						},
					})
				stubs.create = stub(appService, 'create')
					.resolves({
						toJSON: () => {
							return {
								id: chance.integer({ min: 1 }),
								name,
								description,
								publicURL,
								clientId: chance.string({ pool: 'abcdef123456789_', length: 12 }),
								ownerId,
								organizationId,
								iconURL,
								clientSecret: chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz123456790.', length: 12 }),
								redirectURLs,
								grants: ['authorization_code', 'client_credentials'],
								createdAt: Date(),
								updatedAt: Date(),
							}
						},
					})

				try {
					res = await server.inject({
						headers: {
							'authorization': `Bearer ${token}`,
						},
						method: 'POST',
						url: '/apps',
						payload: {
							name,
							description,
							publicURL,
							ownerId,
							// organizationId,
							iconURL,
							redirectURLs,
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

		describe('Unsuccessfully create app without unique urls', async () =>{

			let err, res, token, name, description, publicURL, ownerId, organizationId, iconURL, redirectURLs

			before(async ()=> {

				token = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz123456789.', length: 48 })
				name = chance.company()
				description = chance.paragraph()
				publicURL = chance.url()
				ownerId = chance.integer({ min: 1 })
				organizationId = chance.integer({ min: 1 })
				iconURL = chance.url({ extensions: ['ico'] })
				const sameURL = chance.url()
				redirectURLs = [...Array(chance.integer({ min: 2, max: 5 }))].map(() => sameURL)

				stubs.validateBearerToken = stub(oauthSrvc, 'validateBearerToken')
					.resolves(storedToken)
				stubs.getContainerByOrganization = stub(orgContainerService, 'getContainerByOrganization')
					.resolves({
						get: () => {
							return chance.integer({ min: 1 })
						},
					})
				stubs.create = stub(appService, 'create')
					.resolves({
						toJSON: () => {
							return {
								id: chance.integer({ min: 1 }),
								name,
								description,
								publicURL,
								clientId: chance.string({ pool: 'abcdef123456789_', length: 12 }),
								ownerId,
								organizationId,
								iconURL,
								clientSecret: chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz123456790.', length: 12 }),
								redirectURLs,
								grants: ['authorization_code', 'client_credentials'],
								createdAt: Date(),
								updatedAt: Date(),
							}
						},
					})

				try {
					res = await server.inject({
						headers: {
							'authorization': `Bearer ${token}`,
						},
						method: 'POST',
						url: '/apps',
						payload: {
							name,
							description,
							publicURL,
							ownerId,
							organizationId,
							iconURL,
							redirectURLs,
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

		describe('Unsuccessfully create app without correct scope', async () =>{

			let err, res, token, name, description, publicURL, ownerId, organizationId, iconURL, redirectURLs

			before(async ()=> {

				token = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz123456789.', length: 48 })
				name = chance.company()
				description = chance.paragraph()
				publicURL = chance.url()
				ownerId = chance.integer({ min: 1 })
				organizationId = chance.integer({ min: 1 })
				iconURL = chance.url({ extensions: ['ico'] })
				const sameURL = chance.url()
				redirectURLs = [...Array(chance.integer({ min: 1, max: 5 }))].map(() => sameURL)

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
				stubs.getContainerByOrganization = stub(orgContainerService, 'getContainerByOrganization')
					.resolves({
						get: () => {
							return chance.integer({ min: 1 })
						},
					})
				stubs.create = stub(appService, 'create')
					.resolves({
						toJSON: () => {
							return {
								id: chance.integer({ min: 1 }),
								name,
								description,
								publicURL,
								clientId: chance.string({ pool: 'abcdef123456789_', length: 12 }),
								ownerId,
								organizationId,
								iconURL,
								clientSecret: chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz123456790.', length: 12 }),
								redirectURLs,
								grants: ['authorization_code', 'client_credentials'],
								createdAt: Date(),
								updatedAt: Date(),
							}
						},
					})

				try {
					res = await server.inject({
						headers: {
							'authorization': `Bearer ${token}`,
						},
						method: 'POST',
						url: '/apps',
						payload: {
							name,
							description,
							publicURL,
							ownerId,
							organizationId,
							iconURL,
							redirectURLs,
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

	})
})

