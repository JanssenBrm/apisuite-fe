const { afterEach, before, after, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')
const chance = require('../../../mocks/chance')

const config = require('../../../../src/config')
const Hapi = require('hapi')
const server = new Hapi.Server(config.get('server'))

const plugins = [
	require('bell'),
	require('hapi-auth-bearer-token'),
	require('../../../../src/plugins/internal/authStrategies'),
	require('../../../../src/plugins/internal/rbac'),
	require('../../../../src/plugins/rbac'),
	require('../../../../src/plugins/organization'),
]

// const userSrvc = require('../../../../src/services/user')
const orgSrvc = require('../../../../src/services/organization')

const stubs = {}

describe('(UNIT) GET /team/{organizationId}', async () => {

	before(async () => {
		await server.register(plugins)
		await server.start()
	})

	after(async () => {
		await server.stop()
	})

	afterEach(async () => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})

	describe('Successful request', async () => {
		const token = chance.string({ length: 48 })
		let error, resp

		before(async () => {

			stubs.listOrganizationUsers = stub( orgSrvc , 'listOrganizationUsers')
				.resolves(
					{
						'users':[
							{
								'id':1,
								'email':'user@user.com',
								'fullName':'user name',
								'avatar':'',
								'bio':'',
								'phone':'',
								'activated':true,
								'github':false,
								'twofa':{
									'enabled':true,
									'method':'authorizationSms',
								},
								'roles':[
									{
										'id':1,
										'orgId':1,
										'name':'ADMIN',
									},
									{
										'id':2,
										'orgId':1,
										'name':'DEVELOPER',
									},
								],
							},
						],
						'roles':[
							{
								'id':1,
								'name':'ADMIN',
								'level':0,
							},
							{
								'id':2,
								'name':'DEVELOPER',
								'level':1,
							},
							{
								'id':3,
								'name':'TESTER',
								'level':2,
							},
							{
								'id':4,
								'name':'SALES',
								'level':3,
							},
						],
					}
				)

			try {
				resp = await server.inject({
					headers: {
						'authorization': `Bearer ${token}`,
					},
					credentials: {
						user:{ get: () => 1 ,username: chance.string(), password: chance.string()},
						roles: [
							{organizationId: 1, role: 'ADMIN'},
							{organizationId: 1, role: 'DEVELOPER'},
						],
					},
					method: 'GET',
					url: '/team/1',
				})

			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})

		it('Should return users list', () => {
			expect(resp.result.users).not.to.be.undefined()
		})

		it('Should return roles list', () => {
			expect(resp.result.roles).not.to.be.undefined()
		})


		it('Should return one user element in array', () => {
			expect(resp.result.users.length).to.equal(1)
		})

		it('Should return users with roles list', () => {
			expect(resp.result.users[0].roles.length).to.be.greaterThan(0)
		})
	})
	
})
