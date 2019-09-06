const Joi = require('joi')
const Boom = require('boom')
const logger = require('../../utils/logger')

const psuService = require('../../services/psus')
const accountService = require('../../services/accounts')
const PaymentRequestResource = require('../../models/PaymentRequestResource')

exports = module.exports = {}

/**
 * POST /auth/psu handler
 */
exports.validatePsu = {
	id: 'getPsu',
	description: 'gets a psu',
	validate: {
		payload: {
			username: Joi.string().required(),
			password: Joi.string().required(),
		},
	},
	handler: async (request) => {
		const username = request.payload.username
		const password = request.payload.password
		let result

		try {
			result = await psuService.validatePsu(username, password)
		} catch (error) {
			logger.error(error)
			throw Boom.internal(error.message)
		}

		if (!result) result.authenticated = false

		if (result && !result.authenticated) throw Boom.forbidden('invalid username and/or password')

		return result
	},
}

/** 
 * GET /admin/psus handler
 */
exports.getPSUs = {
	id: 'psusGet',
	description: 'Get the PSUs',
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			responses: {
				'200': {
					description: 'OK',
				},
			},
		},
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
	},
	auth: {
		strategy: 'bearerToken',
		scope: 'internal',
	},
	handler: async (request) => {
		try {
			const psus = await psuService.getPSUs({
				page: request.query.page,
				pageSize: request.query.pageSize,
			})

			return {
				users: psus.toJSON(),
				pagination: psus.pagination,
			}
		} catch (error) {
			logger.error(error)
			throw Boom.internal(error.message)
		}
	},
}

/** 
 * GET /admin/psus/{psuId} handler
 */
exports.getPSUDetails = {
	id: 'psusGetDetails',
	description: 'Get the PSU details',
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			responses: {
				'200': {
					description: 'OK',
				},
			},
		},
	},
	validate: {
		params: {
			psuId: Joi.number().integer(),
		},
		query: {
			brand: Joi.string().default('bnppf'),
		},
	},
	auth: {
		strategy: 'bearerToken',
		scope: 'internal',
	},
	handler: async (request) => {
		try {
			return await psuService.getPSU(request.params.psuId)
		} catch (error) {
			logger.error(error)
			throw Boom.internal(error.message)
		}
	},
}

/** 
 * PUT /admin/psus/{psuId} handler
 */
exports.updatePSU = {
	id: 'psusPutDetails',
	description: 'Updates a PSU details',
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			responses: {
				'200': {
					description: 'OK',
				},
			},
		},
	},
	validate: {
		params: {
			psuId: Joi.number().integer(),
		},
		query: {
			brand: Joi.string().default('bnppf'),
		},
		payload: {
			name: Joi.string().required(),
			password: Joi.string().required(),
			email: Joi.string().required(),
			avatarUrl: Joi.string().allow(null, '').default(''),
		},
	},
	auth: {
		strategy: 'bearerToken',
		scope: 'internal',
	},
	handler: async (request) => {
		try {
			const { params, payload } = request
			const { psuId } = params
			await psuService.updatePSU(psuId, payload)

			return await psuService.getPSU(psuId)
		} catch (error) {
			logger.error(error)
			throw Boom.internal(error.message)
		}
	},
}

/** 
 * GET /admin/psus/accounts handler
 */
exports.getPSUAccounts = {
	id: 'psusGetAccounts',
	description: 'Get the PSU Accounts',
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			responses: {
				'200': {
					description: 'OK',
				},
			},
		},
	},
	auth: {
		strategy: 'bearerToken',
	},
	handler: async (request) => {
		try {
			const accounts = await psuService.getPSUAccounts(request.auth.artifacts.userId)
			return accounts
		} catch (error) {
			logger.error(error)
			throw Boom.internal(error.message)
		}
	},
}

/** 
 * GET /admin/accounts/{accountId}/transactions handler
 */
exports.getAccountTransactions = {
	id: 'psusGetAccountTransactions',
	description: 'Get the account transactions',
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			responses: {
				'200': {
					description: 'OK',
				},
			},
		},
	},
	validate: {
		params: {
			accountId: Joi.number().integer(),
		},
		query: {
			brand: Joi.string().default('bnppf'),
			page: Joi.number().integer()
				.positive()
				.default(1),
			pageSize: Joi.number().integer()
				.positive()
				.default(25),
		},
	},
	auth: {
		strategy: 'bearerToken',
		scope: 'internal',
	},
	handler: async (request) => {
		try {
			const { accountId } = request.params

			const payments = await accountService.getAccountPayments(accountId, {
				page: request.query.page,
				pageSize: request.query.pageSize,
				query: { payment_information_status: PaymentRequestResource.status().ACSC }, // AcceptedSettlementCompleted: Settlement on the debtor's account has been completed. 
			})

			const accountResource = await accountService.getAccountBy({ id: accountId })
			const transactions = await accountService.formatTransactions(accountId, accountResource.toJSON().resourceId, payments)

			const response = payments.length === 0
				? {
					iban: accountResource.toJSON().accountId.iban,
					transactions: [],
				} : {
					iban: accountResource.toJSON().accountId.iban,
					...transactions,
					pagination: payments.pagination,
				}

			return response
		} catch (error) {
			logger.error(error)
			throw Boom.internal(error.message)
		}
	},
}

/**
* POST /admin/psus handler
*/
exports.addPSU = {
	id: 'psusPOST',
	description: 'Add a PSU',
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			responses: {
				'200': {
					description: 'OK',
				},
			},
		},
	},
	validate: {
		query: {
			brand: Joi.string().default('bnppf'),
		},
		payload: Joi.object().keys({
			fullName: Joi.string().required(),
			email: Joi.string().required(),
			avatar: Joi.string().optional(),
			passPhrase: Joi.string().min(12).required(),
			accountTypes: Joi.array().items(
				Joi.object().keys({
					id: Joi.number().required(),
					brand: Joi.string().required(),
					currency: Joi.string().required(),
				}).unknown(true)
			).required(),
		}),
	},
	auth: {
		strategy: 'bearerToken',
		scope: 'internal',
	},
	handler: async (request) => {
		try {
			return psuService.addPSU(request.payload)
		} catch (error) {
			logger.error(error)
			throw Boom.internal(error.message)
		}
	},
}
