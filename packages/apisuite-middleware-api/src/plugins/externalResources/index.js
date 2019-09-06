const handlers = require('./handlers')

exports = module.exports = {}

/**
 * hapi plugin with external-resources endpoint. Can be used for load balancing purposes.
 * @module plugins/api-docs
 */

/** Configuration object for external-resources endpoint */
exports.plugin = {
	register: (server) => {
		server.route([
			{
				method: 'GET',
				path: '/external-resources',
				options: handlers.getExternalResources,
			},
			{
				method: 'POST',
				path: '/github-hook',
				options: handlers.githubHook,
			},
		])
	},
	name: 'appcenter-external-resources',
}
