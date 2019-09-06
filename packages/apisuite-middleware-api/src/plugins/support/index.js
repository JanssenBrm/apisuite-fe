const handlers = require('./handlers')

exports = module.exports = {}

/**
 * hapi plugin with support endpoints.
 * @module plugins/support
 */

/**
 * Configuration object for support endpoints
 */
exports.plugin = {
	register: (server) => {
		// Routes
		server.route([
			{
				method: 'POST',
				path: '/support/ticket',
				options: handlers.sendTicket,
			},
		])
	},
	name: 'support',
}
