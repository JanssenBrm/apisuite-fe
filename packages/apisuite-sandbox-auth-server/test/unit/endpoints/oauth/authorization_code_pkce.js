const { afterEach, before, after, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')
const chance = require('../../../mocks/chance')
const bcrypt = require('bcrypt')


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
const psuSrvc = require('../../../../src/services/psu')
const session = require('../../../../src/utils/session')

const stubs = {}

describe('(UNIT) GET /authorize?...', async () => {

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

		describe('Successful redirect after Authorization is granted', async () =>{

			let err, res, state, code, challenge

			before(async ()=> {
				state = chance.string({pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'})
				code = chance.string({pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'})
				const challengePlain = chance.string({pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_*&?^!'})

				challenge = await bcrypt.hash(challengePlain, 5)

				stubs.get = stub(session,'get').returns({
					req_state : state,
				})

				stubs.set = stub(session,'set').returns()

				stubs.generateCode = stub(oauthSrvc, 'generateCode').returns(code)
				stubs.createAccreditation = stub(psuSrvc, 'createAccreditation')
					.resolves({})
				stubs.validateScope = stub( oauthSrvc, 'validateScope')
					.resolves({isValid:true, message: null})
				stubs.validateGrantType = stub( oauthSrvc, 'validateGrantType')
					.resolves({isValid:true, message: null})
				
				stubs.getStateParameter = stub(oauthSrvc, 'getStateParameter')
					.resolves(state)
				
				stubs.findRedirectUrl = stub(appSrvc, 'findRedirectUrl')
					.resolves({})

				try {
					res = await server.inject({
						method: 'POST',
						url: `/authorize?state=${state}&client_id=123`,
						payload:{
							redirect_uri: 'http://localhost:3000/cb',
							scope: 'aisp',
							response_type: 'code',
							code_challenge: challenge,
							code_challenge_method: 'S256',
						},
						credentials: {user:{userId: chance.integer(),username: chance.string(), password: chance.string()}},
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

			it('Should not be authenticated', () => {
				expect(res.request.auth.isAuthenticated).to.be.true()
			})

			it('Should redirect to the redirect_uri with a code querystring', () => {
				expect(res.headers.location).to.contain('http://localhost:3000/cb?code=')
			})

		})

	})
})

