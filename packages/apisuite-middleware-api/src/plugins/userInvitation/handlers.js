const Boom = require('boom')
const Joi = require('joi')

const userSrvc = require('../../services/user')
const orgSrvc = require('../../services/organization')
const userInvitationSrvc = require('../../services/userInvitation')
const emailSrvc = require('../../services/email')

const log = require('../../utils/logger')

exports = module.exports = {}

/**
 * @memberof module:plugins/userInvitation
 */

/**
 * POST /organizations/{organivationId}/invitations
 */
exports.inviteUserToOrganization = {
	id: 'appcenter-users-rinvitation',
	description: 'Creates a user invitation',
	tags: ['api'],
	auth: {
		strategy: 'appcenterToken',
	},
	plugins: {
		'apisuite-rbac': {
			roles: ['ADMIN'],
			mode: 'hierarchy',
		},
	},
	validate: {
		params: {
			organizationId: Joi.number()
				.integer()
				.required()
				.example(12345),
		},
		payload: {
			email: Joi.string().email()
				.required()
				.example('john@doe.com'),
			name: Joi.string()
				.example('John Doe'),
			role: Joi.number().integer()
				.required()
				.example(1),
		},
	},
	pre: [
		// Validates organization belongs to requester
		{
			assign: 'organization',
			method: async (request) => {
				const organization = await orgSrvc.getUserOrganization(request.auth.artifacts.user.get('id'), request.params.organizationId)
				if (!organization || organization.related('users').length === 0) throw Boom.forbidden()
				return organization
			},
		},
	],
	handler: async (request) => {
		// Retrieve invited user by email
		const invitedUser = await userSrvc.findUser({ email: request.payload.email })

		const invitationData = {
			email: request.payload.email,
			organization_id: request.params.organizationId,
			role_id: request.payload.role,
			user_name: request.payload.name,
		}

		if (invitedUser) {
			invitationData.user_id = invitedUser.get('id')

			// If user exists, check if he is in org already
			const organization = await orgSrvc.getUserOrganization(invitedUser.get('id'), request.params.organizationId)

			if (organization && organization.related('users').length)
				throw Boom.conflict('User already belongs to that organization')
		}

		// Create invitation ticket
		const invitationTicket = await userInvitationSrvc.createInvitationTicket(invitationData)
		log.debug({ invitationTicket }, 'Invitation created')

		// Send invitation mail
		await emailSrvc.sendUserInvitationLink(invitationTicket.get('invitation_code'), request.payload.email)

		return invitationTicket
	},
}

/**
 * GET /organizations/{organivationId}/invitations
 */
exports.getOrganizationInvitations = {
	id: 'appcenter-get-org-invitations',
	description: 'Retrieves organization invitations',
	tags: ['api'],
	auth: {
		strategy: 'appcenterToken',
	},
	plugins: {
		'apisuite-rbac': {
			roles: ['ADMIN'],
			mode: 'hierarchy',
		},
	},
	validate: {
		params: {
			organizationId: Joi.number()
				.integer()
				.required()
				.example(12345),
		},
	},
	pre: [
		// Validates organization belongs to requester
		{
			assign: 'organization',
			method: async (request) => {
				const organization = await orgSrvc.getUserOrganization(request.auth.artifacts.user.get('id'), request.params.organizationId)
				if (!organization || organization.related('users').length === 0) throw Boom.forbidden()
				return organization
			},
		},
	],
	handler: async (request) => {
		// Retrieve invited user by email
		const invitations = await userInvitationSrvc.getOrganizationTickets(request.params.organizationId)
		return invitations.toJSON({ hidden: ['invitation_code'] })
	},
}

/**
 * POST /invitations/{invitationToken}/accept
 */
exports.acceptInvitation = {
	id: 'appcenter-accept-invitation',
	description: 'Accepts an invitation',
	tags: ['api'],
	validate: {
		params: {
			invitationToken: Joi.string()
				.required()
				.example('MYINVITATIONTOKEN12345'),
		},
	},
	handler: async (request, h) => {
		try {
			const invitation = await userInvitationSrvc.getInvitationTicketByToken(request.params.invitationToken, { withRelated: ['user'] })
			const user = invitation.related('user')

			// Add org to user
			await user.organizations().attach({ organization_id: invitation.get('organization_id'), role: invitation.get('role') })

			// Update rbac
			await userSrvc.addUserOrganizationRole(user.get('id'), invitation.get('organization_id'), 1)

			// Delete invitation
			await userInvitationSrvc.deleteInvitationTicket(invitation.get('id'))

			return h.response().code(200)
		} catch (e) {
			log.warn(e, 'An error occurred while accepting invitation')
			return Boom.badRequest()
		}
	},
}

/**
 * POST /invitations/{invitationToken}/postpone
 */
exports.postponeInvitation = {
	id: 'appcenter-postpone-invitation',
	description: 'Postpones an invitation',
	tags: ['api'],
	validate: {
		params: {
			invitationToken: Joi.string()
				.required()
				.example('MYINVITATIONTOKEN12345'),
		},
	},
	handler: async (request, h) => {
		try {
			let invitation = await userInvitationSrvc.getInvitationTicketByToken(request.params.invitationToken)
			await userInvitationSrvc.postponeInvitation(invitation.get('id'))

			return h.response().code(204)
		} catch (e) {
			log.warn(e, 'An error occurred while postponing invitation')
			return Boom.badRequest()
		}
	},
}

/**
 * DELETE /organizations/{orgId}/invitations/{{invitationId}
 */
exports.deleteOrganizationInvitation = {
	id: 'appcenter-delete-invitation',
	tags: ['api'],
	auth: {
		strategy: 'appcenterToken',
	},
	plugins: {
		'apisuite-rbac': {
			roles: ['ADMIN'],
			mode: 'hierarchy',
		},
	},
	validate: {
		params: {
			organizationId: Joi.number().integer()
				.required()
				.example(123456),
			invitationId: Joi.number().integer()
				.required()
				.example(123456),
		},
	},
	handler: async (request, h) => {
		// Delete invitation

		try {
			await userInvitationSrvc.deleteInvitationTicket(request.params.invitationId)

			return h.response().code(204)
		} catch (error) {
			log.warn({ error }, 'Failed to delete invitation ticket')
			throw Boom.badRequest()
		}
	},
}

/**
 * GET /invitations/{invitationToken}
 */
exports.getInvitation = {
	id: 'appcenter-get-invitation',
	description: 'Returns an invitation',
	tags: ['api'],
	validate: {
		params: {
			invitationToken: Joi.string()
				.required()
				.example('MYINVITATIONTOKEN12345'),
		},
	},
	handler: async (request) => {
		try {
			let invitation = await userInvitationSrvc.getInvitationTicketByToken(request.params.invitationToken, { withRelated: ['user', 'organization'] })

			return {
				invitationCode: invitation.get('invitation_code'),
				email: invitation.get('email'),
				user_name: invitation.get('user_name'),
				organization_name: invitation.related('organization').get('name'),
				isRegistered: !!(invitation.related('user') && invitation.related('user').get('password')),
				expiresAt: invitation.get('expiration_date'),
			}

		} catch (e) {
			log.warn({ error: e }, 'Failed to retrieve user invitation')
			throw Boom.badRequest()
		}
	},
}
