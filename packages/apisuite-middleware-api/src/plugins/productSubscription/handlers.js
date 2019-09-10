const Joi = require('joi')
const Boom = require('boom')

const orgSrvc = require('../../services/organization')
const productSrvc = require('../../services/product')
const productSubscriptionSrvc = require('../../services/productSubscription')
const Brand = require('../../models/Brand')

//const activityLog = require('../../utils/activity-log')

exports = module.exports = {}

/**
 * @memberof module:plugins/productSubscriptions
 */

/**
 * GET /organizations/{orgId}/products
 */
exports.listOrganizationSubscriptions = {
	id: 'apisuite-list-organization-subscriptions',
	description: 'Returns a list of organization product subscriptions',
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
	validate: {
		params: {
			orgId: Joi.number().integer().positive()
				.required()
				.example('12345'),
		},
	},
	pre: [
		// Validate if organization exists and belongs to the user
		{
			assign: 'organization',
			method: async (request) => {
				const organization = await orgSrvc.getUserOrganization(request.auth.artifacts.user.get('id'), request.params.orgId)
				if (!organization || organization.related('users').length === 0) throw Boom.forbidden()
				return organization
			},
		},
	],
	handler: async (request) => {
		const products = await productSrvc.listProducts({
			limit: 20,
			offset: 0,
		})

		if (!products) throw Boom.forbidden()

		const subscriptions = await productSubscriptionSrvc.listOrganizationProducts(request.params.orgId)

		const brands = await Brand.findAll()

		if (!subscriptions) throw Boom.forbidden()

		const subscriptionIds = subscriptions.toJSON().map(subscription => subscription.id)

		return {
			products: products
				.toJSON({ hidden: ['_pivot_id', '_pivot_organization_id', '_pivot_product_id'] })
				.map(product => ({
					...product,
					isSubscribed: subscriptionIds.includes(product.id),
				})),
			brands,
		}
	},
}

/**
 * POST /organizations/{orgId}/products
 */
exports.createOrganizationSubscriptions = {
	id: 'appcenter-create-organization-subscriptions',
	description: 'Creates organization subscriptions',
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
			orgId: Joi.number().integer().positive()
				.required()
				.example('12345'),
		},
		payload: {
			productIds: Joi.array().items(
				Joi.alternatives().try(Joi.string(), Joi.number())
			),
		},
	},
	pre: [
		// Validate if organization exists and belongs to the user
		{
			assign: 'organization',
			method: async (request) => {
				const organization = await orgSrvc.getUserOrganization(request.auth.artifacts.user.get('id'), request.params.orgId)
				if (!organization || organization.related('users').length === 0) throw Boom.forbidden()
				return organization
			},
		},
	],
	handler: async (request, h) => {
		const products = await productSrvc.listProducts({
			limit: 20,
			offset: 0,
		})

		if (!products) throw Boom.forbidden()

		const brands = await Brand.findAll()

		await productSubscriptionSrvc.addProductsToOrganization(request.params.orgId, request.payload.productIds)

		const subscriptions = await productSubscriptionSrvc.listOrganizationProducts(request.params.orgId)
		const subscriptionIds = subscriptions.toJSON().map(subscription => subscription.id)

		const resp = {
			products: products.toJSON({ hidden: ['_pivot_id', '_pivot_organization_id', '_pivot_product_id'] })
				.map(product => ({
					...product,
					isSubscribed: subscriptionIds.includes(product.id),
				})),
			brands,
		}

		/*
		// ACTIVITYLOGUNCOMMENT
		await activityLog.log(
			request.auth.artifacts.user.get('id'),
			[request.params.orgId],
			'APP_SUBSCRIPTION',
			'general',
			`Subscription was created to the products ${ subscriptions.toJSON().map(s => s.name).join(',')}`
		)
		*/

		return h.response(resp).code(201)
	},
}
