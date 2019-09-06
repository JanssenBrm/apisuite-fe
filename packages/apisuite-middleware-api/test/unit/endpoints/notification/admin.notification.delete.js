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
	require('../../../../src/plugins/notification'),
]

const oauth2Srvc = require('../../../../src/services/oauth2')
const notifSrvc = require('../../../../src/services/notification')
const User = require('../../../../src/models/User')
const Notification = require('../../../../src/models/Notification')

const stubs = {}

describe('(UNIT) DELETE /admin/notifications/{notificationId}', async () => {

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

	describe('Successfuly delete notification', async () => {
		const token = chance.string({ length: 48 })
		const notificationId = chance.integer({ min: 1, max: 10 })
		let error, resp

		before(async () => {

			const user = new User({
				id: chance.integer({ min: 1, max: 10 }),
				email: chance.email(),
				full_name: chance.name(),
				phone_number: chance.phone(),
				created_at: new Date(),
				updated_at: new Date(),
			})

			const oauth2Token = {
				token: {
					roles: 'ADMIN',
					getScopes: () => 'admin',
					related: () => user,
				},
			}

			stubs.validateBearerToken = stub(oauth2Srvc, 'validateBearerToken')
				.resolves(oauth2Token)

			stubs.deleteNotification = stub(notifSrvc, 'deleteNotification')
				.resolves({})

			try {
				resp = await server.inject({
					headers: {
						'authorization': `Bearer ${token}`,
					},
					method: 'DELETE',
					url: `/admin/notifications/${notificationId}`,
				})

			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})

		it('Should return 204', () => {
			expect(resp.statusCode).to.equal(204)
		})
	})

	describe('Fail to delete notification (not found)', async () => {
		const token = chance.string({ length: 48 })
		const notificationId = chance.integer({ min: 1, max: 10 })
		let error, resp

		before(async () => {

			const user = new User({
				id: chance.integer({ min: 1, max: 10 }),
				email: chance.email(),
				full_name: chance.name(),
				phone_number: chance.phone(),
				created_at: new Date(),
				updated_at: new Date(),
			})

			const oauth2Token = {
				token: {
					roles: 'ADMIN',
					getScopes: () => 'admin',
					related: () => user,
				},
			}

			stubs.validateBearerToken = stub(oauth2Srvc, 'validateBearerToken')
				.resolves(oauth2Token)

			stubs.NotificationWhere = stub(Notification, 'where')
				.returns({ fetch: () => null })

			try {
				resp = await server.inject({
					headers: {
						'authorization': `Bearer ${token}`,
					},
					method: 'DELETE',
					url: `/admin/notifications/${notificationId}`,
				})

			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})

		it('Should return 404', () => {
			expect(resp.statusCode).to.equal(404)
		})
	})
})
