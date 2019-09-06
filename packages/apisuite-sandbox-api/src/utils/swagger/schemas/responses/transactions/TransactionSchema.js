const Joi = require('joi')

exports = module.exports = {}

const TransactionSchema = Joi.object().keys({
	resourceId: Joi.string()
		.regex(/^([a-zA-Z0-9 /\-?:().,']{1,35})$/),
	entryReference: Joi.string()
		.max(40),
	transactionAmount: Joi.object().keys({
		currency: Joi.string()
			.regex(/^[A-Z]{3,3}$/),
		amount: Joi.string()
			.regex(/^-{0,1}[0-9]{1,13}(\.[0-9]{0,5}){0,1}$/),
	}),
	creditDebitIndicator: Joi.string()
		.valid('CRDT', 'DBIT'),
	status: Joi.string()
		.valid('BOOK', 'PDNG', 'OTHR'),
	valueDate: Joi.string(),
	transactionDate: Joi.string(),
	remittanceInformation: Joi.string()
		.max(140),
})

exports.TransactionSchema = TransactionSchema
