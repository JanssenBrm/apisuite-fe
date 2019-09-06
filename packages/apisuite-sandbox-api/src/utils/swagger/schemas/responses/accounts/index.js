const Joi = require('joi')
const account = require('./AccountSchema')
const balance = require('../balances/BalanceSchema')
const transaction = require('../transactions/TransactionSchema')

exports = module.exports = {}

exports.getAccounts = Joi.object().keys({
	connectedPsu: Joi.string()
		.max(70)
		.description(`Last name and first name that has granted access to the AISP on the
		accounts data

		This information can be retrieved based on the PSU's authentication
		that occurred during the OAUTH2 access token initialisation.`),
	accounts: Joi.array()
		.items(account.AccountSchema)
		.description('List of PSU account that are made available to the TPP'),
})

exports.getAccountBalances = Joi.object().keys({
	balances: Joi.array()
		.items(balance.BalanceSchema)
		.min(1)
		.description('List of account balances'),
})

exports.getAccountTransactions = Joi.object().keys({
	transactions: Joi.array()
		.items(transaction.TransactionSchema)
		.description('List of transactions'),
})
