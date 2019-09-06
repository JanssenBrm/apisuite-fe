exports = module.exports = {}

const Joi = require('joi')
const Boom = require('boom')
const httpErrors = require('../../utils/swagger/schemas/httpErrors')
const commonHeaders = require('../../utils/swagger/schemas/headers/common')
const logger = require('../../utils/logger')
/**
 * @memberof module:plugins/consents
 */

/** 
 * PUT /consents handler
 */
exports.putConsents = {
	id: 'consentsPut',
	description: `<h3>Description</h3>
		In the mixed detailed consent on accounts
		<ul>
			<li>the AISP captures the consent of the PSU</li>
			<li>then it forwards this consent to the ASPSP</li>
		</ul>
		This consent replaces any prior consent that was previously sent by the AISP.
		<h3>Prerequisites</h3>
			<ul>
				<li>The TPP has been registered by the Registration Authority for the AISP role.</li>
				<li>The TPP and the PSU have a contract that has been enrolled by the ASPSP</li>
					<ul>
					<li>At this step, the ASPSP has delivered an OAUTH2 "Authorization Code" or "Resource Owner Password" access token to the TPP (cf. § 3.4.2).</li>
					</ul>
				<li>The TPP and the ASPSP have successfully processed a mutual check and authentication</li>
				<li>The TPP has presented its OAUTH2 "Authorization Code" or "Resource Owner Password" access token which allows the ASPSP to identify the relevant PSU and retrieve the linked PSU context (cf. § 3.4.2) if any.</li>
				<li>The ASPSP takes into account the access token that establishes the link between the PSU and the AISP.</li>
			</ul>
		<h3>Business Flow</h3>
		The PSU specifies to the AISP which of his/her accounts will be accessible and which functionalities should be available.
		The AISP forwards these settings to the ASPSP.
		The ASPSP answers by HTTP201 return code.`,
	tags: ['api', 'AISP'],
	plugins: {
		'hapi-swagger': {
			responses: {
				'201': {
					description: 'Created',
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
	//auth: {
	//  accessCode:
	//    - aisp
	//  resourceOwnerIdentification:
	//    - aisp
	//},
	validate: {
		headers: commonHeaders,
		payload: {
			balances: Joi.array().items(
				Joi.object().keys({
					iban: Joi.string()
						.description('International Bank Account Number')
						.example('YY64COJH41059545330222956960771321')
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
					.description('Unique and unambiguous identification for the account between the account owner and the account servicer'),
			)
				.description('List of accessible accounts for one given functionality'),
			transactions: Joi.array().items(
				Joi.object().keys({
					iban: Joi.string()
						.description('International Bank Account Number')
						.example('YY64COJH41059545330222956960771321')
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
					.description('Unique and unambiguous identification for the account between the account owner and the account servicer'),
			)
				.description('List of accessible accounts for one given functionality'),
			trustedBeneficiaries: Joi.boolean()
				.required()
				.description('Indicator that access to the trusted beneficiaries list was granted or not to the AISP by the PSU'),
			psuIdentity: Joi.boolean()
				.required()
				.description('Indicator that access to the PSU identity, first name and last name, was granted or not to the AISP by the PSU'),
		},
		options: {
			allowUnknown: true,
		},
	},
	payload: {
		allow: ['application/json'],
	},
	handler: async (request, h) => {

		try {
			const response = h.response()
			response.header('X-Request-ID', request.headers['X-Request-ID'])
			response.code(201)

			// Needs more info for the data management
			return response
		} catch (error) {
			logger.error(error)
			throw Boom.internal(error.message)
		}

	},

}
