const Joi = require('joi')
const notifSrvc = require('../../services/notification')
const Boom = require('boom')
const log = require('../../utils/logger')
const marked = require('marked')
marked.setOptions({
	gfm: true,
	breaks: true,
	xhtml: true,
})

exports = module.exports = {}

/**
 * @memberof module:plugins/notification
 */

/**
 * GET /notifications/latest
 */
exports.getLatestNotification = {
	id: 'appcenter-notifications-get-latest',
	description: 'Get the latest notification.',
	notes: ['Get the latest notification added or if there\'s an alert flagged, the alert.'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'Ok' },
				'400': { 'description': 'Bad Request' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
	},
	auth: {
		strategy: 'appcenterToken',
	},
	handler: async (request, h) => {
		try {

			const notif = await notifSrvc.getLatestNotification()
			const notification = notif && notif.toJSON ? notif.toJSON() : {}
			notification.message = marked(notification.message || '')
			return h.response(notification).code(200)

		} catch (error) {

			log.info(error, 'getLatestNotification')
			return Boom.internal()

		}
	},
}

/**
 * GET /admin/notifications/
 */
exports.listNotification = {
	id: 'appcenter-notifications-list',
	description: 'List notifications.',
	notes: ['List notifications.'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'Ok' },
				'400': { 'description': 'Bad Request' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
	},
	validate: {
		query: {
			page: Joi.number().integer()
				.min(1)
				.default(1),
			pageSize: Joi.number().integer()
				.positive()
				.default(10),
		},
	},
	response: {
		status: {
			200: Joi.object({
				notifications: Joi.array().items(Joi.object({
					id: Joi.number().integer().positive().required().example(1),
					tag: Joi.string().optional().allow('', null).example('maintenance'),
					message: Joi.string().required().example('*Warning*: maintenace scheduled for...'),
					link: Joi.string().optional().allow('', null).example('https://maintenace.page'),
					author: Joi.string().required().example('Bot'),
					public: Joi.boolean().required().example(false),
					alert: Joi.boolean().required().example(false),
					scheduled: Joi.string().optional().isoDate().allow('', null).example('2020-04-30T12:00:00.000Z'),
					created: Joi.string().optional().isoDate().allow('', null).example('2019-04-19T12:00:00.000Z'),
					updated: Joi.string().optional().isoDate().allow('', null).example('2019-04-19T12:00:00.000Z'),
				})),
				pagination: Joi.object({
					page: Joi.number().integer().required().example(1),
					pageSize: Joi.number().integer().required().example(1),
					rowCount: Joi.number().integer().required().example(1),
					pageCount: Joi.number().integer().required().example(1),
				}),
			}).label('notifications-list'),
		},
	},
	auth: {
		strategy: 'appcenterToken',
		scope: 'admin',
	},
	handler: async (request, h) => {
		try {

			const notifs = await notifSrvc.listAdminNotification({ page: request.query.page, pageSize: request.query.pageSize })
			return h.response({ notifications: notifs.toJSON ? notifs.toJSON() : notifs, pagination: notifs.pagination }).code(200)

		} catch (error) {

			log.info(error, 'listNotification')
			return Boom.internal()

		}
	},
}

/**
 * POST /admin/notifications/
 */
exports.addNotification = {
	id: 'appcenter-notification-create',
	description: 'Add a new notification to the notification list.',
	notes: ['Adds a new notification'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'201': { 'description': 'Created' },
				'400': { 'description': 'Bad Request' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
	},
	validate: {
		payload: {
			tag: Joi.string()
				.optional().allow('', null),
			message: Joi.string()
				.example('*Warning:* The system will undergo `maintenace` between _x_ and _y_. Thank you for your patience.')
				.required(),
			link: Joi.string()
				.optional().allow('', null),
		},
		options: {
			allowUnknown: true,
		},
	},
	response: {
		status: {
			201: Joi.object({
				id: Joi.number().integer().positive().required().example(1),
				tag: Joi.string().optional().allow('', null).example('maintenance'),
				message: Joi.string().required().example('*Warning*: maintenance scheduled for...'),
				link: Joi.string().optional().allow('', null).example('https://maintenance.page'),
				author: Joi.string().required().example('Bot'),
				public: Joi.boolean().required().example(false),
				alert: Joi.boolean().required().example(false),
				scheduled: Joi.string().optional().isoDate().allow('', null).example('2020-04-30T12:00:00.000Z'),
				created: Joi.string().required().isoDate().allow('', null).example('2019-04-19T12:00:00.000Z'),
				updated: Joi.string().required().isoDate().allow('', null).example('2019-04-19T12:00:00.000Z'),
			}).label('notification'),
		},
	},
	auth: {
		strategy: 'appcenterToken',
		scope: 'admin',
	},
	handler: async (request, h) => {
		try {

			const user = request.auth.artifacts.user
			request.payload.author = (user.full_name || user.get('full_name')).split(' ')[0]

			const notif = await notifSrvc.createNotification(request.payload)
			return h.response(notif.toJSON ? notif.toJSON() : notif).code(201)

		} catch (error) {

			log.info(error, 'addNotification')
			return Boom.internal()

		}
	},
}

/**
 * PUT /admin/notifications/{notificationId}/status
 */
exports.toggleNotificationStatus = {
	id: 'appcenter-notification-status',
	description: 'Toggle the notification status (public, alert).',
	notes: ['Toggles the notification status'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'Ok' },
				'400': { 'description': 'Bad Request' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
	},
	validate: {
		params: {
			notificationId: Joi.number().integer().positive()
				.required()
				.example('12345'),
		},
		payload: {
			status: Joi.array().items(
				Joi.string()
					.valid('public', 'alert').required()
			).required(),
		},
		options: {
			allowUnknown: true,
		},
	},
	response: {
		status: {
			200: Joi.object({
				id: Joi.number().integer().positive().required().example(1),
				public: Joi.boolean().optional().example(false),
				alert: Joi.boolean().optional().example(false),
			}).label('status'),
		},
	},
	auth: {
		strategy: 'appcenterToken',
		scope: 'admin',
	},
	handler: async (request, h) => {
		try {

			const notif = await notifSrvc.updateNotificationStatus(request.params.notificationId, request.payload)
			return h.response(notif).code(200)

		} catch (error) {

			log.info(error, 'toggleNotificationStatus')
			return Boom.isBoom(error) ? error : Boom.internal()

		}
	},
}

/**
 * DELETE /admin/notifications/{notificationId}
 */
exports.deleteNotification = {
	id: 'appcenter-notification-delete',
	description: 'Delete a notification from the notification list.',
	notes: ['Deletes a notification'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'204': { 'description': 'No content' },
				'400': { 'description': 'Bad Request' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
	},
	validate: {
		params: {
			notificationId: Joi.number().integer().positive()
				.required()
				.example('12345'),
		},
	},
	auth: {
		strategy: 'appcenterToken',
		scope: 'admin',
	},
	handler: async (request, h) => {
		try {

			await notifSrvc.deleteNotification(request.params.notificationId)
			return h.response().code(204)

		} catch (error) {

			log.info(error, 'deleteNotification')
			return Boom.isBoom(error) ? error : Boom.internal()

		}
	},
}
