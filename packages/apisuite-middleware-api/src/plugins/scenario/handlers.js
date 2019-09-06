const Joi = require('joi')
const Boom = require('boom')
const qs = require('qs')

const log = require('../../utils/logger')
const scenarioSrvc = require('../../services/scenario')


exports = module.exports = {}

/**
 * @memberof module:plugins/scenario
 */

/**
 * GET /admin/scenarios
 */
exports.scenarioGetAll = {
	id: 'appcenter-admin-scenario-list',
	description: 'Returns a list of scenarios',
	notes: ['Returns scenarios'],
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
		},
	},
	auth: {
		strategy: 'appcenterToken',
		scope: 'admin',
	},
	handler: async (request) => {
		const { pageSize, page } = request.query

		try {

			return await scenarioSrvc.scenarioGetAll(page, pageSize)
		} catch (error) {
			log.error(error)
			throw Boom.internal(error.message)
		}
	},
}

/**
 * GET /scenarios
 */
exports.scenariosFiltered = {
	id: 'appcenter-scenarios-filtered',
	description: 'Returns a list of scenarios that are published',
	notes: ['Returns published scenarios'],
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
			page: Joi.number().integer(),
			pageSize: Joi.number().integer(),
		},
		options: {
			allowUnknown: true,
		},
	},
	auth: {
		strategy: 'appcenterToken',
	},
	handler: async (request) => {
		const { page, pageSize } = request.query
		const queryParsed = qs.parse(request.query)

		try {
			const options = {
				...(page && { page }),
				...(pageSize && { pageSize }),
				...(queryParsed.endpoints && queryParsed.endpoints.length > 0 && { endpoints: queryParsed.endpoints }),
				state: 'PUBLISHED',
			}

			return await scenarioSrvc.scenarioGetFiltered(options)
		} catch (error) {
			log.error(error)
			throw Boom.internal(error.message)
		}
	},
}

/**
 * GET /scenarios/{scenarioId}
 */
exports.scenarioGetOne = {
	id: 'appcenter-admin-scenario-get-one',
	description: 'Returns a scenario',
	notes: ['Returns scenario'],
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
			scenarioId: Joi.string().required(),
		},
	},
	auth: {
		strategy: 'appcenterToken',
	},
	handler: async (request) => {
		try {
			return await scenarioSrvc.scenarioGetOne(request.params.scenarioId)
		} catch (error) {
			log.error(`Failed to get scenario ${request.params.scenarioId}`)
			throw Boom.badRequest(`Failed to get scenario ${request.params.scenarioId}`)
		}
	},
}

/**
 * POST /admin/scenarios
 */
exports.scenarioCreate = {
	id: 'appcenter-admin-scenario-create',
	description: 'Creates a scenario',
	notes: ['Create scenario'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'201': { 'description': 'Created' },
				'400': { 'description': 'Bad Request' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
	},
	validate: {
		payload: {
			scenario: Joi.object().keys({
				title: Joi.string().required(),
				scenario: Joi.string().allow(null).optional(),
				response_code: Joi.number().required(),
				response_body: Joi.string().allow(null).optional(),
				endpoints: Joi.array().items(Joi.number()).optional(),
			}),
		},
	},
	auth: {
		strategy: 'appcenterToken',
		scope: 'admin',
	},
	handler: async (request) => {
		try {
			return await scenarioSrvc.scenarioCreate(request.payload.scenario)
		} catch (error) {
			log.error('Failed to create scenario')
			throw Boom.badRequest('Failed to create scenario')
		}
	},
}

/**
 * PUT /admin/scenarios/{scenarioId}
 */
exports.scenarioUpdate = {
	id: 'appcenter-admin-scenario-update',
	description: 'Updates a scenario',
	notes: ['Update scenario'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'202': { 'description': 'Accepted' },
				'400': { 'description': 'Bad Request' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
	},
	validate: {
		payload: {
			scenario: Joi.object().keys({
				title: Joi.string().allow(null).optional(),
				scenario: Joi.string().allow(null).optional(),
				response_code: Joi.number().allow(null).optional(),
				response_body: Joi.string().allow(null).optional(),
				endpoints: Joi.array().items(Joi.number()).optional(),
				state: Joi.string().valid('UNPUBLISHED', 'PUBLISHED').example('PUBLISHED').optional(),
			}),
		},
		params: {
			scenarioId: Joi.string().required(),
		},
	},
	auth: {
		strategy: 'appcenterToken',
		scope: 'admin',
	},
	handler: async (request) => {
		const { scenario } = request.payload
		const { scenarioId } = request.params

		try {
			return await scenarioSrvc.scenarioUpdate(scenarioId, scenario)
		} catch (error) {
			log.error(`Failed to update scenario ${scenarioId}`)
			throw Boom.badRequest(`Failed to update scenario ${scenarioId}`)
		}
	},
}

/**
 * POST /admin/scenarios/{scenarioId}/publish
 */
exports.scenarioPublish = {
	id: 'appcenter-admin-scenario-publish',
	description: 'Publishes a scenario, updating its state',
	notes: ['Returns the published scenario'],
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
			scenarioId: Joi.string().required(),
		},
	},
	auth: {
		strategy: 'appcenterToken',
		scope: 'admin',
	},
	handler: async (request) => {
		try {
			// Publishes a scenario and changes its state
			return await scenarioSrvc.scenarioUpdate(request.params.scenarioId, { state: 'PUBLISHED' })
		} catch (error) {
			log.error(error)
			throw Boom.internal(error.message)
		}
	},
}

/**
 * POST /admin/scenarios/{scenarioId}/unpublish
 */
exports.scenarioUnpublish = {
	id: 'appcenter-admin-scenario-unpublish',
	description: 'Unpublish scenario, updating its state',
	notes: ['Returns the unpublished scenario'],
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
			scenarioId: Joi.string().required(),
		},
	},
	auth: {
		strategy: 'appcenterToken',
		scope: 'admin',
	},
	handler: async (request) => {
		try {
			// Unpublishes a scenario and changes its state
			return await scenarioSrvc.scenarioUpdate(request.params.scenarioId, { state: 'UNPUBLISHED' })

		} catch (error) {
			log.error(error)
			throw Boom.internal(error.message)
		}
	},
}

/**
 * DELETE /admin/scenarios/{scenarioId}
 */
exports.scenarioDelete = {
	id: 'appcenter-admin-scenario-delete',
	description: 'Delete a scenario',
	notes: ['Delete scenario'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'202': { 'description': 'Accepted' },
				'400': { 'description': 'Bad Request' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
	},
	validate: {
		params: {
			scenarioId: Joi.string().required(),
		},
	},
	auth: {
		strategy: 'appcenterToken',
		scope: 'admin',
	},
	handler: async (request) => {

		const { scenarioId } = request.params

		try {
			return await scenarioSrvc.scenarioDelete(scenarioId)
		} catch (error) {
			log.error(error)
			throw Boom.internal(error.message)
		}
	},
}

/**
 * GET /endpoints
 */
exports.endpointGetAll = {
	id: 'appcenter-admin-endpoint-list',
	description: 'Returns a list of endpoints',
	notes: ['Returns endpoints'],
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
			apiName: Joi.string(),
			version: Joi.string(),
		},
	},
	auth: {
		strategy: 'appcenterToken',
	},
	handler: async (request) => {
		const { pageSize, page, apiName, version } = request.query

		try {

			return await scenarioSrvc.endpointGetAll(page, pageSize, apiName, version)
		} catch (error) {
			log.error(error)
			throw Boom.internal(error.message)
		}
	},
}

/**
 * GET /apis
 */
exports.endpointGetApis = {
	id: 'appcenter-admin-apis',
	description: 'Returns a list of apis',
	notes: ['Returns apis'],
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
	handler: async () => {
		try {
			return await scenarioSrvc.endpointGetApis()
		} catch (error) {
			log.error(error)
			throw Boom.internal(error.message)
		}
	},
}
