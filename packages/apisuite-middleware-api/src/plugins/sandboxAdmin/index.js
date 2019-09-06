const handlers = require('./handlers')

exports = module.exports = {}

/**
 * hapi plugin with sandbox endpoints.
 * @module plugins/sandboxAdmin
 */

/**
 * Configuration object for sandbox endpoints
 */
exports.plugin = {
	register: (server) => {
		// Routes
		server.route([
			{
				method: 'POST',
				path: '/organizations/{orgId}/testdata',
				options: handlers.addPSU,
			},
			{
				method: 'GET',
				path: '/testdata/form',
				options: handlers.getAccountTypes,
			},
			{
				method: 'GET',
				path: '/organizations/{orgId}/testdata',
				options: handlers.getTestData,
			},
			{
				method: 'GET',
				path: '/organizations/{orgId}/testdata/{psuId}',
				options: handlers.getPsuDetails,
			},
			{
				method: 'PUT',
				path: '/organizations/{orgId}/testdata/{psuId}',
				options: handlers.updatePSU,
			},
			{
				method: 'GET',
				path: '/organizations/{orgId}/testdata/{accountId}/transactions',
				options: handlers.getAccountTransactions,
			},
		])
	},
	name: 'organization-sandbox-admin',
}
