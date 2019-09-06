const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')

const notifService = require('../../../../src/services/notification')
const Notification = require('../../../../src/models/Notification')

const stubs = {}

describe('(UNIT) services.notification.updateNotificationStatus', async () => {

	afterEach(() => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})

	describe('Returns the updated status with the value changed', async () => {

		let error, notifId, data, result

		before(async () => {

			notifId = 1
			data =  { status: [ 'public' ] }

			stubs.NotificationWhere = stub(Notification, 'where')
				.returns({
					fetch: () => {
						let notif = {
							id: 1,
							tag: 'maintenance',
							message: '*Warning:* The system will undergo `maintenace` between _x_ and _y_. Thank you for your patience.',
							link: 'https://google.com',
							author: 'Bot',
							public: false,
							alert: false,
							scheduled: null,
							created: '2019-07-29T13:15:12.378Z',
							updated: '2019-07-29T13:15:12.378Z',
						}
						return {
							get: (prop) => notif[prop],
						}
					},
				})
			stubs.NotificationUpdate = stub(Notification, 'update')
				.resolves()

			try {
				result = await notifService.updateNotificationStatus(notifId, data)
			} catch (err) {
				error = err
			}
		})

		it('Should not return an error',  () => {
			expect(error).to.be.undefined()
		})

		it('Should return the updated status',  () => {
			expect(result).to.be.an.object()
			expect(result.id).to.exist()
			expect(result.id).to.be.a.number()
			expect(result.public).to.exist()
			expect(result.public).to.be.true()
		})

	})

	describe('Returns a not found error', async () => {

		let error, notifId, data, result

		before(async () => {

			notifId = 1
			data = { status: [ 'public' ] }

			stubs.NotificationWhere = stub(Notification, 'where')
				.returns({
					fetch: () => null,
				})
			stubs.NotificationUpdate = stub(Notification, 'update')
				.resolves()

			try {
				result = await notifService.updateNotificationStatus(notifId, data)
			} catch (err) {
				error = err
			}
		})

		it('Should return an error',  () => {
			expect(error).to.be.exist()
		})

		it('Should return nothing',  () => {
			expect(result).to.be.an.undefined()
		})

	})

	describe('Fail to update status', async () => {

		let error, notifId, data, result

		before(async () => {

			notifId = 1
			data = { status: [ 'alert' ] }

			stubs.NotificationWhere = stub(Notification, 'where')
				.returns({
					fetch: () => {
						let notif = {
							id: 1,
							tag: 'maintenance',
							message: '*Warning:* The system will undergo `maintenace` between _x_ and _y_. Thank you for your patience.',
							link: 'https://google.com',
							author: 'Bot',
							public: false,
							alert: false,
							scheduled: null,
							created: '2019-07-29T13:15:12.378Z',
							updated: '2019-07-29T13:15:12.378Z',
						}
						return {
							get: (prop) => notif[prop],
						}
					},
				})
			stubs.NotificationUpdate = stub(Notification, 'update')
				.rejects()

			try {
				result = await notifService.updateNotificationStatus(notifId, data)
			} catch (err) {
				error = err
			}
		})

		it('Should not return an error',  () => {
			expect(error).to.be.undefined()
		})

		it('Should return status with the original value',  () => {
			expect(result).to.be.an.object()
			expect(result.id).to.exist()
			expect(result.id).to.be.a.number()
			expect(result.alert).to.exist()
			expect(result.alert).to.be.false()
		})

	})
})
