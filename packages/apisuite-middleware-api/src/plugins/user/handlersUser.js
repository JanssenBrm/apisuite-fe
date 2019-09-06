const boom = require('boom')
const joi = require('joi')
const config = require('../../config')
const log = require('../../utils/logger')

const userSrvc = require('../../services/user')
const emailService = require('../../services/email')
const orgSrvc = require('../../services/organization')

exports = module.exports = {}

/**
 * @memberof module:plugins/user
 */

/**
 * GET /users/confirmation_ticket handler
 * Activates an user
 */
exports.activateUser = {
	id: 'appcenter-user-account-confirmation',
	description: 'Confirms user account and email',
	notes: ['Searches user by invitation token, updates user table enabling the activation property. \
		Deletes the invitation.'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			responses: {
				301: { description: 'Moved Permanently' },
			},
		},
	},
	validate: {
		query: {
			ac: joi.string().guid({ version: ['uuidv4'] }).required()
				.description('The activation code')
				.example('7a7fd199-e2c8-408b-a8f8-79a0d77372b2'),
		},
	},
	pre: [

		// Retrieve the ticket
		{
			assign: 'activationTicket',
			method: async (request) => {
				return await userSrvc.getUserAccountActivationTicket(request.query.ac)
			},
			failAction: async (request, h) => {
				return h.redirect(config.get('appcenter').url)
			},
		},

		// Make sure the bound user exists
		{
			assign: 'user',
			method: async (request) => {
				return await userSrvc.getByID(request.pre.activationTicket.get('user_id'))
			},
			failAction: async (request, h) => {
				return h.redirect(config.get('appcenter').url)
			},
		},
	],
	handler: async (request, h) => {
		if (!request.pre.activationTicket || !request.pre.user)
			return h.redirect(config.get('appcenter').url)

		// Tag user as activated
		await userSrvc.activateUserAccount(request.pre.activationTicket.get('id'), request.pre.user.id)

		// Notify the admin to can approve user organization
		try {
			const userOrgs = await orgSrvc.listUserOrganizations(request.pre.user.id)
			const org = userOrgs.shift()
			await emailService.notifyAdminToApproveOrganization(org)
		} catch (err) {
			// if the above fails don't break the flow
			log.error('[Admin notification failed]', err)
		}


		// redirect to dashboard
		return h.redirect(config.get('appcenter').url + '/dashboard')
	},
}

/** handler for POST /users/send_activation endpoint */
exports.sendActivationEmail = {
	auth: {
		strategy: 'appcenterToken',
	},
	validate: {
		options: {
			stripUnknown: {
				objects: true,
			},
		},
	},
	handler: async (request, h) => {

		// Generate activation code
		const userActivationTicket = await userSrvc.generateUserActivationTicket(request.auth.artifacts.user.get('id'))

		// Send activation code over email
		await emailService.sendUserAccountActivationCode(request.auth.artifacts.user.get('email'), userActivationTicket.get('activation_code'))

		return h.response().code(200)
	},
	id: 'appcenter-user-send-activation-email',
	description: 'Send an activation email',
	notes: ['Send an email to activate a user'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'OK' },
				'400': { 'description': 'Bad Request' },
			},
		},
	},
}

/**
 * Handler for GET /admin/users endpoint
 */
exports.usersGetAll = {
	id: 'ob-admin-users-get-all',
	description: 'Returns a list of users',
	notes: ['Returns users'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'Ok' },
				'400': { 'description': 'Bad Request' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
	},
	validate: {
		query: {
			page: joi.number().integer()
				.min(1)
				.default(1),
			pageSize: joi.number().integer()
				.positive()
				.default(20),
		},
	},
	auth: {
		strategy: 'appcenterToken',
		scope: 'admin',
	},
	handler: async (request) => {
		const { pageSize, page } = request.query
		const options = {
			pageSize,
			page,
		}

		const users = await userSrvc.getUsersWithScopes(options)

		return users
	},
}

/**
 * Handler for POST /admin/users/{userId}/grant
 */
exports.userGrantAdmin = {
	id: 'ob-admin-users-grant',
	description: 'Grants admin access to a user',
	notes: ['Grants admin access to a user'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'Ok' },
				'400': { 'description': 'Bad Request' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
	},
	validate: {
		params: {
			userId: joi.number().integer(),
		},
	},
	auth: {
		strategy: 'appcenterToken',
		scope: 'admin',
	},
	pre: [{
		assign: 'user',
		method: async (request) => {
			const user = await userSrvc.findUser({ id: request.params.userId })

			if (!user) throw boom.notFound(`user ${request.params.userId} not found`)

			return user
		},
	}],
	handler: async (request) => {
		const user = userSrvc.userGrantAdmin(request.params.userId)

		return user
	},
}

/**
 * Handler for POST /admin/users/{userId}/revoke
 */
exports.userRevokeAdmin = {
	id: 'ob-admin-users-revoke',
	description: 'Revokes admin access to a user',
	notes: ['Revokes admin access to a user'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'Ok' },
				'400': { 'description': 'Bad Request' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
	},
	validate: {
		params: {
			userId: joi.number().integer(),
		},
	},
	auth: {
		strategy: 'appcenterToken',
		scope: 'admin',
	},
	pre: [{
		assign: 'user',
		method: async (request) => {
			const user = await userSrvc.findUser({ id: request.params.userId })

			if (!user) throw boom.notFound(`user ${request.params.userId} not found`)

			return user
		},
	}],
	handler: async (request) => {
		const user = userSrvc.userRevokeAdmin(request.params.userId)

		return user
	},
}

/** handler for DELETE /admin/users/{userId} endpoint */
exports.userDeleteAdmin = {
	id: 'ob-admin-users-delete',
	description: 'delete a user and all it\'s related data',
	notes: ['cascade delete the user'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'204': { 'description': 'No Content' },
				'401': { 'description': 'Unauthorized' },
				'500': { 'description': 'Internal error' },
			},
		},
	},
	validate: {
		params: {
			userId: joi.number().integer()
				.positive()
				.required(),
		},
	},
	auth: {
		strategy: 'appcenterToken',
		scope: 'admin',
	},
	pre: [{
		assign: 'user',
		method: async (request) => {
			const user = await userSrvc.findUser({ id: request.params.userId })

			if (!user) throw boom.notFound(`user ${request.params.userId} not found`)

			return user
		},
	}],
	handler: async (request, h) => {
		await userSrvc.deleteUserByID(request.params.userId)
			.catch((error) => {
				log.error(error, 'Failed to delete user')
				throw boom.internal()
			})

		return h.response().code(204)
	},
}
