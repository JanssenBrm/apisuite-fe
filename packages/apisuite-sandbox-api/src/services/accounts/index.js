const persistence = require('./persistence')
const moment = require('moment')

exports = module.exports = {}

exports.getAccounts = async (psuId, clientId, options) => {
	return await persistence.getAccounts(psuId, clientId, options)
}

exports.updateAccountBalance = async (accountId, amount, creationDateTime, requestedExecutionDate, type) => {
	// Corresponds to the entryReference of the transaction (booking date + operation timestamp, example 2018012120180130123000)
	const lastCommittedTransaction = moment(creationDateTime).format('YYYYMMDD') + moment(requestedExecutionDate).format('YYYYMMDDHHmmssSSSSSS')

	const balances = await persistence.getAccountBalancesByAccountId(accountId)
	for (const balance of balances.toJSON()) {
		if (balance.balanceType === type) {
			const amountToSaved = parseFloat(balance.balanceAmount.amount) + parseFloat(amount)

			// Update balance amount
			await persistence.updateAmountType(balance.id, {...balance.balanceAmount, amount: amountToSaved.toString()})

			// Update lastCommittedTransaction
			await persistence.updateBalanceResource(balance.id, {
				last_committed_transaction: lastCommittedTransaction,
				last_change_date_time: new Date(),
			})
		}
	}
}

exports.getAccountPayments = async (accountId, options) => {
	return await persistence.getAccountPayments(accountId, options)
}

exports.getAccountBy = (query) => {
	return persistence.getAccountBy(query)
}

exports.formatTransactions = async (accountId, accountResourceId, payments) => {
	const transactions = await Promise.all(payments.toJSON().map(async p => {
		const creditDebitIndicator = p.debtorAccountId === accountId ? 'DBIT' : 'CRDT'
		let requestedExecutionDate = p.requestedExecutionDate
		const transactionAmount = p.creditTransferTransaction && p.creditTransferTransaction.length > 0 && p.creditTransferTransaction[0].instructedAmount
		if (transactionAmount && transactionAmount.amount && creditDebitIndicator === 'DBIT') {
			transactionAmount.amount = `-${transactionAmount.amount}`
		}
		const remittanceInformation = p.creditTransferTransaction && p.creditTransferTransaction.length > 0 && p.creditTransferTransaction[0].remittanceInformation
		const status = new Date(requestedExecutionDate).getTime() < Date.now() ? 'BOOK' : 'OTHER'
		// Corresponds to the entryReference of the transaction (booking date + operation timestamp)
		const entryReference = moment(p.creationDateTime).format('YYYYMMDD') + moment(requestedExecutionDate).format('YYYYMMDDHHmmssSSSSSS')
		requestedExecutionDate = new Date(requestedExecutionDate).getTime() < Date.now() ? Date.now() : requestedExecutionDate

		return {
			resourceId: accountResourceId,
			entryReference,
			transactionAmount,
			creditDebitIndicator,
			status,
			bookingDate: moment(p.creationDateTime).format('YYYY-MM-DD'),
			valueDate: moment(requestedExecutionDate).format('YYYY-MM-DD'),
			transactionDate: moment(requestedExecutionDate).format('YYYY-MM-DD'),
			remittanceInformation,
		}
	}))

	return {
		transactions,
	}
}
