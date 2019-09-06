const Joi = require('joi')
const Boom = require('boom')

const log = require('../../utils/logger')
const emailSrvc = require('../../services/email')

exports = module.exports = {}

/**
 * @memberof module:plugins/newsletter
 */


/**
 * POST /newsletter/subscribe
 */
exports.sendNewsletterSubsciption = {
	id: 'appcenter-newsletter',
	description: 'Sends the newsletter email address to the open banking mailbox ',
	notes: ['Sends the newsletter email address'],
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
		payload: {
			email: Joi.string().required()
				.example('john@doe.com'),
		},
		options: {
			allowUnknown: true,
		},
	},
	handler: async (request, h) => {
		try {
			await emailSrvc.sendNewsletter(request.payload)
		} catch (err) {
			log.error(err)
			throw Boom.serverUnavailable()
		}

		return h.response().code(200)
	},
}
