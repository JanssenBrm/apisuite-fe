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

const oauthSrvc = require( '../../../../src/services/oauth')
const appSrvc = require( '../../../../src/services/app')
const authPersistence = require('../../../../src/services/oauth/persistence')
const authHelper = require('../../../../src/services/oauth/helper')

const stubs = {}

describe('(UNIT) code creation with branded scopes', () => {
	
	before (async () => {
		await server.register(plugins)
		await server.start()
	})

	after( async() => {
		await server.stop()
	})

	afterEach(() => {
		Object.keys(stubs).map((stub) => stubs[stub].restore())
	})

	describe('Generate Authorization Code', async () => {

		describe('Successful generation of code with branded scopes', async () => {

			let res, err
			before(async () => {

				stubs.validateScope = stub(oauthSrvc, 'validateScope')
					.resolves({isValid: true})

				stubs.findRedirectUrl = stub(appSrvc, 'findRedirectUrl')
					.resolves({})

				stubs.checkIfCodeExistsAndRemove = stub(authPersistence, 'checkIfCodeExistsAndRemove')
					.resolves()

				stubs.getStateParamater = stub(oauthSrvc, 'getStateParameter')
					.resolves()

				stubs.getAppScopes = stub(appSrvc, 'getAppScopes')
					.resolves([
						{ scope: {name: 'aisp'}, brand: 'bnppf', appId: 1, scopeId: 2},
						{ scope: {name: 'aisp'}, brand: 'fintro', appId: 1, scopeId: 2 },
						{ scope: {name: 'pisp'}, brand: 'fintro', appId: 1, scopeId: 4},
					])
				
				stubs.saveCode = stub(authHelper,'saveCode')
					.resolves({
						id: 1,
						code: 'code_123',
						clientId: 'client_id_1',
						userId: 1,
						scopes: [
							{name: 'pisp'},
						],
						codeChallenge: 'challenge_code',
						codeChallengeMethod: 'S256',
						expires: new Date().getTime() + (1*60*60*1000),
					})

				try {
					res = await server.inject({
						method: 'POST',
						url: '/authorize?state=initial_state&client_id=client_id_1',
						payload: {
							redirect_uri: 'http://www.example.com',
							scope: 'aisp;pisp',
							response_type: 'code',
						},
						credentials: {user:{userId: chance.integer(),username: chance.string(), password: chance.string()}},
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
	})
})
