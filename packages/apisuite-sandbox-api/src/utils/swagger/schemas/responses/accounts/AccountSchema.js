const Joi = require('joi')
const balance = require('../balances/BalanceSchema')

exports = module.exports = {}

const AccountSchema = Joi.object().keys({
	resourceId: Joi.string()
		.regex(/^([a-zA-Z0-9 /\-?:().,']{1,35})$/),
	bicFi: Joi.string()
		.regex(/^[A-Z]{6,6}[A-Z2-9][A-NP-Z0-9]([A-Z0-9]{3,3}){0,1}$/),
	accountId: Joi.object().keys({
		iban: Joi.string()
			.regex(/^[A-Z]{2,2}[0-9]{2,2}[a-zA-Z0-9]{1,30}$/),
		other: Joi.object().keys({
			identification: Joi.string(),
			schemaName: Joi.string(),
			issuer: Joi.string(),
		}),
	}),
	name: Joi.string()
		.max(70),
	details: Joi.string()
		.max(140),
	linkedAccount: Joi.string()
		.max(70),
	usage: Joi.string()
		.valid('PRIV', 'ORGA'),
	cashAccountType: Joi.string()
		.valid('CCAC', 'CARD'),
	product: Joi.string()
		.max(35),
	currency: Joi.string()
		.max(3),
	balances: Joi.array()
		.items(balance.BalanceSchema),
	psuStatus: Joi.string()
		.max(35),
})

exports.AccountSchema = AccountSchema
