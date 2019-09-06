const handlers = require('./handlers')

exports = module.exports = {}

/**
 * hapi plugin with notification endpoints.
 * @module plugins/notification
 */

/**
 * Configuration object for notification endpoint
 */
exports.plugin = {
	register: (server) => {
		// Routes
		server.route([
			{
				method: 'GET',
				path: '/notifications/latest',
				options: handlers.getLatestNotification,
			},
			{
				method: 'GET',
				path: '/admin/notifications',
				options: handlers.listNotification,
			},
			{
				method: 'POST',
				path: '/admin/notifications',
				options: handlers.addNotification,
			},
			{
				method: 'PUT',
				path: '/admin/notifications/{notificationId}/status',
				options: handlers.toggleNotificationStatus,
			},
			{
				method: 'DELETE',
				path: '/admin/notifications/{notificationId}',
				options: handlers.deleteNotification,
			},
		])
	},
	name: 'notification',
}
