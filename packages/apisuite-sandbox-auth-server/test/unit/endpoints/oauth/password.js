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
const appSrvc = require('../../../../src/services/app')
const session = require('../../../../src/utils/session')

const stubs = {}

describe('(UNIT) GET /login', async () => {

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

	describe('Successful request', async () =>{

		describe('Successful Login view retrieval', async () =>{

			let err, res, state

			before(async ()=> {
				state = chance.string({pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'})

				stubs.get = stub(session,'get').returns({
					req_state : state,
					app_container: 'test_container',
				})

				stubs.set = stub(session,'set').returns()
				stubs.validateScope = stub( oauthSrvc, 'validateScope')
					.resolves(true)

				try {
					res = await server.inject({
						method: 'GET',
						url: '/login',
					})
				} catch(error) {
					err = error
				}
			})

			it('Should not throw an error', () => {
				expect(err).to.be.undefined()
			})

			it('Should not be authenticated', () => {
				expect(res.request.auth.isAuthenticated).to.be.false()
			})

		})

		describe('Successful redirect after sucessful login', async () =>{

			let err, res
			let client_id, state
			before(async ()=> {

				const userId = chance.integer()
				const username = chance.string()
				const password = chance.string()
				client_id= chance.integer({length:5})
				state = chance.string({pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'})

				stubs.authenticate = stub(oauthSrvc,'authenticate')
					.resolves({
						authenticated : true,
						user: {
							userId: userId,
							username: username,
							password: password,
						},
					})
				
				state = chance.string({pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'})

				stubs.get = stub(session,'get').returns({
					req_state : state,
					app_container: {container: 'test_container'},
				})

				stubs.set = stub(session,'set').returns()

				stubs.findAppContainerByClientId = stub(appSrvc, 'findAppContainerByClientId')
					.resolves({id:1, name: 'demo_container'})
				
				stubs.validateScope = stub( oauthSrvc, 'validateScope')
					.resolves(true)

				try {
					
					res = await server.inject({
						method: 'POST',
						url: '/authenticate',
						payload: {
							username: username,
							password: password,
							next: `/authorize?response_type=code&client_id=${client_id}&redirect_uri=http://localhost:3000/cb&scope=some_scope&state=${state}`,
						},
					})

				} catch(error) {
					err = error
				}
			})

			it('Should not throw an error', () => {
				expect(err).to.be.undefined()
			})

			it('Should return status code 302', () => {
				expect(res.statusCode).to.be.equal(302)
			})

			it('Should redirect to /authorize endpoint', async () => {
				expect(res.headers.location).to.be.equal(`/authorize?response_type=code&client_id=${client_id}&redirect_uri=http://localhost:3000/cb&scope=some_scope&state=${state}`)
			})

		})

		describe('Successful authenticated request to an endpoint protected with session auth ', async () =>{

			let err, res, state

			before(async ()=> {
				
				state = chance.string({pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'})

				stubs.get = stub(session,'get').returns({
					req_state : state,
					app_container: {container: 'test_container'},
				})

				stubs.set = stub(session,'set').returns()
				
				stubs.validateScope = stub( oauthSrvc, 'validateScope')
					.resolves(true)

				stubs.getAppByClientId = stub(appSrvc, 'getAppByClientId')
					.resolves({name: 'demo app'})

				stubs.setStateParameter = stub(oauthSrvc, 'setStateParameter')
					.resolves()

				stubs.getStateParameter = stub(oauthSrvc, 'getStateParameter')
					.resolves(state)

				try {
					res = await server.inject({
						method: 'GET',
						url: `/authorize?response_type=code&client_id=${chance.integer()}&redirect_uri=http://localhost:3000/cb&scope=aisp&state=${state}`,
						credentials: {userId: chance.integer(), username: chance.string(), password: chance.string()},
					})

				} catch(error) {
					err = error
				}
			})

			it('Should not throw an error', () => {
				expect(err).to.be.undefined()
			})

			it('Should be Authenticated', () => {
				expect(res.request.auth.isAuthenticated).to.be.true()
			})
		})

	})

})

