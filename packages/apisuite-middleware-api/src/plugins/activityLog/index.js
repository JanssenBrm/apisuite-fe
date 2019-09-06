const handlers = require('./handlers')

exports = module.exports = {}

/**
 * hapi plugin with Activity logs endpoints.
 * @module plugins/activityLog
 */

/**
 * Configuration object
 */
exports.plugin = {

	register: (server) => {

		// Routes
		server.route([
			{
				method: 'GET',
				path: '/activity/{organizationId}',
				options: handlers.list,
			},
			{
				method: 'GET',
				path: '/activity/{organizationId}/kpi',
				options: handlers.listKPI,
			},
		])
	},
	name: 'api-activity-logs',
}
