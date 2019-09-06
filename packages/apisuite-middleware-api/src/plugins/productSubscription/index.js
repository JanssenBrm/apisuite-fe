const handlers = require('./handlers')

exports = module.exports = {}

/**
 * hapi plugin with organization product subscriptions endpoints.
 * @module plugins/productSubscriptions
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
				path: '/organizations/{orgId}/products',
				options: handlers.listOrganizationSubscriptions,
			},
			{
				method: 'POST',
				path: '/organizations/{orgId}/products',
				options: handlers.createOrganizationSubscriptions,
			},
		])
	},
	name: 'product-subscriptions',
}
