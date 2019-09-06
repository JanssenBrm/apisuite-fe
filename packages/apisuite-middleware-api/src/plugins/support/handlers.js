const Joi = require('joi')
const Boom = require('boom')
const rpn = require('request-promise-native')
const config = require('../../config')
const oauth2Srvc = require('../../services/oauth2')

const log = require('../../utils/logger')
const emailSrvc = require('../../services/email')

exports = module.exports = {}

/**
 * @memberof module:plugins/support
 */


/**
 * POST /support/ticket
 */
exports.sendTicket = {
	id: 'appcenter-support',
	description: 'Sends a ticket to the support api',
	notes: ['Sends a new support ticket'],
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
			type: Joi.string()
				.valid('question', 'incident', 'problem', 'task').required()
				.example('question'),
			subject: Joi.string().required()
				.example('New feature proposal'),
			message: Joi.string().required()
				.example('New feature description'),
			refLink: Joi.string().optional().allow('', null)
				.example('https://example.com/ref/1'),
			name: Joi.string().required()
				.example('John Doe'),
			email: Joi.string().required()
				.example('john@doe.com'),
			organization: Joi.string().optional().allow('', null)
				.example('My Company'),
			captcha: Joi.string().optional().allow('', null)
				.example('the captcha response'),
			environment: Joi.string()
				.valid('sandbox', 'production', 'fallback')
				.optional().allow('', null)
				.example('question'),
		},
		options: {
			allowUnknown: true,
		},
	},
	handler: async (request, h) => {
		// validate the captcha to prevent spamming when used the endpoint directly
		// if we don't have captcha check if we have the user beare token
		const secret = config.get('googleRecaptcha').secret

		if (request.payload.captcha && request.payload.captcha !== '' && secret !== '') {
			log.info('Validating user captcha.')

			const verifyURI = config.get('googleRecaptcha').verifyURL
			const uri = `${verifyURI}?secret=${secret}&response=${request.payload.captcha}`
			let validation

			try {
				validation = await rpn({
					method: 'POST',
					uri,
					json: true,
				})
			} catch (error) {
				log.error('ERROR [Validating reCaptcha in support]', error)
				throw Boom.serverUnavailable()
			}

			if (!validation || (validation && !validation.success)) {
				throw Boom.badRequest('Invalid captcha.')
			}
		} else {
			log.info('Validating user token.')

			const authorization = request.headers.authorization
			const auth = authorization || ''
			const [tokenType, token] = auth.split(/\s+/)

			// if we have no captcha and Bearer make the response unauthorized
			if (!token || tokenType !== 'Bearer') {
				throw Boom.unauthorized()
			}
			try {
				await oauth2Srvc.validateBearerToken(token)
			} catch (err) {
				log.error('ERROR [Validating token in support]', err)
				throw Boom.unauthorized()
			}
		}

		try {
			await emailSrvc.sendSupportTicket(request.payload)
		} catch (err) {
			log.error(err)
			throw Boom.serverUnavailable()
		}

		return h.response().code(200)
	},
}
