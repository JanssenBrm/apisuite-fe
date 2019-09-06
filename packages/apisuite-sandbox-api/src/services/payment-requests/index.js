const Boom = require('boom')

const persistence = require('./persistence')
const fcService = require('../funds-confirmations')
const accountService = require('../accounts')
const accountPersistence = require('../accounts/persistence')
const psuService = require('../psus')
const BalanceResource = require('../../models/BalanceResource')
const PaymentRequestResource = require('../../models/PaymentRequestResource')
const AcceptedAuthenticationApproach = require('../../models/AcceptedAuthenticationApproach')

// const Beneficiary = require('../../models/Beneficiary')

exports = module.exports = {}

exports.postPaymentRequest = async (payload) => {
	const { debtorAccount, creditorAccount, beneficiary } = payload

	const creditor = (beneficiary && beneficiary.creditorAccount) || creditorAccount

	if (debtorAccount && creditor && (debtorAccount.iban === creditor.iban)) throw Boom.badRequest('debtorAccount and creditorAccount must be different')

	return await persistence.postPaymentRequest(payload)
}

exports.getPaymentRequestByResourceId = async (paymentRequestResourceID) => {
	const payment = await persistence.getPaymentRequestByResourceId(paymentRequestResourceID)

	if (!payment) throw Boom.notFound()

	return payment
}

exports.updatePaymentRequestByResourceId = async (paymentRequestResourceID, payload) => {
	const prFound = await persistence.getPaymentRequestByResourceId(paymentRequestResourceID)
	if (!prFound) throw Boom.forbidden()

	if ([PaymentRequestResource.status().ACSC, PaymentRequestResource.status().RJCT].includes(prFound.get('payment_information_status'))) throw Boom.forbidden('payment already processed or rejected')

	const { debtorAccount, statusReasonInformation, creditTransferTransaction } = payload

	// Update status
	const paymentRequest = {}
	if (debtorAccount) {
		paymentRequest['payment_information_status'] = PaymentRequestResource.status().ACCP // AcceptedCustomerProfile: when the user is authenticated, the debtor account is selected and the user clicked either on the account selection or the confirm payment
	}

	if (statusReasonInformation) {
		paymentRequest['status_reason_information'] = statusReasonInformation
	}
	// Update debtor account
	if (debtorAccount) {
		const account = await accountPersistence.getAccountIdentificationByIban(debtorAccount.iban)
		if (account) {
			paymentRequest['debtor_account_id'] = account.get('id')
		}
	}

	if (Object.keys(paymentRequest).length > 0) {
		await persistence.updatePaymentRequestResourceById(paymentRequestResourceID, paymentRequest)
	}

	// Update CreditTransferTransaction status
	const cttResp = await persistence.getPRCreditTransferTransations(paymentRequestResourceID)
	for (let i = 0; i < creditTransferTransaction.length; i++) {
		const trx = creditTransferTransaction[i]
		const { transactionStatus, statusReasonInformation } = trx
		const status = {}
		if (transactionStatus) {
			status['transaction_status'] = transactionStatus
		}
		if (statusReasonInformation) {
			status['status_reason_information'] = statusReasonInformation
		}
		if (Object.keys(status).length > 0) {
			await persistence.updateCreditTransferTransactionById(paymentRequestResourceID, cttResp.toJSON()[i].id, status)
		}
	}

	return {
		resourceId: prFound.get('id'),
		appliedAuthenticationApproach: AcceptedAuthenticationApproach.approaches().REDIRECT,
	}
}

exports.confirmPaymentRequest = async (paymentRequestResourceID) => {
	const paymentRequest = await persistence.getPaymentRequestByResourceId(paymentRequestResourceID)
	if (!paymentRequest) throw Boom.forbidden()

	// Check the status to know if the confirmation can be processed
	if ([PaymentRequestResource.status().ACSC, PaymentRequestResource.status().RJCT].includes(paymentRequest.get('payment_information_status'))) throw Boom.forbidden('payment already processed or rejected')

	// Reject the payment if no debtor found
	if (!paymentRequest.get('debtor_account_id')) {
		await persistence.updatePaymentRequestResourceById(paymentRequest.get('id'), { payment_information_status: PaymentRequestResource.status().RJCT })
		throw Boom.forbidden('no debtor found')
	}

	const debtorAccount = await accountPersistence.getAccountIdentificationById(paymentRequest.get('debtor_account_id'))
	const { instructedAmount } = paymentRequest.related('creditTransferTransaction').toJSON()[0]
	const debtorEnoughFunds = await fcService.checkBalance(debtorAccount.get('iban'), instructedAmount)

	if (!debtorEnoughFunds) throw Boom.forbidden('not enough funds')

	// Update balances
	const creationDateTime = paymentRequest.get('created_at')
	const requestedExecutionDate = paymentRequest.get('requested_execution_date')

	await accountService.updateAccountBalance(debtorAccount.get('id'), -parseFloat(instructedAmount.amount), creationDateTime, requestedExecutionDate, BalanceResource.types().OTHR)
	// TODO: change when the closing balance (CLBD) has to be updated when receive more information. For now, immediately
	await accountService.updateAccountBalance(debtorAccount.get('id'), -parseFloat(instructedAmount.amount), creationDateTime, requestedExecutionDate, BalanceResource.types().CLBD)

	const creditorAccount = await accountPersistence.getAccountIdentificationById(paymentRequest.get('creditor_account_id'))
	if (debtorAccount.get('iban') === creditorAccount.get('iban')) {
		await persistence.updatePaymentRequestResourceById(paymentRequest.get('id'), { payment_information_status: PaymentRequestResource.status().RJCT })

		throw Boom.badRequest('Payment failed: debtor and creditor account are identical')
	}
	const creditorExists = await psuService.hasAccount(creditorAccount.get('iban'))
	if (creditorAccount && creditorExists) {
		await accountService.updateAccountBalance(creditorAccount.get('id'), instructedAmount.amount, creationDateTime, requestedExecutionDate, BalanceResource.types().OTHR)
		// TODO: change when the closing balance (CLBD) has to be updated when receive more information. For now, immediately
		await accountService.updateAccountBalance(creditorAccount.get('id'), instructedAmount.amount, creationDateTime, requestedExecutionDate, BalanceResource.types().CLBD)
	}

	// Change the status of the payment request to ACSC: AcceptedSettlementCompleted
	await persistence.updatePaymentRequestResourceById(paymentRequestResourceID, { payment_information_status: PaymentRequestResource.status().ACSC })

	const paymentUpdated = await persistence.getPaymentRequestByResourceId(paymentRequestResourceID)
	return {
		...paymentUpdated.toJSON({
			hidden: [
				'debtorAccountId', 'creditorAccountId', 'fundsAvailability', 'booking', 'requestedExecutionDate',
				'creditTransferTransaction.id', 'creditTransferTransaction.endDate', 'creditTransferTransaction.executionRule', 'creditTransferTransaction.frequency', 'creditTransferTransaction.transactionStatus', 'creditTransferTransaction.statusReasonInformation',
			],
		}),
		debtorAccount: debtorAccount.toJSON(),
		creditorAccount: creditorAccount.toJSON(),
	}
}

exports.executePendingPayments = async () => {
	// Get the pending payments
	const query = {
		where: {
			payment_information_status: PaymentRequestResource.status().ACSC,
		},
	}
	const pendingPayments = await persistence.getPaymentRequests(query)
	pendingPayments.toJSON().forEach(async paymentRequest => {
		// Check the requestedExecutionDate to know if the confirmation can be processed
		if (new Date(paymentRequest.requestedExecutionDate).getTime() > Date.now()) return

		// Reject the paymentRequest if no debtor found
		const debtorAccount = await accountPersistence.getAccountIdentificationById(paymentRequest.debtorAccountId)

		if (!debtorAccount || !debtorAccount.get('iban')) {
			await persistence.updatePaymentRequestResourceById(paymentRequest.resourceId, { payment_information_status: PaymentRequestResource.status().RJCT })
			return
		}

		const { instructedAmount } = paymentRequest.creditTransferTransaction[0]
		const debtorEnoughFunds = await fcService.checkBalance(debtorAccount.get('iban'), instructedAmount)

		if (!debtorEnoughFunds) return

		// Update balances
		const creationDateTime = paymentRequest.creationDateTime
		const requestedExecutionDate = paymentRequest.requestedExecutionDate

		await accountService.updateAccountBalance(debtorAccount.get('id'), -parseFloat(instructedAmount.amount), creationDateTime, requestedExecutionDate, BalanceResource.types().CLBD)
		const creditorAccount = await accountPersistence.getAccountIdentificationById(paymentRequest.creditorAccountId)
		const creditorExists = await psuService.hasAccount(creditorAccount.get('iban'))
		if (creditorAccount && creditorExists) {
			await accountService.updateAccountBalance(creditorAccount.get('id'), instructedAmount.amount, creationDateTime, requestedExecutionDate, BalanceResource.types().CLBD)
		}
	})
}
