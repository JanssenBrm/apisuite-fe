const Joi = require('joi')
const Boom = require('boom')

const organizationSrvc = require('../../services/organization')
const sandboxAuthServerSrvc = require('../../services/sandboxAuthServer')
const productSrvc = require('../../services/product')
//const activityLog = require('../../utils/activity-log')

exports = module.exports = {}

/**
 * @memberof module:plugins/app
 */

/**
 * Handler for POST /organizations/{organizationId}/sandbox-apps endpoint
 */
exports.createOrganizationSandboxApp = {
	id: 'sandbox-apps-create',
	description: 'Creates a new sandbox app',
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'payloadType': 'form',
			'responses': {
				'201': { 'description': 'Created' },
				'400': { 'description': 'Bad Request' },
				'409': { 'description': 'Conflict' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
	},
	auth: {
		strategy: 'appcenterToken',
	},
	validate: {
		params: {
			organizationId: Joi.number().integer().positive()
				.example(12345)
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
				.description('Description')
				.example('Very cool app'),
			publicURL: Joi.string()
				.allow('', null)
				.description('App public url')
				.example('public.com'),
			iconURL: Joi.string()
				.description('App icon url')
				.example('http://www.myicon.ico'),
			redirectURLs: Joi.array().unique().items(Joi.string())
				.description('Redirect urls')
				.example(['redirect.com']),
			productIds: Joi.array().items(
				Joi.alternatives().try(Joi.string(), Joi.number())
			),
		}).label('appInfo'),
	},
	pre: [
		// Validate if organization exists and belongs to the user
		{
			assign: 'organization',
			method: async (request) => {
				const organization = await organizationSrvc.getUserOrganization(request.auth.artifacts.user.get('id'), request.params.organizationId)
				if (!organization || organization.related('users').length === 0) throw Boom.forbidden()
				return organization
			},
		},
	],
	handler: async (request, h) => {
		const { productIds } = request.payload

		// Create app in the sandbox auth server
		const appRequest = await sandboxAuthServerSrvc.createApp({
			name: request.payload.name,
			organizationId: request.params.organizationId,
			ownerId: request.auth.artifacts.user.get('id'),
			description: request.payload.description,
			iconURL: request.payload.iconURL,
			publicURL: request.payload.publicURL,
			redirectURLs: request.payload.redirectURLs,
		}, productIds)

		/*
		// ACTIVITYLOGUNCOMMENT
		await activityLog.log(
			request.auth.artifacts.user.get('id'),
			[request.params.organizationId],
			'APP_CREATION',
			'general',
			`App ${ request.payload.name } was created`
		)
		*/

		/*
		// ACTIVITYLOGUNCOMMENT
		if (productIds.length > 0) {
			await activityLog.log(
				request.auth.artifacts.user.get('id'),
				[request.params.organizationId],
				'APP_SUBSCRIPTION',
				'general',
				`Subscription was created to the products ${ productIds.join(',')}`
			)
		}
		*/

		return h.response(appRequest).code(201)
	},
}

/**
 * Handler for GET /organizations/{organizationId}/sandbox-apps endpoint
 */
exports.listOrganizationSandboxApps = {
	id: 'sanbox-apps-list',
	description: 'List apps',
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
		strategy: 'appcenterToken',
	},
	validate: {
		params: {
			organizationId: Joi.number().integer()
				.positive()
				.required(),
		},
		query: {
			offset: Joi.number().integer()
				.min(0)
				.default(0),
			limit: Joi.number().integer()
				.positive()
				.default(20),
		},
	},
	pre: [
		// Validate if organization exists and belongs to the user
		{
			assign: 'organization',
			method: async (request) => {
				const organization = await organizationSrvc.getUserOrganization(request.auth.artifacts.user.get('id'), request.params.organizationId)
					.catch(() => { throw Boom.forbidden() })

				if (!organization || organization.related('users').length === 0)
					throw Boom.forbidden()

				return organization
			},
		},
	],
	handler: async (request) => {
		const { organization } = request.pre
		const orgSubscriptions = organization.related('products').toJSON()

		const orgSubsWithBrand = await Promise.all(orgSubscriptions.map(async sub => ({
			...sub,
			brand: (await productSrvc.getBrand({ id: sub.brand_id })).get('shortname'),
		})))

		
		const apps = await sandboxAuthServerSrvc.listApps(request.params.organizationId, {
			limit: request.query.limit,
			offset: request.query.offset,
		})
		
		return apps.map(app => {
			const { scopes } = app
	
			const productIds = scopes
				.map(scope => {
					const subscription = orgSubsWithBrand.filter(sub => scope.scope.name === sub.role && scope.brand === sub.brand)
					if (subscription.length === 0) return
					return subscription[0].id
				})
				.filter(id => !!id)

			return {
				...app,
				productIds,
			}
		})

	},
}

/**
 * Handler for PUT /organizations/{organizationId}/sandbox-apps/{appId} endpoint
 */
exports.updateOrganizationSandboxApp = {
	id: 'appcenter-app-update',
	description: 'Updates an app',
	notes: ['Updates an app in the database related to the logged user'],
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
		strategy: 'appcenterToken',
	},
	validate: {
		params: {
			organizationId: Joi.number().integer()
				.positive()
				.required(),
			appId: Joi.number().integer()
				.positive()
				.required(),
		},
		payload: Joi.object({
			name: Joi.string()
				.required()
				.example('My First App'),
			description: Joi.string()
				.optional()
				.allow('', null)
				.example('Very cool app'),
			iconURL: Joi.string()
				.description('App icon url')
				.example('http://www.myicon.ico'),
			publicURL: Joi.string()
				.optional()
				.allow('', null)
				.example('public.com'),
			redirectURLs: Joi.array().unique().items(Joi.string())
				.default([])
				.example(['redirect.com']),
			productIds: Joi.array().items(
				Joi.alternatives().try(Joi.string(), Joi.number())
			),
		}).label('appInfo'),
	},
	pre: [
		// Validates if user belongs to organization
		{
			assign: 'organization',
			method: async (request) => {
				const organization = await organizationSrvc.getUserOrganization(request.auth.artifacts.user.get('id'), request.params.organizationId)
				if (!organization || organization.related('users').length === 0) throw Boom.forbidden()
				return organization
			},
		},

		// Validates if user is app owner
		{
			assign: 'app',
			method: async (request) => {
				const app = await sandboxAuthServerSrvc.getApp(request.params.appId)
				if (!app || app.ownerId !== request.auth.artifacts.user.get('id')) throw Boom.forbidden()
				return app
			},
		},
	],
	handler: async (request) => {
		const app = {
			name: request.payload.name,
			description: request.payload.description,
			iconURL: request.payload.iconURL,
			publicURL: request.payload.publicURL,
			redirectURLs: request.payload.redirectURLs,
		}

		const updatedApp = await sandboxAuthServerSrvc.updateApp(request.pre.app.id, app, request.payload.productIds)

		const orgSubscriptions = request.pre.organization.related('products').toJSON()
		const orgSubsWithBrand = await Promise.all(orgSubscriptions.map(async sub => ({
			...sub,
			brand: (await productSrvc.getBrand({ id: sub.brand_id })).get('shortname'),
		})))
		const productIds = updatedApp.scopes
			.map(scope => {
				const subscription = orgSubsWithBrand.filter(sub => scope.scope.name === sub.role && scope.brand === sub.brand)
				if (subscription.length === 0) return
				return subscription[0].id
			})
			.filter(id => !!id)

		/*
		// ACTIVITYLOGUNCOMMENT
		await activityLog.log(
			request.auth.artifacts.user.get('id'),
			[request.params.organizationId],
			'APP_UPDATE',
			'general',
			`App ${ request.payload.name } was updated`
		)
	  */

		return {
			...Object.assign(request.pre.app, updatedApp),
			productIds,
		}
	},
}

/**
 * Handler for GET /organizations/{organizationId}/sandbox-apps/{appId} endpoint
 */
exports.getOrganizationSandboxApp = {
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
		strategy: 'appcenterToken',
	},
	validate: {
		params: {
			organizationId: Joi.number().integer()
				.positive()
				.required(),
			appId: Joi.number().integer()
				.positive()
				.required(),
		},
	},
	pre: [
		// Validates if user belongs to organization
		{
			assign: 'organization',
			method: async (request) => {
				const organization = await organizationSrvc.getUserOrganization(request.auth.artifacts.user.get('id'), request.params.organizationId)
				if (!organization || organization.related('users').length === 0) throw Boom.forbidden()
				return organization
			},
		},

		// Validates if organization is allowed to access app
		{
			assign: 'app',
			method: async (request) => {
				const app = await sandboxAuthServerSrvc.getApp(request.params.appId)
				if (!app || request.pre.organization.id !== app.organizationId) throw Boom.forbidden()
				return app
			},
		},
	],
	handler: async (request) => {
		const { app, organization } = request.pre

		const { scopes } = app

		const orgSubscriptions = organization.related('products').toJSON()

		const orgSubsWithBrand = await Promise.all(orgSubscriptions.map(async sub => ({
			...sub,
			brand: (await productSrvc.getBrand({ id: sub.brand_id })).get('shortname'),
		})))

		const productIds = scopes
			.map(scope => {
				const subscription = orgSubsWithBrand.filter(sub => scope.scope.name === sub.role && scope.brand === sub.brand)
				if (subscription.length === 0) return
				return subscription[0].id
			})
			.filter(id => !!id)

		return {
			...app,
			productIds,
		}
	},
}

/**
 * Handler for DELETE /organizations/{organizationId}/sandbox-apps/{appId} endpoint
 */
exports.deleteOrganizationSandboxApp = {
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
		strategy: 'appcenterToken',
	},
	validate: {
		params: {
			organizationId: Joi.number().integer()
				.positive()
				.required(),
			appId: Joi.number().integer()
				.positive()
				.required(),
		},
	},
	pre: [
		// Validates if user belongs to organization
		{
			assign: 'organization',
			method: async (request) => {
				const organization = await organizationSrvc.getUserOrganization(request.auth.artifacts.user.get('id'), request.params.organizationId)
				if (!organization || organization.related('users').length === 0) throw Boom.forbidden()
				return organization
			},
		},

		// Validates if user is app owner
		{
			assign: 'app',
			method: async (request) => {
				const app = await sandboxAuthServerSrvc.getApp(request.params.appId)
				if (!app || app.ownerId !== request.auth.artifacts.user.get('id')) throw Boom.forbidden()
				return app
			},
		},
	],
	handler: async (request, h) => {
		await sandboxAuthServerSrvc.deleteApp(request.pre.app.id)

		/*
		// ACTIVITYLOGUNCOMMENT
		await activityLog.log(
			request.auth.artifacts.user.get('id'),
			[request.params.organizationId],
			'APP_DELETE',
			'general',
			`App ${ request.pre.app.name } was deleted`
		)
		*/

		return h.response().code(204)
	},
}
