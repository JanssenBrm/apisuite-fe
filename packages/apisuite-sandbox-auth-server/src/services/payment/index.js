const axios = require('axios')
const https = require('https')
const uuid = require('uuid/v4')
const boom = require('boom')
const fs = require('fs')

const logger = require('../../utils/logger')
const config = require('../../../config')
const apiGateway = config.get('kong').gateway.url
const imageTag = config.get('sandbox').imageTag

const { withCert, certPath, keyPath, certPassphrase } = config.get('certificate')
const agentOptions = withCert && certPath && keyPath && fs.existsSync(certPath) && fs.existsSync(keyPath)
	? ({
		cert: fs.readFileSync(certPath),
		key: fs.readFileSync(keyPath),
		passphrase: certPassphrase,
	})
	: {}

const psuService = require('../psu')

exports = module.exports = {}

exports.getPayment = async (container, paymentRequestId, token) => {
	const instance = axios.create({
		httpsAgent: new https.Agent({
			rejectUnauthorized: false,
			...agentOptions,
		}),
		headers: {
			'X-APISuite-Organization': container,
			'X-APISuite-Stet-Version': imageTag,
			'Authorization': `Bearer ${token}`,
			'X-Request-Id': uuid(),
			'Signature': uuid(),
		},
	})

	return await instance.get(`${apiGateway}/v1/payment-requests/${paymentRequestId}`)
}

exports.confirmPayment = async (container, paymentRequestId, payload, token) => {
	const instance = axios.create({
		httpsAgent: new https.Agent({
			rejectUnauthorized: false,
			...agentOptions,
		}),
		headers: {
			'X-APISuite-Organization': container,
			'X-APISuite-Stet-Version': imageTag,
			'Authorization': `Bearer ${token}`,
			'X-Request-Id': uuid(),
			'Signature': uuid(),
		},
	})

	return await instance.post(`${apiGateway}/payment-requests/${paymentRequestId}/consent`, payload)
}

/**
 *
 * @param {*} clientId				- TPP client id
 * @param {*} token						- token
 * @param {*} paymentRequest	- payment to process
 * @returns {void}
 */
exports.checkPaymentValidity = async (clientId, token, paymentRequest) => {
	const { debtorAccount, paymentInformationStatus } = paymentRequest.data.paymentRequest
	const isPaymentAlreadyProcessed = paymentInformationStatus === 'ACSC' || paymentInformationStatus === 'RJCT'

	if (isPaymentAlreadyProcessed) {
		logger.error('The payment has already been processed')
		throw boom.unauthorized()
	}

	if (!debtorAccount) {
		return
	}

	const psuAccounts = await psuService.getPsuAccounts(clientId, token)
	const accounts = Array.isArray(psuAccounts) ? psuAccounts : [psuAccounts]

	const debtorAccountMatch = accounts.filter(account => account.accountId && account.accountId.iban === debtorAccount.iban).length > 0

	if (!accounts || accounts.length === 0 || !debtorAccountMatch) {
		logger.error('The debtor account does not belong to the PSU')
		throw boom.unauthorized()
	}
}

