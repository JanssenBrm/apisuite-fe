const Boom = require('boom')

const accountPersistence = require('../accounts/persistence')

const BalanceResource = require('../../models/BalanceResource')

exports = module.exports = {}

exports.checkBalance = async (iban, instructedAmount) => {
	let result = false

	// Retrieve balance amount of the AccountResource
	const accountIdentification = await accountPersistence.getAccountIdentificationByIban(iban)
	if (!accountIdentification) {
		throw Boom.notFound(`AccountIdentification with iban: ${iban} does not exist`)
	}
	const accountResourceId = accountIdentification.get('account_resource_id')
	const balance = (await accountPersistence.getAccountBalancesByAccountId(accountResourceId)).toJSON()
		.filter(b => BalanceResource.types().OTHR === b.balanceType)[0]
	const balanceAmount = balance.balanceAmount.amount

	// Check currencies
	if (instructedAmount.currency !== balance.balanceAmount.currency) {
		// check currency for USD/EUR and allow since conversion was set to 1 - 1
		const allowedCurrency = ['USD', 'EUR']
		if (allowedCurrency.indexOf(instructedAmount.currency) === -1 || allowedCurrency.indexOf(balance.balanceAmount.currency) === -1) {
			throw Boom.unauthorized('Different currencies')
		}
	}
	// Check balances
	if (parseFloat(balanceAmount) >= parseFloat(instructedAmount.amount)) {
		result = true
	}

	return result
}
