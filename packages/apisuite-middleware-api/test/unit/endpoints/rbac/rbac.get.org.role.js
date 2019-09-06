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
]

const userSrvc = require('../../../../src/services/user')

const stubs = {}

describe('(UNIT) GET /rbac/{organizationId}/user/{userId}', async () => {

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

			stubs.getUserOrganizationRoles = stub( userSrvc, 'getUserOrganizationRoles' )
				.resolves( [
					{
						organizationId: 1,
						id: 1,
						name: 'ADMIN',
					},
					{
						organizationId: 1,
						id: 2,
						name: 'DEVELOPER',
					},
				]
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
					url: '/rbac/1/user/1',
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

		it('Should return an array', () => {
			expect(resp.result.length).to.be.greaterThan(0)
		})
	})

	describe('Should return empty array if no roles exist', async () => {
		const token = chance.string({ length: 48 })
		let error, resp

		before(async () => {

			stubs.getUserOrganizationRoles = stub( userSrvc, 'getUserOrganizationRoles' )
				.resolves([])

			try {
				resp = await server.inject({
					headers: {
						'authorization': `Bearer ${token}`,
					},
					credentials: {
						user:{ get: () => 1 ,username: chance.string(), password: chance.string() },
						roles: [
							{organizationId: 1, role: 'ADMIN'},
							{organizationId: 1, role: 'DEVELOPER'},
						],
					},
					method: 'GET',
					url: '/rbac/1/user/1',
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

		it('Should return an array', () => {
			
			expect(resp.result.length).to.equal(0)
		})
	})
})
