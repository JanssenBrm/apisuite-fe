const Joi = require('joi')
// const boom = require('boom')
const utils = require('./utils')
const log = require('../../utils/logger')
const externalResourceService = require('../../services/externalResource')


exports = module.exports = {}

/** handler for /external-resources endpoint */
exports.getExternalResources = {
	id: 'appcenter-external-resources-get',
	description: 'Get the external resources list.',
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
		query: {
			page: Joi.number().integer()
				.min(1)
				.default(1),
			pageSize: Joi.number().integer()
				.positive()
				.default(20),
		},
	},
	handler: async (request) => {
		const checkForSync = await externalResourceService.checkForSync()
		if (checkForSync) {
			try {
				utils.syncExternalResources()
			} catch (e) {
				log.warn(e, '[GetExternalResources] Failed to sync external resources.')
			}
		}

		return await externalResourceService.listExternalResources(request.query)
	},
}

exports.githubHook = {
	id: 'appcenter-external-resources-github-hook',
	description: 'Webhook for github event calls',
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
	validate: {
		headers: {
			'x-github-event': Joi.string()
				.required(),
			'x-github-delivery': Joi.string()
				.required(),
		},
		options: {
			allowUnknown: true,
		},
	},
	handler: async (request, h) => {
		try {
			await utils.syncExternalResources()
		} catch (e) {
			log.warn(e, '[GitHubHook] Failed to sync external resources.')
		}

		return h.response().code(200)
	},
}

