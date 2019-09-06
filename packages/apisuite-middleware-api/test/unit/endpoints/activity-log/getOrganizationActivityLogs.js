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
	require('../../../../src/plugins/activityLog'),
]

const userSrvc = require('../../../../src/services/user')
const activityLogSrvc = require('../../../../src/services/activityLog')
const stubs = {}

describe('(UNIT) GET /activity/{organizationId}', async () => {

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

			stubs.listOrganizationActivityLogs = stub( activityLogSrvc, 'listOrganizationActivityLogs' )
				.resolves({
					toJSON : () => {
						return [ { id: 6,
							action: 'USER_CREATION',
							creator:
							{ id: 31,
								email: 'sergio@cloudoki.com',
								fullName: 'antonio simoes',
								avatar: '',
								bio: '',
								phone: '+351924298254',
								activated: true,
								github: false,
								created: '2018-12-13T19:41:27.000Z',
								updated: '2019-01-07T17:00:05.000Z' },
							organization:
							{ id: 31,
								name: 'the vast company',
								vat: '12345',
								website: 'http://www.vast.eu.com',
								description: null,
								logoUrl: null,
								policyUrl: null,
								state: 'NON_TRUSTED',
							},
							category: 'some_category',
							additionalInfo: '{"id":100,"email":"some_user_just_created@example.com"}',
							created: '2019-05-30T11:12:43.000Z' },
						{ id: 7,
							action: 'USER_CREATION',
							creator:
							{ id: 31,
								email: 'sergio@cloudoki.com',
								fullName: 'antonio simoes',
								avatar: '',
								bio: '',
								phone: '+351924298254',
								activated: true,
								github: false,
								created: '2018-12-13T19:41:27.000Z',
								updated: '2019-01-07T17:00:05.000Z' },
							organization:
							{ id: 31,
								name: 'the vast company',
								vat: '12345',
								website: 'http://www.vast.eu.com',
								description: null,
								logoUrl: null,
								policyUrl: null,
								state: 'NON_TRUSTED',
							},
							category: 'some_category',
							additionalInfo: '{"id":100,"email":"some_user_just_created@example.com"}',
							created: '2019-05-30T11:17:03.000Z' },
						]
					},
					pagination: {},
				})
			
			stubs.getActionsAvailableForUserRoles = stub(userSrvc, 'getActionsAvailableForUserRoles')
				.resolves(
					['USER_CREATION',
						'USER_LOGIN']
				)

			try {
				resp = await server.inject({
					headers: {
						'authorization': `Bearer ${token}`,
					},
					credentials: {
						user:{ get: () => 31 ,username: chance.string(), password: chance.string()},
						roles: [
							{organizationId: 31, role: 'ADMIN'},
							{organizationId: 31, role: 'DEVELOPER'},
						],
					},
					artifacts: {
						user:{ get: () => 31 ,username: chance.string(), password: chance.string()},
					},
					method: 'GET',
					url: `/activity/31?page=1&pageSize=50&category=some_category&from=${new Date()}&to=${new Date()}`,
				})

			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})

		it('Should return 200 OK', () => {
			expect(resp.statusCode).to.equal(200)
		})

		it('Should return an array of records', () => {
			expect(resp.result.records).not.to.be.undefined()
		})
	})
})
