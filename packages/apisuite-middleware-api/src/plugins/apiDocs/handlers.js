const joi = require('joi')
const boom = require('boom')

const apiDocsService = require('../../services/apiDocs')

exports = module.exports = {}

/** handler for /api-docs/{productId}/{role}/{version} endpoint */
exports.getApiDocs = {
	id: 'appcenter-api-docs',
	description: 'Get the swagger documentation for the sandbox API.',
	notes: ['Returns the swagger doc'],
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
			brand: joi.strict()
				.required()
				.example('bnp'),
			productId: joi.number()
				.required()
				.example('1234'),
			role: joi.string()
				.required()
				.valid('aisp', 'pisp', 'piisp')
				.example('aisp'),
			version: joi.string()
				.required()
				.example('1.0.1'),
		},
	},
	handler: async (request) => {
		let belongToBrand = await apiDocsService.checkBrand(request.params.brand, request.params.productId)
		if (!belongToBrand) throw boom.badRequest('Requesting a product that does not belong to brand.')

		let apiDocs = await apiDocsService.getApiDoc(request.params.productId, request.params.role, request.params.version)
		if (!apiDocs) throw boom.notFound()

		return apiDocs
	},
}

exports.getApiStatus = {
	id: 'appcenter-api-status',
	description: 'Get the status of an API.',
	notes: ['Returns the status of an API'],
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
		payload: {
			path: joi.string().required(),
			method: joi.string().required(),
			brand: joi.string().optional(),
		},
	},
	handler: async (request, h) => {
		const { path, method , brand } = request.payload

		const retval = await apiDocsService.findProductEndpointStatus(path, method,brand)

		if (retval) return h.response(retval)

		return h.response({message: 'endpoint is not listed on api management'}).code(404)
	},
}
