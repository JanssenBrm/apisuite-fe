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

const oauth2Srvc = require('../../../../src/services/oauth2')
const userSrvc = require('../../../../src/services/user')
const orgSrvc = require('../../../../src/services/organization')

const User = require('../../../../src/models/User')

const stubs = {}

describe('(UNIT) PUT /team/{organizationId}/user/{userId}/password', async () => {

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

		const user = new User({
			id: chance.integer({ min: 1, max: 10 }),
			email: chance.email(),
			full_name: chance.name(),
			phone_number: chance.phone(),
			created_at: new Date(),
			updated_at: new Date(),
		})
		const orgId = 1

		before(async () => {

			stubs.validateBearerToken = stub(oauth2Srvc, 'validateBearerToken')
				.resolves({ user })

			stubs.areUsersInOrg = stub(orgSrvc, 'areUsersInOrg')
				.resolves(true)

			stubs.recoverPassword = stub(userSrvc, 'recoverPassword')
				.resolves()

			try {
				resp = await server.inject({
					headers: {
						'authorization': `Bearer ${token}`,
					},
					artifacts: {
						user: {
							get: (field) => user[`${field}`],
						},
					},
					credentials: {
						user: { userId: user.id, username: chance.string(), password: chance.string() },
						roles: [
							{ organizationId: orgId, role: 'ADMIN' },
							{ organizationId: orgId, role: 'DEVELOPER' },
						],
					},
					method: 'PUT',
					url: `/team/${orgId}/user/${user.id}/password`,
					payload: {
						password: `${chance.string({ length: 8 })}.${chance.string({ length: 2, pool: '0123456789' })}.${chance.string({ length: 2, pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' })}`,
					},
				})
			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})

		it('Should return 204 OK', () => {
			expect(resp).to.exist()
			expect(resp).to.be.an.object()
			expect(resp.statusCode).to.equal(204)
		})
	})
})
