const Joi = require('joi')

exports = module.exports = {}

const accountParams = {
	accountResourceId: Joi.string()
		.regex(/^([a-zA-Z0-9 /\-?:().,'']{1,35})$/)
		.required()
		.description('Identification of account resource to fetch'),
}

const getAccountTransactionsQuery = {
	dateFrom: Joi.string()
		.description(`Inclusive minimal imputation date of the transactions. 

	Transactions having an imputation date equal to this parameter are
	included within the result.`),
	dateTo: Joi.string()
		.description(`Exclusive maximal imputation date of the transactions. 

		Transactions having an imputation date equal to this parameter are not
		included within the result.`),
	afterEntryReference: Joi.string()
		.max(40)
		.description(`Specifies the value on which the result has to be computed. 

		Only the transaction having a technical identification greater than this
		value must be included within the result`),
}

exports.accounts = {
	path: {
		getAccountBalances: accountParams,
		getAccountTransactions: accountParams,
	},
	query: {
		getAccountTransactions: getAccountTransactionsQuery,
	},
}

