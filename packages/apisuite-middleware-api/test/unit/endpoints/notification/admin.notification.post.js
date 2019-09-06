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

const stubs = {}

describe('(UNIT) POST /admin/notifications', async () => {

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

	describe('Successfuly create a notification', async () => {
		const token = chance.string({ length: 48 })
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

			const payload = {
				tag: 'maintenance',
				message: '*Warning:* The system will undergo `maintenace` between _x_ and _y_. Thank you for your patience.',
				link: 'https://google.com',
			}

			stubs.validateBearerToken = stub(oauth2Srvc, 'validateBearerToken')
				.resolves(oauth2Token)

			stubs.createNotification = stub(notifSrvc, 'createNotification')
				.resolves({
					id: 1,
					...payload,
					author:(user.full_name || user.get('full_name')).split(' ')[0],
					public: false,
					alert: false,
					scheduled: null,
					created: '2019-07-29T13:15:12.378Z',
					updated: '2019-07-29T13:15:12.378Z',
				})

			try {
				resp = await server.inject({
					headers: {
						'authorization': `Bearer ${token}`,
					},
					method: 'POST',
					url: '/admin/notifications',
					payload,
				})

			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})

		it('Should return 201', () => {
			expect(resp.statusCode).to.equal(201)
		})

		it('Should return an object with the created notification', () => {
			let payload = JSON.parse(resp.payload || {})
			const hasProps = ['id', 'message', 'author','public', 'alert'].every((key) => Object.keys(payload).includes(key))
			expect(hasProps).to.be.true()
		})
	})

	describe('Fail to create notification', async () => {
		const token = chance.string({ length: 48 })
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

			const payload = {
				tag: 'maintenance',
				message: '*Warning:* The system will undergo `maintenace` between _x_ and _y_. Thank you for your patience.',
				link: 'https://google.com',
			}

			stubs.validateBearerToken = stub(oauth2Srvc, 'validateBearerToken')
				.resolves(oauth2Token)

			stubs.createNotification = stub(notifSrvc, 'createNotification')
				.rejects()

			try {
				resp = await server.inject({
					headers: {
						'authorization': `Bearer ${token}`,
					},
					method: 'POST',
					url: '/admin/notifications',
					payload,
				})

			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})

		it('Should return 500', () => {
			expect(resp.statusCode).to.equal(500)
		})
	})
})
