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

describe('(UNIT) POST /rbac/{organizationId}/user/{userId}', async () => {

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

			const payload = {
				roleId: 1,
			}
      
			stubs.addUserOrganizationRole = stub( userSrvc, 'addUserOrganizationRole')
				.resolves()

			try {
				resp = await server.inject({
					headers: {
						'authorization': `Bearer ${token}`,
					},
					credentials: {
						user:{userId: chance.integer(),username: chance.string(), password: chance.string()},
						roles: [
							{organizationId: 1, role: 'ADMIN'},
							{organizationId: 1, role: 'DEVELOPER'},
						],
					},
					payload: payload,
					method: 'POST',
					url: '/rbac/1/user/1',
				})

			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})

		it('Should return 201 Created', () => {
			expect(resp.statusCode).to.equal(201)
		})
	})
  
	describe('Unauthorized request due to insufficient roles', async () => {
		const token = chance.string({ length: 48 })
		let error, resp

		before(async () => {

			const payload = {
				roleId: 1,
			}
      
			stubs.addUserOrganizationRole = stub( userSrvc, 'addUserOrganizationRole')
				.resolves()

			try {
				resp = await server.inject({
					headers: {
						'authorization': `Bearer ${token}`,
					},
					credentials: {
						user:{userId: chance.integer(),username: chance.string(), password: chance.string()},
						roles: [
							{organizationId: 1, role: 'DEVELOPER'},
						],
					},
					payload: payload,
					method: 'POST',
					url: '/rbac/1/user/1',
				})

			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})

		it('Should return 403 Unauthorized', () => {
			expect(resp.statusCode).to.equal(403)
		})
	})
  
	describe('Unauthorized request due to no roles on the given organization', async () => {
		const token = chance.string({ length: 48 })
		let error, resp

		before(async () => {

			const payload = {
				roleId: 1,
			}
      
			stubs.addUserOrganizationRole = stub( userSrvc, 'addUserOrganizationRole')
				.resolves()

			try {
				resp = await server.inject({
					headers: {
						'authorization': `Bearer ${token}`,
					},
					credentials: {
						user:{userId: chance.integer(),username: chance.string(), password: chance.string()},
						roles: [
							{organizationId: 5, role: 'ADMIN'},
						],
					},
					payload: payload,
					method: 'POST',
					url: '/rbac/1/user/1',
				})

			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})

		it('Should return 403 Unauthorized', () => {
			expect(resp.statusCode).to.equal(403)
		})
	})
})
