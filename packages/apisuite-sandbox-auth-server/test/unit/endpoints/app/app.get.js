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

describe('(UNIT) GET /apps/{id}', async () => {

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

	describe('get an organization app', async () =>{

		const clientId = chance.string({ pool: 'abcdefghijkl1234567_', length: 12 })
		const userId = chance.integer({ min: 1 })
		const appId = chance.integer({ min: 1 })
		const ownerId = chance.integer({ min: 1 })
		const organizationId = chance.integer({ min: 1 })

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

		describe('Successfully get app', async () =>{

			let err, res, token, name, description, publicURL, iconURL, redirectURLs, scopes

			before(async ()=> {

				token = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz123456789.', length: 48 })
				name = chance.company()
				description = chance.paragraph()
				publicURL = chance.url()
				iconURL = chance.url({ extensions: ['ico'] })
				redirectURLs = [...Array(chance.integer({ min: 1, max: 5 }))].map(() => chance.url())
				scopes = [{scope: chance.string({ length: 8 }), brand: chance.string({ length: 8 })}]

				stubs.validateBearerToken = stub(oauthSrvc, 'validateBearerToken')
					.resolves(storedToken)
				stubs.getApp = stub(appService, 'getApp')
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
						method: 'GET',
						url: `/apps/${appId}`,
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

			it('Should return update the app', () => {
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

		describe('Unsuccessfully get app', async () =>{

			let err, res, token

			before(async ()=> {

				token = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz123456789.', length: 48 })

				stubs.validateBearerToken = stub(oauthSrvc, 'validateBearerToken')
					.resolves(storedToken)
				stubs.getApp = stub(appService, 'getApp')
					.throws()

				try {
					res = await server.inject({
						headers: {
							'authorization': `Bearer ${token}`,
						},
						method: 'GET',
						url: `/apps/${appId}`,
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

			it('Should return internal server error', () => {
				const payload = JSON.parse(res.payload)
				expect(payload).to.be.an.object()
				expect(payload).to.include('statusCode')
				expect(payload.statusCode).to.be.equal(500)
			})


		})

		describe('Unsuccessfully get app without app id', async () =>{

			let err, res, token, name, description, publicURL, iconURL, redirectURLs

			before(async ()=> {

				token = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz123456789.', length: 48 })
				name = chance.company()
				description = chance.paragraph()
				publicURL = chance.url()
				iconURL = chance.url({ extensions: ['ico'] })
				redirectURLs = [...Array(chance.integer({ min: 1, max: 5 }))].map(() => chance.url())

				stubs.validateBearerToken = stub(oauthSrvc, 'validateBearerToken')
					.resolves(storedToken)
				stubs.getApp = stub(appService, 'getApp')
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
						method: 'GET',
						url: '/apps/',
					})
				} catch(error) {
					err = error
				}
			})

			it('Should not throw an error', () => {
				expect(err).to.be.undefined()
			})

			it('Should return status code 404', () => {
				expect(res.statusCode).to.be.equal(404)
			})

			it('Should return not found', () => {
				const payload = JSON.parse(res.payload)
				expect(payload).to.be.an.object()
				expect(payload).to.include('statusCode')
				expect(payload.statusCode).to.be.equal(404)
			})


		})

		describe('Unsuccessfully get app with wrong app id format', async () =>{

			let err, res, token, name, description, publicURL, iconURL, redirectURLs

			before(async ()=> {

				token = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz123456789.', length: 48 })
				name = chance.company()
				description = chance.paragraph()
				publicURL = chance.url()
				iconURL = chance.url({ extensions: ['ico'] })
				redirectURLs = [...Array(chance.integer({ min: 1, max: 5 }))].map(() => chance.url())

				stubs.validateBearerToken = stub(oauthSrvc, 'validateBearerToken')
					.resolves(storedToken)
				stubs.getApp = stub(appService, 'getApp')
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
						method: 'GET',
						url: '/apps/appId',
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

		describe('Unsuccessfully get app with negative app id', async () =>{

			let err, res, token, name, description, publicURL, iconURL, redirectURLs

			before(async ()=> {

				token = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz123456789.', length: 48 })
				name = chance.company()
				description = chance.paragraph()
				publicURL = chance.url()
				iconURL = chance.url({ extensions: ['ico'] })
				redirectURLs = [...Array(chance.integer({ min: 1, max: 5 }))].map(() => chance.url())

				stubs.validateBearerToken = stub(oauthSrvc, 'validateBearerToken')
					.resolves(storedToken)
				stubs.getApp = stub(appService, 'getApp')
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
						method: 'GET',
						url: `/apps/-${appId}`,
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

		describe('Unsuccessfully get app without correct scope', async () =>{

			let err, res, token, name, description, publicURL, iconURL, redirectURLs

			before(async ()=> {

				token = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz123456789.', length: 48 })
				name = chance.company()
				description = chance.paragraph()
				publicURL = chance.url()
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
				stubs.getApp = stub(appService, 'getApp')
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
						method: 'GET',
						url: `/apps/${appId}`,
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

