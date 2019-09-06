const Joi = require('joi')

exports = module.exports = {}

const BalanceSchema = Joi.object().keys({
	name: Joi.string()
		.max(70),
	balanceAmount: Joi.object().keys({
		currency: Joi.string()
			.regex(/^[A-Z]{3,3}$/),
		amount: Joi.string()
			.regex(/^-{0,1}[0-9]{1,13}(\.[0-9]{0,5}){0,1}$/),
	}),
	balanceType: Joi.string().valid('CLBD', 'XPCD', 'VALU', 'OTHR'),
	lastChanceDateTime: Joi.string(),
	referenceDate: Joi.string(),
	lastCommitedTransaction: Joi.string()
		.max(40),
})

exports.BalanceSchema = BalanceSchema
