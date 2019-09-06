const log = require('../../utils/logger')
const Boom = require('boom')

const AccountIdentification = require('../../models/AccountIdentification')
const AmountType = require('../../models/AmountType')
const AccountResource = require('../../models/AccountResource')
const PaymentRequestResource = require('../../models/PaymentRequestResource')
const Accreditation = require('../../models/Accreditation')
const BalanceResource = require('../../models/BalanceResource')

exports = module.exports = {}

exports.getAccounts = async (psuId, clientId, options) => {
	const accreditation = await Accreditation
		.findAll(
			{ psu_id: psuId, tpp_id: clientId },
			{ withRelated: ['accountResource', 'accountResource.accountId'] }
		)

	const offset = (options.pageSize * options.page) - options.pageSize

	const accounts = accreditation.toJSON()
		.map((elem) => elem.account && ({
			...elem.account.toJSON({ hidden: ['id', 'balances', 'details', 'linkedAccount'] }),
			'_links': {
				'balances': {
					'href': `/v1/accounts/${elem.account.toJSON().resourceId}/balances`,
				},
				'transactions': {
					'href': `/v1/accounts/${elem.account.toJSON().resourceId}/transactions`,
				},
			},
		}))

	const accountsWithPagination = accounts.slice(offset, options.pageSize * options.page)

	return {
		accounts: accountsWithPagination,
		pagination: {
			page: options.page,
			pageSize: options.pageSize,
			totalAccounts: accounts.length,
		},
	}
}

exports.getAccountBalancesByAccountId = async (accountResourceId) => {
	const account = await AccountResource.findOne({ id: accountResourceId }, { withRelated: ['balances', 'balances.balanceAmount'] })
	return account.related('balances')
}

exports.updateBalanceResource = async (balanceId, balanceResource) => {
	return await BalanceResource.update(balanceResource, { id: balanceId })
}

exports.updateAmountType = async (balanceId, balanceAmount) => {
	try {
		await AmountType
			.where({ balance_resource_id: balanceId })
			.destroy({ require: false })

		await AmountType.create({
			...balanceAmount,
			balance_resource_id: balanceId,
		}, { require: false })
	} catch (err) {
		log.error(err)
		throw Boom.unauthorized()
	}
}

exports.getAccountIdentificationById = async (id) => {
	return await AccountIdentification.findOne({ id }, { require: false })
}

exports.getAccountIdentificationByIban = async (iban) => {
	return await AccountIdentification.findOne(
		{ iban },
		{ withRelated: ['accountResource', 'accountResource.accountId'], require: false })
}

exports.createAccountIdentification = async (accountIdentification) => {
	return await AccountIdentification.create(accountIdentification)
}

exports.getAccountPayments = async (accountResourceId, options) => {
	return await PaymentRequestResource
		.query({
			where: {
				...options.query,
				debtor_account_id: accountResourceId,
			},
			orWhere: {
				...options.query,
				creditor_account_id: accountResourceId,
			},
		})
		.fetchPage({
			page: options.page,
			pageSize: options.pageSize,
			withRelated: ['creditTransferTransaction.instructedAmount', 'creditTransferTransaction.cttRemittanceInformation'],
		})
}

exports.countTransactions = async (accountResourceId, options) => {
	return await PaymentRequestResource
		.query({
			where: {
				...options.query,
				debtor_account_id: accountResourceId,
			},
			orWhere: {
				...options.query,
				creditor_account_id: accountResourceId,
			},
		})
		.count()
}

exports.getAccountBy = (query = {}) => {
	return AccountResource.findOne(query, { withRelated: ['accountId', 'balances', 'balances.balanceAmount'] })
}
