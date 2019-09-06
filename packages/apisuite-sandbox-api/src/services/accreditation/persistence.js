const Boom = require('boom')

const bookshelf = require('../../utils/bookshelf')
const logger = require('../../utils/logger')
const accountPersistence = require('../../services/accounts/persistence')

const Accreditation = require('../../models/Accreditation')
const AccountOperation = require('../../models/AccountOperation')
const PSU = require('../../models/PSU')

exports = module.exports = {}

exports.createAccreditation = async (userId, clientId, scopes) => {

	const scopeList = scopes.split(' ')

	const psu = await new PSU({ id: userId }).fetch({ withRelated: ['accounts'] })

	const accounts = psu.toJSON().accounts

	// for each account check if they already have an accreditation.
	// if they do, remove.


	return await bookshelf.transaction(async (trx) => {

		await Promise.all(accounts.map((account) => {
			return new Accreditation()
				.where({
					psu_id: userId,
					tpp_id: clientId,
					account_resource_id: account.id,
				}).destroy({ require: false, transacting: trx })
		})).catch(e => e.message)

		const accreditations = await Promise.all(accounts.map((account) => {
			return Accreditation.create({
				psu_id: userId,
				tpp_id: clientId,
				account_resource_id: account.id,
			}, { transacting: trx })
				.then((accreditation) => {
					return Promise.all(scopeList.map((scope) => {

						if (scope === 'aisp' || scope === 'aisp_extended_transaction_history') {

							return Promise.all([
								AccountOperation.create({
									accreditation_id: accreditation.id,
									operation_id: 1,
								}, { transacting: trx }),
								AccountOperation.create({
									accreditation_id: accreditation.id,
									operation_id: 2,
								}, { transacting: trx }),
							])


						}

						if (scope === 'pisp') {
							return AccountOperation.create({
								accreditation_id: accreditation.id,
								operation_id: 3,
							}, { transacting: trx })
						}

						if (scope === 'piisp') {
							return AccountOperation.create({
								accreditation_id: accreditation.id,
								operation_id: 4,
							}, { transacting: trx })
						}

					}))
				})
		}))

		return accreditations
	})

}

exports.getAccreditation = async (userId, clientId, accountResourceId) => {
	// Getting the iban from the resourceId sent. accountResourceId has iban + currency (3 characters) format
	const iban = accountResourceId.slice(0, -3)

	if (!iban) {
		logger.error('Accreditation not found: accountResourceId wrong')
		throw Boom.forbidden('Access to resource is not allowed', {
			error: 'Forbidden, access to resource is not allowed',
		})
	}

	const accountIdentification = await accountPersistence.getAccountIdentificationByIban(iban)

	if (!accountIdentification) {
		logger.error('Accreditation not found: accountIdentification does not exist')
		throw Boom.forbidden('Access to resource is not allowed', {
			error: 'Forbidden, access to resource is not allowed',
		})
	}

	return await Accreditation
		.where({
			psu_id: userId,
			tpp_id: clientId,
			account_resource_id: accountIdentification.related('accountResource').get('id'),
		})
		.fetch({
			withRelated: ['accountResource', 'accountResource.accountId', 'accountResource.balances.balanceAmount'],
			require: false,
		})
}
