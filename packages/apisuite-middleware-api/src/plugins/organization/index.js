const handlers = require('./handlers')

exports = module.exports = {}

/**
 * hapi plugin with organizations endpoints.
 * @module plugins/organization
 */

/**
 * Configuration object for organization endpoints
 */
exports.plugin = {

	register: (server) => {

		// Routes
		server.route([
			{
				method: 'GET',
				path: '/organizations',
				options: handlers.listUserOrganizations,
			},
			{
				method: 'PUT',
				path: '/organizations/{id}',
				options: handlers.updateOrganization,
			},
			{
				method: 'GET',
				path: '/admin/organizations',
				options: handlers.listAllOrganizations,
			},
			{
				method: 'POST',
				path: '/admin/organizations/{organizationId}/validate',
				options: handlers.validateOrganization,
			},
			{
				method: 'GET',
				path: '/admin/organizations/{organizationId}',
				options: handlers.getOrganizationById,
			},
			// If we have 5 endpoints with base path /organizations, why are we creating /team now??
			{
				method: 'GET',
				path: '/team/{organizationId}',
				options: handlers.listOrganizationUsers,
			},
			{
				method: 'DELETE',
				path: '/team/{organizationId}/user/{userId}',
				options: handlers.removeUserFromOrganization,
			},{
				method: 'PUT',
				path: '/team/{organizationId}/user/{userId}/password',
				options: handlers.updateUserPassword,
			},
		])
	},
	name: 'appcenter-organization',
}
