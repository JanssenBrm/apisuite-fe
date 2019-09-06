const psuService = require('../../services/psu')
const paymentService = require('../../services/payment')
const appService = require('../../services/app')
const boom = require('boom')
const Joi = require('joi')
const logger = require('../../utils/logger')
const brandUtils = require('../../utils/brand')

exports = module.exports = {}


exports.home = {

	handler: async (request, h) => {

		return h.view('home')
	},
}

exports.consentGET = {
	auth: {
		mode: 'required',
		strategy: 'session',
	},
	handler: async (request, h) => {
		const token = request.auth.credentials.token.token
		const clientId = request.auth.credentials.clientId

		const container = await appService.findAppContainerByClientId(clientId)

		if (!container) throw boom.badData('container not found')

		// need to get the current payment request...

		let paymentRequest
		try {
			paymentRequest = await paymentService.getPayment(container.name, request.params.id, token)
		} catch (error) {
			logger.error(error)
			throw boom.internal(error)
		}

		await paymentService.checkPaymentValidity(clientId, token, paymentRequest)

		// set the brand
		const brand = paymentRequest.data.paymentRequest.brand

		return h.view('consent', {
			id: request.params.id,
			clientId: request.query.client_id,
			paymentRequest: paymentRequest.data.paymentRequest,
			brand: await brandUtils.getBrand(brand, clientId, request.params.id, token),
		})
	},
}

exports.accountSelection = {
	auth: {
		mode: 'required',
		strategy: 'session',
	},
	handler: async (request, h) => {
		const token = request.auth.credentials.token.token
		const clientId = request.auth.credentials.clientId

		// List this PSU's accounts and pass them to the view
		let accounts
		try {
			const result = await psuService.getPsuAccounts(clientId, token)

			accounts = Array.isArray(result) ? result : [result]

		} catch (error) {
			logger.error(error)
			throw boom.internal(error)
		}


		if (!accounts || accounts.length === 0) {
			logger.error('Could not retrieve accounts for the connected PSU')
			throw boom.forbidden('Could not retrieve accounts for this PSU')
		}

		return h.view('account-selection', {
			id: request.params.id,
			accounts,
			clientId: request.query.client_id,
			brand: await brandUtils.getBrand(null, clientId, request.params.id, token),
		})
	},
}

exports.consentPOST = {
	auth: {
		mode: 'required',
		strategy: 'session',
	},
	validate: {
		params: {
			id: Joi.number().integer()
				.required(),
		},
		payload: Joi.object({
			account_selection: Joi.string(),
		}),
	},
	handler: async (request, h) => {
		const { auth, payload, query } = request
		const clientId = query.client_id

		const token = auth.credentials.token.token
		const container = await appService.findAppContainerByClientId(clientId)

		if (!container) throw boom.badData('container not found')

		const paymentRequest = await paymentService.getPayment(container.name, request.params.id, token)

		await paymentService.checkPaymentValidity(clientId, token, paymentRequest)

		const account = {
			iban: payload.account_selection,
		}

		delete paymentRequest.data._links

		const updatedPaymentRequest = {
			...paymentRequest.data.paymentRequest,
			debtorAccount: account,
		}

		let result = {}
		try {
			result = await paymentService.confirmPayment(container.name, request.params.id, updatedPaymentRequest, token)
		} catch (error) {
			logger.error(error)
			result = 500
		}

		let redirectUrl

		logger.info(`payment request status code ${result.status}`)
		if (result.status === 200)
			redirectUrl = paymentRequest.data.paymentRequest.supplementaryData.successfulReportUrl
		else
			redirectUrl = paymentRequest.data.paymentRequest.supplementaryData.unsuccessfulReportUrl

		return h.response({ redirect: redirectUrl }).code(200)
	},
}

/**
 * Handler for /payment-requests/{id}/cancel
 */
exports.cancelPOST = {
	auth: {
		mode: 'required',
		strategy: 'session',
	},
	validate: {
		params: {
			id: Joi.number().integer()
				.required(),
		},
	},
	handler: async (request, h) => {
		const { auth, query } = request
		const clientId = query.client_id

		const token = auth.credentials.token.token
		const container = await appService.findAppContainerByClientId(clientId)

		if (!container) throw boom.badData('container not found')

		const paymentRequest = await paymentService.getPayment(container.name, request.params.id, token)

		const	redirectUrl = paymentRequest.data.paymentRequest.supplementaryData.unsuccessfulReportUrl
		return h.response({ redirect: redirectUrl })
	},
}
