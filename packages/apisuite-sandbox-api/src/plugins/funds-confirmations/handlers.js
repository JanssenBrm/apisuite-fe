const Joi = require('joi')
const Boom = require('boom')

const logger = require('../../utils/logger')
const httpErrors = require('../../utils/swagger/schemas/httpErrors')
const commonHeaders = require('../../utils/swagger/schemas/headers/common')
const fcService = require('../../services/funds-confirmations')
const accountPersistence = require('../../services/accounts/persistence')
const accreditationPersistence = require('../../services/accreditation/persistence')

exports = module.exports = {}

/**
 * @memberof module:plugins/funds_confirmations
 */

/** 
 * POST /v1/funds-confirmations handler
 */
exports.postFundsConfirmations = {
	id: 'fundsConfirmationsPost',
	description: 'Payment coverage check request (PIISP)',
	tags: ['api', 'PIISP'],
	plugins: {
		'hapi-swagger': {
			responses: {

				'200': {
					description: 'payment coverage request',
					headers: {
						'X-Request-ID': Joi.string()
							.description('Correlation header to be set in a request and retrieved in the relevant response'),
					},
				},

				'400': httpErrors['400'],
				'401': httpErrors['401'],
				'403': httpErrors['403'],
				'405': httpErrors['405'],
				'406': httpErrors['406'],
				'408': httpErrors['408'],
				'429': httpErrors['429'],
				'500': httpErrors['500'],
				'503': httpErrors['503'],
			},
		},
	},
	validate: {
		headers: commonHeaders,
		payload: Joi.object().keys({
			paymentCoverageRequestId: Joi.string()
				.max(35)
				.required()
				.description('Identification of the payment Coverage Request'),
			payee: Joi.string()
				.max(70)
				.optional()
				.description('The merchant where the card is accepted as information to the PSU.'),
			instructedAmount: Joi.object().keys({
				currency: Joi.string()
					.regex(/^[A-Z]{3,3}$/)
					.required()
					.example('EUR')
					.description('Specifies the currency of the amount'),
				amount: Joi.string()
					.regex(/^-{0,1}[0-9]{1,13}(\.[0-9]{0,5}){0,1}$/)
					.required()
					.example('12.25')
					.description('Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party.'),
			})
				.required(),
			accountId: Joi.object().keys({
				iban: Joi.string()
					.description('International Bank Account Number')
					.example('YY64COJH41059545330222956960771321')
					.regex(/^[A-Z]{2,2}[0-9]{2,2}[a-zA-Z0-9]{1,30}$/)
					.required(),
				other: Joi.object().keys({
					identification: Joi.string()
						.description('API: Identifier')
						.required(),
					schemeName: Joi.string()
						.max(70)
						.description('Name of the identification scheme')
						.example('SRET')
						.required(),
					issuer: Joi.string()
						.max(35)
						.optional()
						.description('Entity that assigns the identification'),
				}),
			})
				.required(),
		}),
		options: {
			allowUnknown: true,
		},
	},
	payload: {
		allow: ['application/json'],
	},
	auth: {
		strategy: 'bearerToken',
		scope: 'piisp',
	},
	pre: [
		{
			assign: 'accreditation',
			method: async (request) => {
				const { accountId } = request.payload
				const { userId, clientId } = request.auth.artifacts

				const accountIdentification = await accountPersistence.getAccountIdentificationByIban(accountId.iban)

				if (!accountIdentification) {
					logger.error('Account not found')
					throw Boom.badRequest()
				}

				const accountResourceId = accountIdentification.related('accountResource').toJSON().resourceId

				const accreditation = await accreditationPersistence.getAccreditation(userId, clientId, accountResourceId)

				if (!accreditation) {
					logger.error('postFundsConfirmations: Accreditation not found')
					throw Boom.badRequest()
				}

				return accreditation
			},
		},
	],
	handler: async (request, h) => {
		const { payload } = request
		const { instructedAmount, accountId } = payload

		const checkBalance = await fcService.checkBalance(accountId.iban, instructedAmount)

		const response = h.response({
			request: payload,
			result: checkBalance,
		})
		response.header('X-Request-ID', request.headers['x-request-id'])
		response.header('Digest', request.headers['digest'])
		response.header('Signature', request.headers['signature'])
		response.code(200)

		return response
	},
}
