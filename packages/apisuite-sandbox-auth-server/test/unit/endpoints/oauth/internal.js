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

describe('(UNIT) POST /internal', async () => {

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

	describe('internal flow', async () =>{

		describe('Successfully validate the client data', async () =>{

			let err, res, clientId, clientSecret, clientScope, userId

			before(async ()=> {

				clientId = chance.string({ pool: 'abcdefghijkl1234567_', length: 8 })
				clientSecret = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz1234567890_', length: 12 })
				clientScope = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz', length: 5 })
				userId = chance.integer({ min: 1 }).toString()
        
				stubs.internal = stub(oauthSrvc, 'internal')
					.resolves({
						isValid: true,
						credentials: {
							clientId: clientId,
							userId: userId,
							scope: clientScope,
						},
					})
				
				try {
					res = await server.inject({
						headers: {
							'x-client-id': clientId,
							'x-client-secret': clientSecret,
							'x-client-scope': clientScope,
							'x-user-id': userId,
						},
						method: 'POST',
						url: '/internal',
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

			it('Should get the validation result', () => {
				const payload = JSON.parse(res.payload)
				expect(payload).to.be.an.object()
				expect(payload).to.include('isValid')
				expect(payload.isValid).to.be.true()
			})


		})

		describe('Unsuccessful validation of the client data', async () =>{

			let err, res, clientId, clientSecret, clientScope, userId

			before(async ()=> {
        
				clientId = chance.string({ pool: 'abcdefghijkl1234567_', length: 8 })
				clientSecret = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz1234567890_', length: 12 })
				clientScope = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz', length: 5 })
				userId = chance.integer({ min: 1 }).toString()
        
				stubs.internal = stub(oauthSrvc, 'internal')
					.resolves({
						isValid: false,
						credentials: {
							clientId: clientId,
							userId: userId,
							scope: clientScope,
						},
					})

				try {
					res = await server.inject({
						headers: {
							'x-client-id': clientId,
							'x-client-secret': clientSecret,
							'x-client-scope': clientScope,
							'x-user-id': userId,
						},
						method: 'POST',
						url: '/internal',
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

			it('Should get the validation result', () => {
				const payload = JSON.parse(res.payload)
				expect(payload).to.be.an.object()
				expect(payload).to.include('isValid')
				expect(payload.isValid).to.be.false()
			})

		})

		describe('Unsuccessful request due to missing the `x-client-id` header', async () =>{

			let err, res, clientId, clientSecret, clientScope, userId

			before(async ()=> {
        
				clientId = chance.string({ pool: 'abcdefghijkl1234567_', length: 8 })
				clientSecret = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz1234567890_', length: 12 })
				clientScope = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz', length: 5 })
				userId = chance.integer({ min: 1 })
        
				stubs.internal = stub(oauthSrvc, 'internal')
					.resolves({
						isValid: true,
						credentials: {
							clientId: clientId,
							userId: userId,
							scope: clientScope,
						},
					})

				try {
					res = await server.inject({
						headers: {
							'x-client-secret': clientSecret,
							'x-client-scope': clientScope,
							'x-user-id': userId,
						},
						method: 'POST',
						url: '/internal',
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

			it('Should not return the validation result', () => {
				const payload = JSON.parse(res.payload)
				expect(payload).to.be.an.object()
				expect(payload).to.include('statusCode')
				expect(payload.statusCode).to.be.equal(400)
			})


		})
    
		describe('Unsuccessful request due to missing the `x-client-secret` header', async () =>{

			let err, res, clientId, clientScope, userId

			before(async ()=> {
        
				clientId = chance.string({ pool: 'abcdefghijkl1234567_', length: 8 })
				clientScope = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz', length: 5 })
				userId = chance.integer({ min: 1 })
        
				stubs.internal = stub(oauthSrvc, 'internal')
					.resolves({
						isValid: true,
						credentials: {
							clientId: clientId,
							userId: userId,
							scope: clientScope,
						},
					})

				try {
					res = await server.inject({
						headers: {
							'x-client-id': clientId,
							'x-client-scope': clientScope,
							'x-user-id': userId,
						},
						method: 'POST',
						url: '/internal',
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

			it('Should not return the validation result', () => {
				const payload = JSON.parse(res.payload)
				expect(payload).to.be.an.object()
				expect(payload).to.include('statusCode')
				expect(payload.statusCode).to.be.equal(400)
			})


		})
    
		describe('Unsuccessful request due to missing the `x-client-scope` header', async () =>{

			let err, res, clientId, clientSecret, clientScope, userId

			before(async ()=> {
        
				clientId = chance.string({ pool: 'abcdefghijkl1234567_', length: 8 })
				clientSecret = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz1234567890_', length: 12 })
				clientScope = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz', length: 5 })
				userId = chance.integer({ min: 1 })
        
				stubs.internal = stub(oauthSrvc, 'internal')
					.resolves({
						isValid: true,
						credentials: {
							clientId: clientId,
							userId: userId,
							scope: clientScope,
						},
					})

				try {
					res = await server.inject({
						headers: {
							'x-client-id': clientId,
							'x-client-secret': clientSecret,
							'x-user-id': userId,
						},
						method: 'POST',
						url: '/internal',
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

			it('Should not return the validation result', () => {
				const payload = JSON.parse(res.payload)
				expect(payload).to.be.an.object()
				expect(payload).to.include('statusCode')
				expect(payload.statusCode).to.be.equal(400)
			})


		})
    
		describe('Unsuccessful request due to missing the `x-user-id` header', async () =>{

			let err, res, clientId, clientSecret, clientScope, userId

			before(async ()=> {
        
				clientId = chance.string({ pool: 'abcdefghijkl1234567_', length: 8 })
				clientSecret = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz1234567890_', length: 12 })
				clientScope = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyz', length: 5 })
				userId = chance.integer({ min: 1 })
        
				stubs.internal = stub(oauthSrvc, 'internal')
					.resolves({
						isValid: true,
						credentials: {
							clientId: clientId,
							userId: userId,
							scope: clientScope,
						},
					})

				try {
					res = await server.inject({
						headers: {
							'x-client-id': clientId,
							'x-client-secret': clientSecret,
							'x-client-scope': clientScope,
						},
						method: 'POST',
						url: '/internal',
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

			it('Should not return the validation result', () => {
				const payload = JSON.parse(res.payload)
				expect(payload).to.be.an.object()
				expect(payload).to.include('statusCode')
				expect(payload.statusCode).to.be.equal(400)
			})


		})

	})
})

