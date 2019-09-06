const Joi = require('joi')
const log = require('../../utils/logger')
const Boom = require('boom')

// Services
const orgContainerService = require('../../services/organizationContainer')

exports = module.exports = {}

/**
 * @memberof module:plugins/organizationContianer
 */

/**
 * Handler for POST /organization_containers endpoint
 */
exports.createOrgContainer = {
	id: 'organization-containers-create',
	description: 'Creates a new organization container',
	notes: ['Insert a new container reference in database'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'201': { 'description': 'Created' },
				'400': { 'description': 'Bad Request' },
				'409': { 'description': 'Conflict' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
	},
	auth: {
		strategy: 'authServerToken',
		scope: 'internal',
	},
	validate: {
		payload: Joi.object({
			name: Joi.string()
				.required()
				.description('Container name')
				.example('00eead4e-ecc5-11e8-8eb2-f2801f1b9fd1'),
			organizationId: Joi.number().integer().positive()
				.required()
				.description('Id of the organization owner of the app')
				.example(12345),
		}).label('containerData'),
	},
	handler: async (request, h) => {
		try {
			const orgContainer = await orgContainerService.create({
				name: request.payload.name,
				organization_id: request.payload.organizationId,
			})

			return h.response(orgContainer.toJSON()).code(201)
		} catch (error) {
			log.warn({ error }, 'Failed to create org container')
			if(error.code === 'ER_DUP_ENTRY')
				return Boom.conflict('Org already has a container')

			return Boom.internal()
		}
	},
}

/**
 * Handler for GET /organization_containers endpoint
 */
exports.getOrgContainer = {
	id: 'organization-containers-get',
	description: 'Get organization container',
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'OK' },
				'400': { 'description': 'Bad Request' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
	},
	auth: {
		strategy: 'authServerToken',
		scope: 'internal',
	},
	validate: {
		query: {
			org_id: Joi.number().integer()
				.positive()
				.required(),
		},
	},
	handler: async (request) => {
		try {
			return await orgContainerService.getContainerByOrganization(request.query.org_id, { require: false })
		} catch (error) {
			log.warn({ error }, 'Failed to retrieve org container')
			return Boom.internal()
		}
	},
}
