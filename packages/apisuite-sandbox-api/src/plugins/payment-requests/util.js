const Joi = require('joi')

const postalAddress = Joi.object().keys({
	country: Joi.string()
		.required()
		.example('FR'),
	addressLine: Joi.array()
		.items(Joi.string().required()),
})
	.optional()

const commonEntity = Joi.object().keys({
	identification: Joi.string()
		.description('API: Identifier')
		.example('FD37G')
		.required(),
	schemeName: Joi.string()
		.description('Name of the identification scheme')
		.max(70)
		.example('BANK')
		.required(),
	issuer: Joi.string()
		.max(35)
		.optional().allow('', null)
		.example('BICXYYTTZZZ')
		.description('Entity that assigns the identification'),
})
	.optional()

const party = Joi.object().keys({
	name: Joi.string()
		.max(140)
		.required()
		.example('PartyName')
		.description('ISO20022: Name by which a party is known and which is usually used to identify that party.'),
	postalAddress: postalAddress,
	organisationId: commonEntity,
	privateId: commonEntity,
})

exports.beneficiary = Joi.object().keys({
	id: Joi.string()
		// eslint-disable-next-line no-useless-escape
		.regex(/^([a-zA-Z0-9 /\-?:\()\.,']{1,35})$/)
		.optional().allow('', null)
		.description('Id of the beneficiary'),
	isTrusted: Joi.boolean()
		.optional()
		.description('The ASPSP having not implemented the trusted beneficiaries list must not set this flag. Otherwise, the ASPSP indicates whether or not the beneficiary has been registered by the PSU within the trusted beneficiaries list.'),
	creditorAgent: Joi.object().keys({
		bicFi: Joi.string()
			.regex(/^[A-Z]{6,6}[A-Z2-9][A-NP-Z0-9]([A-Z0-9]{3,3}){0,1}$/)
			.required()
			.example('AAAAAAZ0')
			.description('ISO20022: Code allocated to a financial institution by the ISO 9362 Registration Authority as described in ISO 9362 "Banking - Banking telecommunication messages - Business identification code (BIC)".'),
		clearingSystemMemberId: Joi.object().keys({
			clearingSystemId: Joi.string()
				.max(35)
				.optional().allow('', null)
				.description('ISO20022: Specification of a pre-agreed offering between clearing agents or the channel through which the payment instruction is processed.'),
			memberId: Joi.string()
				.max(35)
				.optional().allow('', null)
				.description('ISO20022: Identification of a member of a clearing system.'),
		}),
		name: Joi.string()
			.max(140)
			.optional().allow('', null)
			.example('Institution')
			.description('Name of the financial institution'),
		postalAddress: postalAddress,
	})
		.optional()
		.description('ISO20022: Unique and unambiguous identification of a financial institution, as assigned under an internationally recognised or proprietary identification scheme.'),
	creditor: party
		.required()
		.description('API : Description of a Party which can be either a person or an organization.'),
	creditorAccount: Joi.object().keys({
		iban: Joi.string()
			.optional().allow('', null)
			.example('YY64COJH41059545330222956960771321'),
		other: commonEntity,
	})
		.optional()
		.description('Unique and unambiguous identification for the account between the account owner and the account servicer.'),
})
	.optional()
	.description('Specification of a beneficiary')

exports.statusReasonInformation = Joi.string()
	.optional()
	.description('ISO20022: Provides detailed information on the status reason.')
	.valid('AC01', 'AC04', 'AC06', 'AG01', 'CH03', 'CUST', 'DS02', 'FF01', 'FRAD', 'MS03', 'NOAS', 'RR01', 'RR03', 'RR04', 'RR12')
	.example('AC01')

exports.postalAddress = postalAddress
exports.commonEntity = commonEntity
exports.party = party

/**
	* Checks if the currency is valid 
	*
	* @param {String} currency -
	* @returns {Boolean} -
	*/
exports.isCurrencyValid = (currency) => {
	const validCurrencies = ['EUR', 'USD']
	return validCurrencies.includes(currency)
}
