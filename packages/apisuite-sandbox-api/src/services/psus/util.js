const Chance = require('chance')
const chance = new Chance()
const iban = require('iban')
const moment = require('moment')
const PSU = require('../../models/PSU')
const AccountIdentification = require('../../models/AccountIdentification')

const psuStatus = ['AccountHolder', 'Co-Account Holder']

/**
 * Check if username is unique.
 *
 * @param {String} username - The user name
 * @param {Object} trx - Database transaction
 * @returns {Boolean} - If it's unique or not.
 */
const isUniqueUsername = async (username, trx) => {
	let psu = await PSU.forge({ username: username }).fetch({ transacting: trx })
	psu = psu && psu.toJSON ? psu.toJSON() : psu
	return psu ? true : false
}

/**
 * Check if the IBAN is unique
 *
 * @param {String} iban - The IBAN number
 * @param {Object} trx - Database transaction
 * @returns {Boolean} - If the IBAN is unique
 */
const checkIBAN = async (iban, trx) => {
	let IBAN = await AccountIdentification.forge({ iban: iban }).fetch({ transacting: trx })
	IBAN = IBAN && IBAN.toJSON ? IBAN.toJSON() : IBAN
	return IBAN ? true : false
}

/**
 * Generate the username.
 *
 * @param {Object} trx - Database transaction
 * @returns {String} - The username
 */
const genenateUsername = async (trx) => {
	const username = chance.string({ length: 10, pool: '1234567890' })
	if (await isUniqueUsername(username, trx)) {
		return await genenateUsername(trx)
	}
	return username
}

/**
 * Generate the postal address.
 *
 * @param {Number} psuId - The PSU id.
 * @returns {Object} - The Postal Address.
 */
const generatePostalAddress = (psuId) => {
	return {
		country: 'BE',
		psu_id: psuId,
	}
}

/**
 * Generate the address lines.
 *
 * @param {Number} postalAddressId - The postal adress id.
 * @returns {[Object]} - The address lines
 */
const generateAddressLines = (postalAddressId) => {
	return [{
		address_line: chance.street(),
		postal_address_id: postalAddressId,
	},
	{
		address_line: chance.address(),
		postal_address_id: postalAddressId,
	}]
}

/**
 * Generate a fake IBAN number
 *
 * @param {Object} trx - Database transaction
 * @returns {String} - The IBAN
 */
const generateIBAN = async (trx) => {
	const _iban = `BE${chance.string({ length: 14, pool: '1234567890' })}`
	if (iban.isValid(_iban) && await checkIBAN(_iban, trx)) {
		return generateIBAN(trx)
	}

	return _iban
}

/**
 * Generate the PSU account data
 *
 * @param {String} name - The user name
 * @param {Object} accountType - The type of account data
 * @returns {Object} - The PSU account data
 */
const generateAccountResource = (name, accountType) => {
	return {
		bic_fi: 'GEBABBEB',
		name: `${name} - ${accountType.brand.toUpperCase()}`,
		usage: 'PRIV',
		cash_account_type: 'CACC',
		product: `CUR - ${accountType.brand.toUpperCase()}`,
		currency: accountType.currency.toUpperCase(),
		psu_status: chance.pickone(psuStatus),
	}
}

/**
 * Get the balance resource info.
 *
 * @param {Number} account_resource_id - The account resource id.
 * @returns {[Object]} - The balance resourse
 */
const generateBalanceResource = (account_resource_id) => {
	const today = new Date().toISOString()
	const lastCommittedTransaction = moment(today).format('YYYYMMDD') + moment(today).format('YYYYMMDDHHmmssSSSSSS')
	return [
		{
			name: 'Closing balance',
			balance_type: 'CLBD',
			last_change_date_time: today,
			reference_date: today.slice(0, 10),
			last_committed_transaction: lastCommittedTransaction,
			account_resource_id: account_resource_id,
		},
		{
			name: 'Operational Balance',
			balance_type: 'OTHR',
			last_change_date_time: today,
			reference_date: today.slice(0, 10),
			last_committed_transaction: lastCommittedTransaction,
			account_resource_id: account_resource_id,
		},
	]

}

/**
 * Generate the amount for each account.
 *
 * @param {Number} balanceId - The balance resource id.
 * @param {Number} currency - The amount currency.
 * @returns {Object} - The account amount.
 */
const genenateAmountType = (balanceId, currency) => {
	return {
		currency: currency.toUpperCase(),
		amount: '100.00',
		balance_resource_id: balanceId,
	}
}

exports = module.exports = {
	genenateUsername,
	generatePostalAddress,
	generateAddressLines,
	generateAccountResource,
	generateIBAN,
	generateBalanceResource,
	genenateAmountType,
}
