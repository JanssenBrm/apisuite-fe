const { afterEach, before, after, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')

const config = require('../../../../config')
const Hapi = require('hapi')

const server = new Hapi.Server(config.get('server'))

const plugins = [
	require('hapi-auth-cookie'),
	require('hapi-auth-bearer-token'),
	require('vision'),
	require('../../../../src/plugins/internal/x-request-id'),
	require('../../../../src/plugins/internal/session'),
	require('../../../../src/plugins/internal/internationalization'),
	require('../../../../src/plugins/internal/cache'),
	require('../../../../src/plugins/internal/authStrategies'),
	require('../../../../src/plugins/oauth'),
]

const oauthSrvc = require('../../../../src/services/oauth')
const appSrvc = require('../../../../src/services/app')
const session = require('../../../../src/utils/session')

const stubs = {}

describe('(UNIT) POST /authenticate', async () => {

	before(async () => {
		await server.register(plugins)
		await server.start()
	})

	after(async () => {
		await server.stop()
	})

	afterEach(async () => {
		Object.keys(stubs).map((stb) => stubs[stb].restore())
	})

	describe('authenticate flow', async () => {

		describe('Successful authentication request', async () => {

			let err, res

			before(async () => {

				stubs.get = stub(session, 'get').returns()
				stubs.set = stub(session, 'set').returns()

				stubs.findAppContainerByClientId = stub(appSrvc, 'findAppContainerByClientId')
					.resolves({
						name: 'docker_container',
					})

				stubs.getAppScopes = stub(appSrvc, 'getAppScopes')
					.resolves([
						{ scope: {name: 'aisp'}, brand: 'bnppf', appId: 1, scopeId: 2},
						{ scope: {name: 'aisp'}, brand: 'fintro', appId: 1, scopeId: 2 },
						{ scope: {name: 'pisp'}, brand: 'fintro', appId: 1, scopeId: 4},
					])
				stubs.authenticate = stub(oauthSrvc, 'authenticate')
					.resolves({
						authenticated: true,
						user: {},
					})

				try {
					res = await server.inject({
						method: 'POST',
						url: '/authenticate',
						payload: {
							username: 'test_user',
							password: 'test_pwd',
							next: 'http://example.org/cb&client_id=12345',
						},
					})
				} catch (error) {
					err = error
				}
			})

			it('Should not throw an error', () => {
				expect(err).to.be.undefined()
			})

			it('Should return status code 302', () => {
				expect(res.statusCode).to.be.equal(302)
			})

		})

		describe('Unsucessful authentication', async () => {

			let err, res

			before(async () => {

				stubs.get = stub(session, 'get').returns()
				stubs.set = stub(session, 'set').returns()
				stubs.findAppContainerByClientId = stub(appSrvc, 'findAppContainerByClientId')
					.resolves({
						name: 'docker_container',
					})

				stubs.authenticate = stub(oauthSrvc, 'authenticate')
					.resolves({
						authenticated: false,
						user: {},
					})

				try {
					res = await server.inject({
						method: 'POST',
						url: '/authenticate',
						payload: {
							username: 'test_user',
							password: 'test_pwd',
							next: 'http://example.org/cb&client_id=12345',
						},
					})
				} catch (error) {
					err = error
				}
			})

			it('Should not throw an error', () => {
				expect(err).to.be.undefined()
			})

			it('Should return status code 302', () => {
				expect(res.statusCode).to.be.equal(302)
			})

		})

		describe('Unsucessful authentication when client_id is missing', async () => {

			let err, res

			before(async () => {

				stubs.get = stub(session, 'get').returns()
				stubs.set = stub(session, 'set').returns()
				stubs.findAppContainerByClientId = stub(appSrvc, 'findAppContainerByClientId')
					.resolves({
						name: 'docker_container',
					})

				stubs.authenticate = stub(oauthSrvc, 'authenticate')
					.resolves({
						authenticated: false,
						user: {},
					})

				try {
					res = await server.inject({
						method: 'POST',
						url: '/authenticate',
						payload: {
							username: 'test_user',
							password: 'test_pwd',
							next: 'http://example.org/cb',
						},
					})
				} catch (error) {
					err = error
				}
			})

			it('Should not throw an error', () => {
				expect(err).to.be.undefined()
			})

			it('Should return status code 422', () => {

				expect(res.statusCode).to.be.equal(422)
			})

		})

		describe('Unsucessful authentication when container is not found', async () => {

			let err, res

			before(async () => {

				stubs.get = stub(session, 'get').returns()
				stubs.set = stub(session, 'set').returns()
				stubs.findAppContainerByClientId = stub(appSrvc, 'findAppContainerByClientId')
					.resolves()

				stubs.authenticate = stub(oauthSrvc, 'authenticate')
					.resolves({
						authenticated: false,
						user: {},
					})

				try {
					res = await server.inject({
						method: 'POST',
						url: '/authenticate',
						payload: {
							username: 'test_user',
							password: 'test_pwd',
							next: 'http://example.org/cb',
						},
					})
				} catch (error) {
					err = error
				}
			})

			it('Should not throw an error', () => {
				expect(err).to.be.undefined()
			})

			it('Should return status code 422', () => {
				expect(res.statusCode).to.be.equal(422)
			})

		})

		describe('Unsucessful authentication when container name is not found', async () => {

			let err, res

			before(async () => {

				stubs.get = stub(session, 'get').returns()
				stubs.set = stub(session, 'set').returns()
				stubs.findAppContainerByClientId = stub(appSrvc, 'findAppContainerByClientId')
					.resolves({})

				stubs.authenticate = stub(oauthSrvc, 'authenticate')
					.resolves({
						authenticated: false,
						user: {},
					})

				try {
					res = await server.inject({
						method: 'POST',
						url: '/authenticate',
						payload: {
							username: 'test_user',
							password: 'test_pwd',
							next: 'http://example.org/cb',
						},
					})
				} catch (error) {
					err = error
				}
			})

			it('Should not throw an error', () => {
				expect(err).to.be.undefined()
			})

			it('Should return status code 422', () => {
				expect(res.statusCode).to.be.equal(422)
			})

		})
	})

})

