const handlers = require('./handlers')

exports = module.exports = {}

/**
 * hapi plugin with userInvitation endpoints.
 * @module plugins/userInvitation
 */

/**
 * Configuration object for user endpoints
 */
exports.plugin = {

	register: (server) => {

		// Routes
		server.route([
			{
				method: 'POST',
				path: '/organizations/{organizationId}/invitations',
				options: handlers.inviteUserToOrganization,
			},
			{
				method: 'GET',
				path: '/organizations/{organizationId}/invitations',
				options: handlers.getOrganizationInvitations,
			},
			{
				method: 'DELETE',
				path: '/organizations/{organizationId}/invitations/{invitationId}',
				options: handlers.deleteOrganizationInvitation,
			},
			{
				method: 'GET',
				path: '/invitations/{invitationToken}',
				options: handlers.getInvitation,
			},
			{
				method: 'POST',
				path: '/invitations/{invitationToken}/accept',
				options: handlers.acceptInvitation,
			},
			{
				method: 'POST',
				path: '/invitations/{invitationToken}/postpone',
				options: handlers.postponeInvitation,
			},
		])
	},
	name: 'appcenter-user-invitation',
}
