const Joi = require('joi')
const Boom = require('boom')
const Logger = require('../../utils/logger')
const userSrvc = require('../../services/user')
exports = module.exports = {}

/**
 * @memberof module:plugins/rbac
 */

/**
 * POST /rbac/{organizationId}/user/{userId}
 */
exports.addUserOrganizationRole = {
	id: 'apisuite-rbac-add-role',
	description: 'Adds a role to the user on the given organization',
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'201': { 'description': 'Created' },
				'404': { 'description': 'Not Found' },
				'400': { 'description': 'Bad Request' },
				'403': { 'description': 'Forbidden' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
		'apisuite-rbac': {
			roles: ['ADMIN'],
			mode: 'oneOf',
		},
	},
	validate: {
		payload: {
			roleId: Joi.number().required(),
		},
	},
	handler: async (request, h) => {

		const { roleId } = request.payload
		const { userId, organizationId } = request.params

		try {
			await userSrvc.addUserOrganizationRole(userId, organizationId, roleId)
		} catch (error) {
			Logger.error(error)
			return Boom.internal(error)
		}

		return h.response().code(201)

	},
}

/**
 * PUT /rbac/{organizationId}/user/{userId}
 */
exports.updateUserOrganizationRole = {
	id: 'apisuite-rbac-update-role',
	description: 'Adds a role to the user on the given organization',
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'OK' },
				'404': { 'description': 'Not Found' },
				'400': { 'description': 'Bad Request' },
				'403': { 'description': 'Forbidden' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
		'apisuite-rbac': {
			roles: ['ADMIN'],
			mode: 'oneOf',
		},
	},
	validate: {
		payload: {
			oldRoleId: Joi.number().required(),
			newRoleId: Joi.number().required(),
		},
	},
	auth: {
		strategy: 'appcenterToken',
	},
	handler: async (request, h) => {
		const { oldRoleId, newRoleId } = request.payload
		const { userId, organizationId } = request.params

		// VALIDATE THE TARGET USER
		try {
			await userSrvc.canUpdateUserRole(userId, organizationId, newRoleId)
		} catch (error) {
			Logger.debug(error, 'Cannot update user role.')
			throw Boom.preconditionFailed('Cannot update user role.')
		}

		let userRoleId

		try {
			userRoleId = await userSrvc.getUserRole(userId, organizationId, oldRoleId)
		} catch (error) {
			Logger.error(error)
			throw Boom.internal(error)
		}

		if (!userRoleId) {
			Logger.debug('User Role Organization not found with the given parameters')
			throw Boom.notFound('User Role Organization not found with the given parameters')
		}

		try {
			await userSrvc.updateUserOrganizationRole(userRoleId.get('id'), newRoleId)
		} catch (error) {
			Logger.error(error)
			return Boom.internal(error)
		}

		return h.response().code(200)

	},
}

/**
 * GET /rbac/{organizationId}/user/{userId}
 */
exports.getUserOrganizationRoles = {
	id: 'apisuite-rbac-get-organization-role',
	description: 'Adds a role to the user on the given organization',
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'OK' },
				'404': { 'description': 'Not Found' },
				'400': { 'description': 'Bad Request' },
				'403': { 'description': 'Forbidden' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
		'apisuite-rbac': {
			roles: ['ADMIN'],
			mode: 'oneOf',
		},
	},
	auth: {
		strategy: 'appcenterToken',
	},
	handler: async (request, h) => {
		const { organizationId, userId } = request.params

		let retval
		try {
			retval = await userSrvc.getUserOrganizationRoles(userId, organizationId)
		} catch (error) {
			Logger.error(error)
			return Boom.internal(error)
		}

		if (!retval) {
			Logger.debug('No roles were found')
			return Boom.notFound()
		}

		return h.response(retval).code(200)
	},
}

/**
 * GET /rbac/user/{userId}
 */
exports.getAllUserOrganizationRoles = {
	id: 'apisuite-rbac-all-roles',
	description: 'Adds a role to the user on the given organization',
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'OK' },
				'404': { 'description': 'Not Found' },
				'400': { 'description': 'Bad Request' },
				'403': { 'description': 'Forbidden' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
	},
	auth: {
		strategy: 'appcenterToken',
	},
	handler: async (request, h) => {
		const userId  = request.auth.credentials.user.get('id')

		try {
			const result = await userSrvc.getAllUserOrganizationRoles(userId)
			const retval = result.toJSON()

			if (!retval) {
				Logger.debug('No roles were found')
				return Boom.notFound()
			}

			return h.response(retval).code(200)
		} catch (error) {
			Logger.error(error)
			return Boom.internal(error)
		}

	},
}

/**
 * DELETE /rbac/{organizationId}/user/{userId}/role/{roleId}
 */
exports.removeUserOrganizationRole = {
	id: 'apisuite-rbac-remove-role',
	description: 'Removes a role to the user on the given organization',
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'OK' },
				'404': { 'description': 'Not Found' },
				'400': { 'description': 'Bad Request' },
				'403': { 'description': 'Forbidden' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
		'apisuite-rbac': {
			roles: ['ADMIN'],
			mode: 'oneOf',
		},
	},
	auth: {
		strategy: 'appcenterToken',
	},
	handler: async (request, h) => {
		const { userId, organizationId, roleId } = request.params

		let userRoleId

		try {
			userRoleId = await userSrvc.getUserRole(userId, organizationId, roleId)
		} catch (error) {
			Logger.error(error)
			throw Boom.internal(error)
		}

		if (!userRoleId) {
			Logger.debug('User Role Organization not found with the given parameters')
			throw Boom.notFound('User Role Organization not found with the given parameters')
		}

		try {
			await userSrvc.removeUserOrganizationRole(userRoleId.get('id'))
		} catch (error) {
			Logger.error(error)
			return Boom.internal(error)
		}

		return h.response().code(200)
	},
}

/**
 * GET /rbac/roles
 */
exports.getExistingRoles = {
	id: 'apisuite-rbac-existing-roles',
	description: 'Lists the available roles',
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'OK' },
				'404': { 'description': 'Not Found' },
				'400': { 'description': 'Bad Request' },
				'403': { 'description': 'Forbidden' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
		'apisuite-rbac': {
			roles: ['ADMIN'],
			mode: 'oneOf',
		},
	},
	auth: {
		strategy: 'appcenterToken',
	},
	handler: async (request, h) => {

		let retval
		try {
			retval = await userSrvc.getExistingRoles()
		} catch (error) {
			Logger.error(error)
			return Boom.internal(error)
		}

		if (!retval) {
			Logger.debug('No roles were found')
			return Boom.notFound()
		}

		return h.response(retval.toJSON()).code(200)
	},
}
