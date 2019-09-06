const persistence = require('./persistence')
const PSU = require('../../models/PSU')

const accountPersistence = require('../accounts/persistence')
const PaymentRequestResource = require('../../models/PaymentRequestResource')

const util = require('./util')

const Bookshelf = require('../../utils/bookshelf')

const PostalAddress = require('../../models/PostalAddress')
const AddressLine = require('../../models/AddressLine')
const AddressLines = Bookshelf.Collection.extend({
	model: AddressLine,
})
const AccountResource = require('../../models/AccountResource')
const AccountResources = Bookshelf.Collection.extend({
	model: AccountResource,
})
const AccountIdentification = require('../../models/AccountIdentification')
const AccountsIdentification = Bookshelf.Collection.extend({
	model: AccountIdentification,
})
const BalanceResource = require('../../models/BalanceResource')
const BalanceResources = Bookshelf.Collection.extend({
	model: BalanceResource,
})
const AmountType = require('../../models/AmountType')
const AmountTypes = Bookshelf.Collection.extend({
	model: AmountType,
})
const logger = require('../../utils/logger')

exports = module.exports = {}

exports.validatePsu = async (username, password) => {

	const psu = await persistence.getPsuByUsername(username)

	if (password !== psu.password) {
		return { authenticated: false }
	}

	return {
		authenticated: true,
		psu: {
			id: psu.id,
			username: psu.username,
			name: psu.name,
		},
	}
}

/**
 * Get PSUs service
 * @async
 * @param {Object} options 				- pagination options
 * @returns	{Object} psus 				-
 */
exports.getPSUs = async (options) => {
	return await persistence.getPSUs(options)
}

exports.hasAccount = async (iban) => {
	const psus = await PSU.findAll({}, {
		withRelated: ['postalAddress', 'postalAddress.addressLine', 'accounts.accountId'],
	})

	// Check is any psu has that account
	return psus && psus.toJSON().filter(psu => psu.accounts && psu.accounts.filter(account => account.accountId.iban === iban).length > 0).length > 0
}

/**
 * Get PSU Accounts service
 * @async
 * @param {Number} psuId - psu id
 * @param {Object} options 				- pagination options
 * @returns	{Object} psus 				-
 */
exports.getPSUAccounts = async (psuId) => {
	return await persistence.getPSUAccounts(psuId)
}

/**
 * Get the PSU with the accounts data.
 * @param {Number} psuId - The PSU id.
 * @returns {Object} - The PSU data.
 */
const getPSU = async (psuId) => {
	const psu = await persistence.getPSU(psuId)

	const accountWithTotalTransactions = await Promise.all(
		psu.related('accounts').map(async account => {

			const totalTransactions = await accountPersistence.countTransactions(
				account.id,
				{
					query: {
						payment_information_status: PaymentRequestResource.status().ACSC,
					}, // AcceptedSettlementCompleted: Settlement on the debtor's account has been completed. 
				})

			return {
				...account.toJSON(),
				totalTransactions,
			}
		}),
	)


	return {
		...psu.toJSON(),
		accounts: accountWithTotalTransactions,
	}
}

exports.getPSU = getPSU

exports.updatePSU = async (psuId, payload) => {
	return await persistence.updatePSU(psuId, payload)
}

/**
	* Generate the psu data from the received.
	*
	* @param {Object} psu - The received PSU data.
	* @returns {Object} - The completed PSU data.
	*/
exports.addPSU = async (psu) => {
	return Bookshelf.transaction(async (trx) => {
		const username = await util.genenateUsername(trx)
		const _psu = {
			username,
			name: psu.fullName,
			password: psu.passPhrase,
			email: psu.email,
			language: 'EN',
		}
		if(psu.avatar) {
			_psu.avatar_url = psu.avatar
		}
		// create PSU in database
		const _createdPSU = await new PSU(_psu).save(null, { transacting: trx })

		// create and save PSU postal information in the database
		const _postalAddress = util.generatePostalAddress(_createdPSU.id)
		const _createdPostalAddress = await new PostalAddress(_postalAddress).save(null, { transacting: trx })
		const _addressLine = util.generateAddressLines(_createdPostalAddress.id)
		await AddressLines.forge(_addressLine).invokeThen('save', null, { transacting: trx })

		// create and save PSU account information in the database
		const _accountsResource = psu.accountTypes.map((accountType) => {
			return util.generateAccountResource(psu.fullName, accountType)
		})
		const _createdAccountsResource = await AccountResources.forge(_accountsResource).invokeThen('save', null, { transacting: trx })
		const _accountsIdentification = await Promise.all(_createdAccountsResource.map(async (account) => {
			return {
				iban: await util.generateIBAN(trx),
				account_resource_id: account.id,
			}
		}))
		await AccountsIdentification.forge(_accountsIdentification).invokeThen('save', null, { transacting: trx })

		let _balanceResourse = _accountsIdentification.map((accountIden) => {
			return util.generateBalanceResource(accountIden.account_resource_id)
		})
		_balanceResourse = [].concat.apply([], _balanceResourse)
		let _createdBalanceResourse = await BalanceResources.forge(_balanceResourse).invokeThen('save', null, { transacting: trx })
		const _amountType = _createdBalanceResourse.map((balance) => {
			let acc = _createdAccountsResource.find((ac) => {
				const bal = balance && balance.toJSON ? balance.serialize() : balance
				return ac.id === bal.account_resource_id
			})
			acc = acc && acc.toJSON ? acc.toJSON() : acc
			return util.genenateAmountType(balance.id, acc.currency)
		})
		await AmountTypes.forge(_amountType).invokeThen('save', null, { transacting: trx })

		await _createdPSU.accounts().attach(_createdAccountsResource, {
			transacting: trx,
		})

		return _createdPSU
	}).then(async (psu) => {
		return await getPSU(psu.id)
	}).catch((err) => {
		logger.error(err)
		throw err
	})
}
