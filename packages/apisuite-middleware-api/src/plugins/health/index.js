const handlers = require('./handlers')

exports = module.exports = {}

/**
 * hapi plugin with health endpoint. Can be used for load balancing purposes.
 * @module plugins/health
 */

/** Configuration object for health endpoint */
exports.plugin = {
	register: (server) => {
		server.route([
			{
				method: 'GET',
				path: '/healthcheck',
				options: handlers.healthCheck,
			},
		])
	},
	name: 'appcenter-health',
}
