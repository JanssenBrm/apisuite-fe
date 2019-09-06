const handlers = require('./handlers')

exports = module.exports = {}

/**
 * hapi plugin with rbac endpoints.
 * @module plugins/rbac
 */

/**
 * Configuration object
 */
exports.plugin = {

	register: (server) => {

		// Routes
		server.route([
			{
				method: 'POST',
				path: '/rbac/{organizationId}/user/{userId}',
				options: handlers.addUserOrganizationRole,
			},
			{
				method: 'PUT',
				path: '/rbac/{organizationId}/user/{userId}',
				options: handlers.updateUserOrganizationRole,
			},
			{
				method: 'GET',
				path: '/rbac/{organizationId}/user/{userId}',
				options: handlers.getUserOrganizationRoles,
			},
			{
				method: 'DELETE',
				path: '/rbac/{organizationId}/user/{userId}/role/{roleId}',
				options: handlers.removeUserOrganizationRole,
			},
			{
				method: 'GET',
				path: '/rbac/user',
				options: handlers.getAllUserOrganizationRoles,
			},
			{
				method: 'GET',
				path: '/rbac/roles',
				options: handlers.getExistingRoles,
			},
		])
	},
	name: 'rbac',
}
