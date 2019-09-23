const Joi = require('joi')
const Boom = require('boom')
const productSrvc = require('../../services/product')
const logger = require('../../utils/logger')

exports = module.exports = {}

/**
 * @memberof module:plugins/product
 */

/**
 * POST /admin/products
 */
exports.createProduct = {
	id: 'apisuite-create-product',
	description: 'Creates a new API products',
	notes: ['Creates a new product'],
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
		failAction: async (request, h, err) => {
			logger.info('\n\n[createProduct] ValidationError:', err.message)
			throw Boom.badRequest('Invalid request payload input')
		},
		payload: {
			locale: Joi.string().default('en-GB'),
			name: Joi.string().required(),
			baseUri: Joi.string().optional().allow('', null),
			sandboxBaseUri: Joi.string().optional().allow('', null),
			fields: Joi.array().items(
				Joi.object().keys({
					key: Joi.string().required(),
					image: Joi.string().optional().allow('', null),
					title: Joi.string().optional().allow('', null),
					body: Joi.string().optional().allow('', null),
					target: Joi.string().optional().allow('', null),
				}),
			).optional(),
			apidocs: Joi.array().items(
				Joi.object().keys({
					swagger: Joi.string().required(),
					accessScope: Joi.string().required().valid('public', 'private', 'internal').insensitive(),
					sandbox: Joi.boolean().required().default(false),
					live: Joi.boolean().required().default(false),
					sandboxSourceControlKey: Joi.string().optional().allow('', null),
					sandboxSourceControlName: Joi.string().optional().allow('', null),
				}).optional(),
			).optional(),
		},
	},
	auth: {
		strategy: 'appcenterToken',
		scope: 'admin',
	},
	handler: async (request, h) => {
		const prod = await productSrvc.createProduct(request.payload)
		const errors = prod && prod.validation ? prod.validation.some((api) => api.errors && api.errors.length) : false
		return h.response(prod).code(errors ? 400 : 201)
	},
}

/**
 * POST /admin/products/{productId}/quarantine
 */
exports.quarantineProduct = {
	id: 'apisuite-quarantine-product',
	description: 'Quarantine a API product',
	notes: ['Puts a product in quarantine'],
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
	validate: {
		params: {
			productId: Joi.number().integer().positive()
				.required(),
		},
	},
	auth: {
		strategy: 'appcenterToken',
		scope: 'admin',
	},
	handler: async (request, h) => {
		const prod =  await productSrvc.quarantineProduct(request.params.productId)
		return h.response(prod).code(201)
	},
}

/**
 * PUT /admin/products/{productId}
 */
exports.updateProduct = {
	id: 'apisuite-update-product',
	description: 'Updates an API products',
	notes: ['Updates a product'],
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
		failAction: async (request, h, err) => {
			logger.info('\n\n[updateProduct] ValidationError:', err.message)
			throw Boom.badRequest('Invalid request payload input')
		},
		params: {
			productId: Joi.number().integer().positive()
				.required(),
		},
		payload: {
			id: Joi.number(),
			locale: Joi.string().default('en-GB'),
			name: Joi.string().required(),
			baseUri: Joi.string().optional().allow('', null),
			sandboxBaseUri: Joi.string().optional().allow('', null),
			fields: Joi.array().items(
				Joi.object().keys({
					id: Joi.number().optional(),
					key: Joi.string().required(),
					image: Joi.string().optional().allow('', null),
					title: Joi.string().optional().allow('', null),
					body: Joi.string().optional().allow('', null),
					target: Joi.string().optional().allow('', null),
				}),
			).optional(),
			apidocs: Joi.array().items(
				Joi.object().keys({
					id: Joi.number().optional(),
					swagger: Joi.string().optional(),
					accessScope: Joi.string().required().valid('public', 'private', 'internal').insensitive(),
					sandbox: Joi.boolean().required().default(false),
					live: Joi.boolean().required().default(false),
					sandboxSourceControlKey: Joi.string().optional().allow('', null),
					sandboxSourceControlName: Joi.string().optional().allow('', null),
				}).optional(),
			).optional(),
		},
		options: {
			allowUnknown: true,
		},
	},
	auth: {
		strategy: 'appcenterToken',
		scope: 'admin',
	},
	handler: async (request) => await productSrvc.updateProduct(request.params.productId, request.payload),
}

/**
 * DELETE /admin/products/{productId}
 */
exports.deleteProduct = {
	id: 'apisuite-delete-product',
	description: 'Deletes the API product',
	notes: ['Deletes product'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'204': { 'description': 'No Content' },
				'400': { 'description': 'Bad Request' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
	},
	validate: {
		params: {
			productId: Joi.number().integer().positive()
				.required()
				.example('12345'),
		},
	},
	auth: {
		strategy: 'appcenterToken',
		scope: 'admin',
	},
	handler: async (request, h) => {
		await productSrvc.deleteProduct(request.params.productId)
		return h.response().code(204)
	},
}

/**
 * GET /admin/products
 */
exports.listAdminProducts = {
	id: 'apisuite-list-admin-products',
	description: 'Returns a list of API products',
	notes: ['Returns products'],
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
		return await productSrvc.listAdminProducts({
			page: request.query.page,
			pageSize: request.query.pageSize,
		})
	},
}

/**
 * PUT /admin/products/{productId}/apidocs/{apidocsId}
 */
exports.updateAPIState = {
	id: 'apisuite-update-product-api',
	description: 'Updates a product API states',
	notes: ['Updates a api product state'],
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
			productId: Joi.number().integer().positive()
				.required(),
			apidocsId: Joi.number().integer().positive()
				.required(),
		},
		payload: {
			action: Joi.string().valid('public', 'sandbox', 'live'),
		},
	},
	auth: {
		strategy: 'appcenterToken',
		scope: 'admin',
	},
	handler: async (request) => await productSrvc.updateAPIState(request.params.productId, request.params.apidocsId, request.payload),
}

/**
 * DELETE /admin/products/{productId}/apidocs/{apidocsId}
 */
exports.deleteAPI = {
	id: 'apisuite-delete-product-api',
	description: 'Deletes a product api',
	notes: ['Deletes a api product'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'204': { 'description': 'No Content' },
				'400': { 'description': 'Bad Request' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
	},
	validate: {
		params: {
			productId: Joi.number().integer().positive()
				.required()
				.example('12345'),
			apidocsId: Joi.number().integer().positive()
				.required()
				.example('12345'),
		},
	},
	auth: {
		strategy: 'appcenterToken',
		scope: 'admin',
	},
	handler: async (request, h) => {
		await productSrvc.deleteAPI(request.params.productId, request.params.apidocsId)
		return h.response().code(204)
	},
}

/**
 * GET /admin/products/{productId}
 */
exports.getAdminProduct = {
	id: 'apisuite-get-admin-product',
	description: 'Returns the API product',
	notes: ['Returns product'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'Ok' },
				'400': { 'description': 'Bad Request' },
				'404': { 'description': 'Not Found' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
	},
	validate: {
		params: {
			productId: Joi.number().integer().positive()
				.required()
				.example('12345'),
		},
	},
	auth: {
		strategy: 'appcenterToken',
		scope: 'admin',
	},
	handler: async (request) => {

		const product = await productSrvc.getAdminProduct(request.params.productId)

		if(!product) throw Boom.notFound()

		return product
	},
}

/**
 * GET /products
 */
exports.listProducts = {
	id: 'apisuite-list-products',
	description: 'Returns a list of API products',
	notes: ['Returns products'],
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
	handler: async () => {
		return await productSrvc.listProductsWithBrands()
	},
}

/**
 * GET /products/{productId}
 */
exports.getProduct = {
	id: 'apisuite-get-product',
	description: 'Returns the API product',
	notes: ['Returns product'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'Ok' },
				'400': { 'description': 'Bad Request' },
				'404': { 'description': 'Not Found' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
	},
	validate: {
		params: {
			productId: Joi.number().integer().positive()
				.required()
				.example('12345'),
		},
	},
	handler: async (request) => {

		const product = await productSrvc.getProduct(request.params.productId)

		if(!product) throw Boom.notFound()

		return product
	},
}
