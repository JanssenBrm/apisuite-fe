const handlers = require('./handlers')

exports = module.exports = {}

/**
 * hapi plugin with newsletter endpoints.
 * @module plugins/newsletter
 */

/**
 * Configuration object for newsletter endpoints
 */
exports.plugin = {
	register: (server) => {
		// Routes
		server.route([
			{
				method: 'POST',
				path: '/newsletter/subscribe',
				options: handlers.sendNewsletterSubsciption,
			},
		])
	},
	name: 'newsletter',
}
