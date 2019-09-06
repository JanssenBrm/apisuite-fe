const Joi = require('joi')
const log = require('../../utils/logger')
const Boom = require('boom')

// Services
const appService = require('../../services/app')
const orgContainerService = require('../../services/organizationContainer')


exports = module.exports = {}

/**
 * @memberof module:plugins/app
 */

/**
 * Handler for POST /apps endpoint
 */
exports.createApp = {
	id: 'app-create',
	description: 'Creates a new organization app',
	notes: ['Insert a new app into the database with organization'],
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
				.description('App name')
				.example('My First App'),
			description: Joi.string()
				.optional()
				.allow('', null)
				.description('App description')
				.example('Very cool app'),
			publicURL: Joi.string()
				.allow('', null)
				.description('App public url')
				.example('public.com'),
			ownerId: Joi.number().integer().positive()
				.required()
				.description('Id of the user owner of the app')
				.example(12345),
			organizationId: Joi.number().integer().positive()
				.required()
				.description('Id of the organization owner of the app')
				.example(12345),
			iconURL: Joi.string()
				.description('App icon url')
				.example('http://myicon.ico'),
			redirectURLs: Joi.array().unique().items(Joi.string())
				.description('Array of valid redirect urls'),
			products: Joi.array().unique().items(Joi.object({
				scope: Joi.string()
					.example('aisp'),
				brand: Joi.string()
					.example('bnppf'),
			}))
				.description('Array of products the app subscribed to'),
		}).label('appData'),
	},
	handler: async (request, h) => {
		let orgContainer, app
		try {
			orgContainer = await orgContainerService.getContainerByOrganization(request.payload.organizationId)
		} catch(error) {
			log.error(error, 'Failed to retrieve organization related container')
			return Boom.forbidden('Container not available')
		}

		try {
			app = await appService.create({
				name: request.payload.name,
				description: request.payload.description,
				public_url: request.payload.publicURL,
				icon_url: request.payload.iconURL,
				owner_id: request.payload.ownerId,
				organization_id: request.payload.organizationId,
				organization_container_id: orgContainer.get('id'),
				grant_type: 'authorization_code;client_credentials;refresh_token',
			}, request.payload.redirectURLs, request.payload.products)
		} catch(error) {
			log.error(error, 'Failed to create app')
			return Boom.forbidden('Container not available')
		}

		return h.response(app).code(201)
	},
}

/**
 * Handler for GET /apps endpoint
 */
exports.listApps = {
	id: 'app-list',
	description: 'List apps',
	notes: ['List apps based on the user organization id'],
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
			offset: Joi.number().integer()
				.min(0)
				.default(0),
			limit: Joi.number().integer()
				.positive()
				.default(20),
			org_id: Joi.number().integer()
				.positive()
				.required(),
		},
	},
	handler: async (request) => {
		try {

			return await appService.listApps({ organization_id: request.query.org_id }, {
				limit: request.query.limit,
				offset: request.query.offset,
			})
		} catch (error) {
			log.error(error)
			throw Boom.internal(error.message)
		}
	},
}

/**
 * Handler for PUT /apps/{id} endpoint
 */
exports.updateApp = {
	id: 'appcenter-app-update',
	description: 'Updates an app',
	notes: ['Updates an app in the database related to the user organization'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'OK' },
				'400': { 'description': 'Bad Request' },
				'404': { 'description': 'Not Found' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
	},
	auth: {
		strategy: 'authServerToken',
		scope: 'internal',
	},
	validate: {
		params: {
			appId: Joi.number().integer()
				.positive()
				.required(),
		},
		payload: Joi.object({
			name: Joi.string()
				.required()
				.description('App name')
				.example('My First App'),
			description: Joi.string()
				.optional()
				.allow('', null)
				.description('App description')
				.example('Very cool app'),
			iconURL: Joi.string()
				.description('App icon url')
				.example('http://myicon.ico'),
			publicURL: Joi.string()
				.allow('', null)
				.description('App public url')
				.example('public.com'),
			redirectURLs: Joi.array().unique().items(Joi.string())
				.description('Array of valid redirect urls'),
			products: Joi.array().unique().items(Joi.object({
				scope: Joi.string()
					.example('aisp'),
				brand: Joi.string()
					.example('bnppf'),
			}))
				.description('Array of products the app subscribed to'),
		}).label('appInfo'),
	},
	handler: async (request) => {
		try {
			return await appService.update({
				name: request.payload.name,
				description: request.payload.description,
				icon_url: request.payload.iconURL,
				public_url: request.payload.publicURL,
			}, request.payload.redirectURLs, request.payload.products, request.params.appId)
		} catch (error) {
			log.error(error)
			throw Boom.internal(error.message)
		}

	},
}

/**
 * Handler for GET /apps/{id} endpoint
 */
exports.getApp = {
	id: 'appcenter-app-get',
	description: 'Get one app',
	notes: ['Get one app based on the user id and the app id'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'OK' },
				'400': { 'description': 'Bad Request' },
				'404': { 'description': 'Not Found' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
	},
	auth: {
		strategy: 'authServerToken',
		scope: 'internal',
	},
	validate: {
		params: {
			appId: Joi.number().integer()
				.positive()
				.required(),
		},
	},
	handler: async (request) => {
		try {
			return await appService.getApp(request.params.appId)
		} catch (error) {
			log.error(error)
			throw Boom.internal(error.message)
		}
	},
}

/**
 * Handler for DELETE /apps/{id} endpoint
 */
exports.deleteApp = {
	id: 'appcenter-app-delete',
	description: 'Deletes an app',
	notes: ['Deletes an app in the database related to the logged user'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'204': { 'description': 'No Content' },
				'400': { 'description': 'Bad Request' },
				'404': { 'description': 'Not Found' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
	},
	auth: {
		strategy: 'authServerToken',
		scope: 'internal',
	},
	validate: {
		params: {
			appId: Joi.number().integer()
				.positive()
				.required(),
		},
	},
	handler: async (request, h) => {
		try {
			await appService.deleteApp(request.params.appId)
			return h.response().code(204)
		} catch (error) {
			log.error(error)
			throw Boom.internal(error.message)
		}
	},
}
