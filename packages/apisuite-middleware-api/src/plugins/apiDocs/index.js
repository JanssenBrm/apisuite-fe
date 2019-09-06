const handlers = require('./handlers')

exports = module.exports = {}

/**
 * hapi plugin with api-docs endpoint. Can be used for load balancing purposes.
 * @module plugins/api-docs
 */

/** Configuration object for api-docs endpoint */
exports.plugin = {
	register: (server) => {
		server.route([
			{
				method: 'GET',
				path: '/api-docs/{brand}/{productId}/{role}/{version}',
				options: handlers.getApiDocs,
			},
			{
				method: 'POST',
				path: '/api-management/status',
				options: handlers.getApiStatus,
			},
		])
	},
	name: 'appcenter-api-docs',
}
