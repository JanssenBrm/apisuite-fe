const { afterEach, before, after, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')
const chance = require('../../../mocks/chance')

const config = require('../../../../src/config')
const Hapi = require('hapi')

const Bell = require('bell')
const Vision = require('vision')

const userSrvc = require('../../../../src/services/user')
const oauth2Srvc = require('../../../../src/services/oauth2')

const plugins = [
	require('hapi-auth-bearer-token'),
	require('../../../../src/plugins/internal/authStrategies'),
	require('../../../../src/plugins/oauth2'),
]


const stubs = {}

// Its failing
describe('(UNIT) GET /auth/github', async () => {


	afterEach(async () => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})

	describe('Successful request', async () => {

		describe('Successful Authentication', async () => {

			let error, resp

			const server = new Hapi.Server(config.get('server'))

			before(async () => {


				Bell.simulate( () => {
					return {
						profile : {
							id: chance.integer({length: 5}),
							email : 'email@cloudoki.com',
							displayName: 'the full name',
							username: 'theusername',
							raw: {
								avatar_url: 'https://www.cloudoki.com/avatar.png',
								two_factor_authentication : true,
							},
						},
					}
				})

				server.register(Bell)
				server.register(Vision)


				await server.register(plugins)
				await server.start()

				stubs.upsertGithub = stub(userSrvc,'upsertGithub').resolves({})
				stubs.getByGithubID = stub(userSrvc,'getByGithubID').resolves({})
				stubs.generateTokenNoPass = stub(oauth2Srvc,'generateTokenNoPass').resolves({
					token: chance.string({length:48}),
					refreshToken: chance.string({length:48}),
				})

				try {
					resp = await server.inject({

						method: 'GET',
						url: '/auth/github',
					})

				} catch (err) {
					error = err
				}
			})

			it('Should not return an error', () => {
				expect(error).to.be.undefined()
			})

			it('Should redirect to the appcenter', () => {
				expect(resp.headers.location).to.include(config.get('appcenter').url + '/signup?access_token=')
			})

			it('Should return a 302 status code', ()=>{
				expect(resp.statusCode).to.be.equal(302)
			})

			after(async () => {
				await server.stop()
			})
		})

		describe('Successful Signin', async () => {
			let error, resp

			const server = new Hapi.Server(config.get('server'))

			before(async () => {


				Bell.simulate(() => {
					return {
						profile : {
							id: chance.integer({length: 5}),
							email : 'email@cloudoki.com',
							displayName: 'the full name',
							username: 'theusername',
							raw: {
								avatar_url: 'https://www.cloudoki.com/avatar.png',
								two_factor_authentication : true,
							},
						},
					}
				})

				server.register(Bell)
				server.register(Vision)


				await server.register(plugins)
				await server.start()

				stubs.upsertGithub = stub(userSrvc,'upsertGithub').resolves(undefined)
				stubs.getByGithubID = stub(userSrvc,'getByGithubID').resolves({})
				stubs.generateTokenNoPass = stub(oauth2Srvc,'generateTokenNoPass').resolves({
					token: chance.string({length:48}),
					refreshToken: chance.string({length:48}),
				})

				stubs.log = stub(require('../../../../src/utils/activity-log'), 'log')
					.resolves()
                    
				try {
					resp = await server.inject({

						method: 'GET',
						url: '/auth/github',
					})

				} catch (err) {
					error = err
				}
			})

			it('Should not return an error', () => {
				expect(error).to.be.undefined() 
			})

			it('Should redirect to the appcenter', () => {
				expect(resp.headers.location).to.include(config.get('appcenter').url + '/github?access_token=')
			})

			it('Should return a 302 status code', ()=>{
				expect(resp.statusCode).to.be.equal(302)
			})

			after(async () => {
				await server.stop()
			})
		})

		describe('Unuccessful Authentication because user does not have 2fa enabled', async () => {
			let error, resp

			const server = new Hapi.Server(config.get('server'))

			before(async () => {


				Bell.simulate(() => {
					return {
						profile : {
							id: chance.integer({length: 5}),
							email : 'email@cloudoki.com',
							displayName: 'the full name',
							username: 'theusername',
							raw: {
								avatar_url: 'https://www.cloudoki.com/avatar.png',
								two_factor_authentication : false,
							},
						},
					}
				})

				server.register(Bell)
				server.register(Vision)


				await server.register(plugins)
				await server.start()

				stubs.upsertGithub = stub(userSrvc,'upsertGithub').resolves({})
				stubs.getByGithubID = stub(userSrvc,'getByGithubID').resolves({})
				stubs.generateTokenNoPass = stub(oauth2Srvc,'generateTokenNoPass').resolves({
					token: chance.string({length:48}),
					refreshToken: chance.string({length:48}),
				})

				try {
					resp = await server.inject({

						method: 'GET',
						url: '/auth/github',
					})

				} catch (err) {
					error = err
				}
			})

			it('Should not return an error', () => {
				expect(error).to.be.undefined()
			})

			it('Should return a 401 status code', ()=> {
				expect(resp.statusCode).to.be.equal(401)
			})

			it('Should state that authorization failed due to 2FA being disabled', () => {
				expect(resp.result.message).to.be.equal('github 2F authentication must be enabled')
			})

			after(async () => {
				await server.stop()
			})
		})
	})

})
