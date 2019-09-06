const handlers = require('./handlers')

exports = module.exports = {}

/**
 * hapi plugin with app endpoints.
 * @module plugins/app
 */

/** Configuration object for app endpoints */
exports.plugin = {
	register: (server) => {
		server.route([
			{
				method: 'POST',
				path: '/organizations/{organizationId}/sandbox-apps',
				options: handlers.createOrganizationSandboxApp,
			},
			{
				method: 'GET',
				path: '/organizations/{organizationId}/sandbox-apps',
				options: handlers.listOrganizationSandboxApps,
			},
			{
				method: 'PUT',
				path: '/organizations/{organizationId}/sandbox-apps/{appId}',
				options: handlers.updateOrganizationSandboxApp,
			},
			{
				method: 'GET',
				path: '/organizations/{organizationId}/sandbox-apps/{appId}',
				options: handlers.getOrganizationSandboxApp,
			},
			{
				method: 'DELETE',
				path: '/organizations/{organizationId}/sandbox-apps/{appId}',
				options: handlers.deleteOrganizationSandboxApp,
			},
		])
	},
	name: 'organization-sandbox-apps',
}
