const Boom = require('boom')
const Joi = require('joi')
const crypto = require('crypto')

const logger = require('../../utils/logger')

const hal = require('./hal')
const accreditationPersistence = require('../../services/accreditation/persistence')
const accountService = require('../../services/accounts')
const httpErrors = require('../../utils/swagger/schemas/httpErrors')
const commonHeaders = require('../../utils/swagger/schemas/headers/common')
const params = require('../../utils/swagger/schemas/parameters')
const responses = require('../../utils/swagger/schemas/responses')

const PaymentRequestResource = require('../../models/PaymentRequestResource')

exports = module.exports = {}

/**
 * @memberof module:plugins/accounts
 */

/**
 * GET /v1/accounts handler
 */
exports.getAccounts = {
	id: 'accountsGet',
	description: `<h3>Description</h3>
	This call returns all payment accounts that are relevant the PSU on behalf of whom the AISP is connected.
	Thanks to HYPERMEDIA, each account is returned with the links aiming to ease access to the relevant transactions and balances.
	The result may be subject to pagination (i.e. retrieving a partial result in case of having too many results) through a set of pages by the ASPSP. Thereafter, the AISP may ask for the first, next, previous or last page of results.`,
	notes: ['Retrieval of the PSU accounts (AISP)'],
	tags: ['api', 'AISP'],
	plugins: {
		'hapi-swagger': {
			responses: {
				'200': responses.accounts['getAccounts'],
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
		'hal': hal.getAccounts,
	},
	validate: {
		query: {
			page: Joi.number().integer()
				.positive()
				.default(1),
			pageSize: Joi.number().integer()
				.positive()
				.default(25),
			brand: Joi.string().default('bnppf'),
		},
		headers: commonHeaders,
		options: {
			allowUnknown: true,
		},
	},
	auth: {
		strategy: 'bearerToken',
		scope: 'aisp',
	},
	handler: async (request, h) => {
		const { userId, clientId } = request.auth.artifacts

		const accountsData = await accountService.getAccounts(userId, clientId, {
			page: request.query.page,
			pageSize: request.query.pageSize,
		})

		const response = accountsData.accounts.length === 0
			? h.response().code(204)
			: h.response({
				accounts: accountsData.accounts,
			}).code(200)
		response.header('X-Request-ID', request.headers['x-request-id'])
		response.header('PSU-IP-Address', request.headers['psu-ip-address'])
		response.header('PSU-IP-Port', request.headers['psu-ip-port'])
		response.header('PSU-HTTP-Method', request.headers['psu-http-method'])
		response.header('PSU-Date', request.headers['psu-date'])
		response.header('PSU-GEO-Location', request.headers['psu-geo-location'])
		response.header('PSU-User-Agent', request.headers['psu-user-agent'])
		response.header('PSU-Referer', request.headers['psu-referer'])
		response.header('PSU-Accept', request.headers['psu-accept'])
		response.header('PSU-Accept-Charset', request.headers['psu-accept-charset'])
		response.header('PSU-Accept-Encoding', request.headers['psu-accept-encoding'])
		response.header('PSU-Accept-Language', request.headers['psu-accept-language'])
		response.header('PSU-Device-ID', request.headers['psu-device-id'])
		response.header('Digest', `SHA-256=${crypto.createHash('sha256').update(JSON.stringify(response.source)).digest('base64')}`)

		return response
	},
}

/**
 * GET /v1/accounts/{accountResourceId}/balances handler
 */
exports.getAccountBalances = {
	id: 'accountsBalancesGet',
	description: `<h3>Description</h3>
	This call returns a set of balances for a given PSU account that is specified by the AISP through an account resource Identification
	<ul>
		<li>The ASPSP must provide at least the accounting balance on the account.</li>
		<li>The ASPSP can provide other balance restitutions, e.g. instant balance, as well, if possible.</li>
		<li>Actually, from the PSD2 perspective, any other balances that are provided through the Web-Banking service of the ASPSP must also be provided by this ASPSP through the API.</li>
	</ul>`,
	notes: ['Retrieval of an account balances report (AISP)'],
	tags: ['api', 'AISP'],
	plugins: {
		'hapi-swagger': {
			responses: {
				'200': responses.accounts['getAccountBalances'],
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
		'hal': hal.getAccountBalances,
	},
	validate: {
		headers: commonHeaders,
		params: params.accounts.path['getAccountBalances'],
		options: {
			allowUnknown: true,
		},
	},
	auth: {
		strategy: 'bearerToken',
		scope: 'aisp',
	},
	pre: [
		{
			assign: 'accreditation',
			method: async (request) => {
				const resourceId = request.params.accountResourceId
				const { userId, clientId } = request.auth.artifacts

				const accreditation = await accreditationPersistence.getAccreditation(userId, clientId, resourceId)

				if (!accreditation) {
					logger.error('getAccountBalances: Accreditation not found')
					throw Boom.forbidden('Access to resource is not allowed', {
						error: 'Forbidden, access to resource is not allowed',
					})
				}

				return accreditation
			},
		},
	],
	handler: async (request, h) => {
		const { accreditation } = request.pre
		const balances = accreditation.toJSON().account.related('balances')

		const response = h.response({
			balances: balances.toJSON({
				hidden: ['id', 'lastChangeDateTime', 'lastCommittedTransaction', 'account_resource_id'],
			}),
		})
		response.header('X-Request-ID', request.headers['x-request-id'])
		response.header('PSU-IP-Address', request.headers['psu-ip-address'])
		response.header('PSU-IP-Port', request.headers['psu-ip-port'])
		response.header('PSU-HTTP-Method', request.headers['psu-http-method'])
		response.header('PSU-Date', request.headers['psu-date'])
		response.header('PSU-GEO-Location', request.headers['psu-geo-location'])
		response.header('PSU-User-Agent', request.headers['psu-user-agent'])
		response.header('PSU-Referer', request.headers['psu-referer'])
		response.header('PSU-Accept', request.headers['psu-accept'])
		response.header('PSU-Accept-Charset', request.headers['psu-accept-charset'])
		response.header('PSU-Accept-Encoding', request.headers['psu-accept-encoding'])
		response.header('PSU-Accept-Language', request.headers['psu-accept-language'])
		response.header('PSU-Device-ID', request.headers['psu-device-id'])
		response.header('Digest', `SHA-256=${crypto.createHash('sha256').update(JSON.stringify(response.source)).digest('base64')}`)
		response.code(200)

		return response
	},
}

/**
 * GET /v1/accounts/{accountResourceId}/transactions handler
 */
exports.getAccountTransactions = {
	id: 'accountsTransactionsGet',
	description: `<h3>Description</h3>
	This call returns transactions for an account for a given PSU account that is specified by the AISP through an account resource identification.
	The request may use some filter parameter in order to restrict the query 
	<ul>
		<li>on a given imputation date range</li>
		<li>past a given incremental technical identification</li>
	</ul>
	The result may be subject to pagination (i.e. retrieving a partial result in case of having too many results) through a set of pages by the ASPSP. Thereafter, the AISP may ask for the first, next, previous or last page of results.`,
	notes: ['Retrieval of an account transaction set (AISP)'],
	tags: ['api', 'AISP'],
	plugins: {
		'hapi-swagger': {
			responses: {
				'200': responses.accounts['getAccountTransactions'],
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
		'hal': hal.getAccountTransactions,
	},
	validate: {
		headers: commonHeaders,
		params: params.accounts.path['getAccountTransactions'],
		query: {
			...params.accounts.query['getAccountTransactions'],
			page: Joi.number().integer()
				.positive()
				.default(1),
			pageSize: Joi.number().integer()
				.positive()
				.default(25),
			brand: Joi.string().default('bnppf'),
		},
		options: {
			allowUnknown: true,
		},
	},
	auth: {
		strategy: 'bearerToken',
		scope: 'aisp',
	},
	pre: [
		{
			assign: 'accreditation',
			method: async (request) => {
				const resourceId = request.params.accountResourceId
				const { userId, clientId } = request.auth.artifacts

				const accreditation = await accreditationPersistence.getAccreditation(userId, clientId, resourceId)

				if (!accreditation) {
					logger.error('getAccountTransactions: Accreditation not found')
					throw Boom.forbidden('Access to resource is not allowed', {
						error: 'Forbidden, access to resource is not allowed',
					})
				}

				return accreditation
			},
		},
	],
	handler: async (request, h) => {
		const accountResource = request.pre.accreditation.related('accountResource').toJSON()

		const payments = await accountService.getAccountPayments(accountResource.id, {
			page: request.query.page,
			pageSize: request.query.pageSize,
			query: { payment_information_status: PaymentRequestResource.status().ACSC }, // AcceptedSettlementCompleted: Settlement on the debtor's account has been completed. 
		})

		const transactions = await accountService.formatTransactions(accountResource.id, accountResource.resourceId, payments)

		const response = payments.length === 0
			? h.response().code(204)
			: h.response({
				...transactions,
				pagination: payments.pagination,
			}).code(200)
		response.header('X-Request-ID', request.headers['x-request-id'])
		response.header('PSU-IP-Address', request.headers['psu-ip-address'])
		response.header('PSU-IP-Port', request.headers['psu-ip-port'])
		response.header('PSU-HTTP-Method', request.headers['psu-http-method'])
		response.header('PSU-Date', request.headers['psu-date'])
		response.header('PSU-GEO-Location', request.headers['psu-geo-location'])
		response.header('PSU-User-Agent', request.headers['psu-user-agent'])
		response.header('PSU-Referer', request.headers['psu-referer'])
		response.header('PSU-Accept', request.headers['psu-accept'])
		response.header('PSU-Accept-Charset', request.headers['psu-accept-charset'])
		response.header('PSU-Accept-Encoding', request.headers['psu-accept-encoding'])
		response.header('PSU-Accept-Language', request.headers['psu-accept-language'])
		response.header('PSU-Device-ID', request.headers['psu-device-id'])
		response.header('Digest', `SHA-256=${crypto.createHash('sha256').update(JSON.stringify(response.source)).digest('base64')}`)

		return response
	},
}
