const Boom = require('boom')
const Joi = require('joi')
const log = require('../../utils/logger')

const orgSrvc = require('../../services/organization')
const emailSrvc = require('../../services/email')
const Organization = require('../../models/Organization')

const complexityUtil = require('../../utils/complexity')
const config = require('../../config')
const userSrvc = require('../../services/user')

exports = module.exports = {}

/**
 * @memberof module:plugins/organization
 */

/**
 * GET /organizations
 */
exports.listUserOrganizations = {
	id: 'appcenter-list-organizations',
	description: 'Returns a list of organizations',
	notes: ['Returns user organizations'],
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
	auth: {
		strategy: 'appcenterToken',
	},
	handler: async (request) => {
		const userOrganizations = await orgSrvc.listUserOrganizations(request.auth.artifacts.user.get('id'))
		return userOrganizations
	},
}

/**
 * PUT /organizations/{id}
 */
exports.updateOrganization = {
	id: 'appcenter-update-organizations',
	description: 'Updates an organizations',
	notes: ['Updates user organizations'],
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
	auth: {
		strategy: 'appcenterToken',
	},
	validate: {
		params: {
			id: Joi.number()
				.integer()
				.required()
				.example(12345),
		},
		payload: {
			name: Joi.string()
				.allow(null)
				.example('BNP'),
			vat: Joi.string()
				.allow(null)
				.example('123456789'),
			website: Joi.string()
				.allow(null)
				.example('https://www.bnp.com'),
			description: Joi.string()
				.allow(null)
				.example('My company rocks!'),
			policyUrl: Joi.string()
				.allow(null)
				.example('https://www.bnp.com/policy'),
			logoUrl: Joi.string()
				.allow(null)
				.example('https://www.bnp.com/logo.img'),
			state: Joi.string()
				.valid('INTERNAL', 'TRUSTED', 'NON_TRUSTED', 'NON_VALIDATED')
				.example('NON_VALIDATED'),
		},
	},
	handler: async (request) => {
		try {
			// Check if user belongs to the organization he is trying to update
			await orgSrvc.getUserOrganization(request.auth.artifacts.user.get('id'), request.params.id)
		} catch (error) {
			log.warn(error, 'Organization not in user orgs list')
			return Boom.notFound()
		}

		const updatedOrganization = await orgSrvc.updateOrganization(request.params.id, {
			name: request.payload.name,
			vat_number: request.payload.vat,
			website: request.payload.website,
			description: request.payload.description,
			policy_url: request.payload.policyUrl,
			logo_url: request.payload.logoUrl,
		})

		return updatedOrganization.toJSON()
	},
}

/**
 * GET /admin/organizations
 */
exports.listAllOrganizations = {
	id: 'appcenter-admin-list-organizations',
	description: 'Returns a list of organizations',
	notes: ['Returns organizations'],
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
			page: Joi.number().integer()
				.min(1)
				.default(1),
			pageSize: Joi.number().integer()
				.positive()
				.default(20),
			state: Joi.string()
				.optional(),
		},
	},
	auth: {
		strategy: 'appcenterToken',
		scope: 'admin',
	},
	handler: async (request) => {
		const { pageSize, page, state } = request.query

		try {
			const options = {
				pageSize,
				page,
				state: state ? state.split(';') : Organization.states(),
			}

			return await orgSrvc.listOrganizationsWithUsers(options)
		} catch (error) {
			log.error(error)
			throw Boom.internal(error.message)
		}
	},
}

/**
 * POST /admin/organizations/{organizationId}/validate
 */
exports.validateOrganization = {
	id: 'appcenter-admin-organization-validate',
	description: 'Update the state of an organization',
	notes: ['Returns the updated organization'],
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
			organizationId: Joi.number().integer()
				.positive()
				.required(),
		},
	},
	auth: {
		strategy: 'appcenterToken',
		scope: 'admin',
	},
	handler: async (request) => {
		try {
			// Validates an organization changing its state
			const organization = await orgSrvc.updateOrganization(request.params.organizationId, { state: 'NON_TRUSTED' })

			// Notify the user that the organization was approved
			try {
				const organization = await orgSrvc.getOrganization({ id: request.params.organizationId })
				let user = organization.related('users').serialize().shift()
				await emailSrvc.notifyUserOfOrganizationApproval(user, organization.toJSON())
			} catch (err) {
				// if the above fails don't break the flow
				log.error('[User notification failed]', err)
			}

			return organization
		} catch (error) {
			log.error(error)
			throw Boom.internal(error.message)
		}
	},
}

/**
 * GET /admin/organizations/{organizationId}
 */
exports.getOrganizationById = {
	id: 'appcenter-admin-organization-get',
	description: 'Retrieves an organization given its id',
	notes: ['Returns the organization'],
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
			organizationId: Joi.number().integer()
				.positive()
				.required(),
		},
	},
	auth: {
		strategy: 'appcenterToken',
		scope: 'admin',
	},
	handler: async (request) => {
		const organization = await orgSrvc.getOrganization({ id: request.params.organizationId })

		if (!organization) throw Boom.notFound()

		return {
			...organization.toJSON(),
			users: organization.related('users').map(user => ({
				...user.toJSON(),
				role: user.pivot.get('role'),
			})),
		}
	},
}


/**
 * GET /team/{organizationId}
 */
exports.listOrganizationUsers = {
	id: 'appcenter-list-organization-users',
	description: 'Returns a list of organization users',
	notes: ['Returns organization users'],
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
	auth: {
		strategy: 'appcenterToken',
	},
	handler: async (request) => {
		const result = await orgSrvc.listOrganizationUsers(request.params.organizationId)
		return result
	},
}


/**
 * DELETE /team/{organizationId}/user/{userId}
 */
exports.removeUserFromOrganization = {
	id: 'appcenter-remove-organization-user',
	description: 'Removes a user from an organization',
	notes: ['Returns true is removed organization user successfuly'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'204': { 'description': 'No Content' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
		'openbank-rbac': {
			roles: ['ADMIN'],
			mode: 'exactly',
		},
	},
	auth: {
		strategy: 'appcenterToken',
	},
	handler: async (request, h) => {
		
		try {
			const { userId, organizationId } = request.params
			if (!await orgSrvc.canRemoveUser(userId, organizationId)) {
				return Boom.preconditionFailed('User cannot be removed from organization.')
			}
			await orgSrvc.removeUserFromOrganization(userId, organizationId)
			return h.response().code(204)			
		} catch (error) {
			log.error(error)
			throw Boom.internal(error)
		}
	},
}


/**
 * PUT /team/{organizationId}/user/{userId}/password
 */
exports.updateUserPassword = {
	id: 'appcenter-team-update-password',
	description: 'Updated the user password',
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
		'openbank-rbac': {
			roles: ['ADMIN'],
			mode: 'exactly',
		},
	},
	validate: {
		payload: {
			password: Joi.string().required().example('P455w0rd'),
		},
	},
	auth: {
		strategy: 'appcenterToken',
	},
	pre: [
		{
			method: async (request) => {
				let pwdErrors = complexityUtil.validate(request.payload.password, config.get('pwdComplexity'))

				if (pwdErrors.length > 0) {
					log.error(pwdErrors)
					throw Boom.badRequest(pwdErrors)
				}

				return null
			},
		},
	],
	handler: async (request, h) => {
		const { password } = request.payload
		const { userId, organizationId } = request.params

		// check if user belong to organization
		if (!await orgSrvc.areUsersInOrg(request.auth.artifacts.user.get('id'), userId, organizationId)) {
			throw Boom.preconditionFailed('Users are not in the same organization.')
		}

		try {
			await userSrvc.recoverPassword(userId, password)
		} catch (error) {
			log.error(error)
			throw Boom.internal(error)
		}

		return h.response().code(204)
	},
}
