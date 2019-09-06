const BaseModel = require('./BaseModel')

/**
 * AccountResource model
 */
class AccountResource extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String}			- table name
	 */
	get tableName() { return 'account_resource' }

	/**
	 *	Returns timestamps setup
	 *	@returns	{String}	-
	 */
	get hasTimestamps() { return false }

	/**
 	 * Model Serializer
	 * @returns	{Object}	- Serialized Model
 	 */
	serialize() {
		return {
			id: this.get('id'),
			resourceId: `${this.related('accountId').serialize().iban}${this.get('currency')}`,
			bicFi: this.get('bic_fi'),
			name: this.get('name'),
			details: this.get('details'),
			linkedAccount: this.get('linked_account'),
			usage: this.get('usage'),
			cashAccountType: this.get('cash_account_type'),
			product: this.get('product'),
			currency: this.get('currency'),
			accountId: this.related('accountId').serialize(),
			balances: this.related('balances').serialize(),
			psuStatus: this.get('psu_status'),
		}
	}

	/**
	 * AccountIdentification relationship
	 * @returns {Promise}	-
	 */
	accountId() {
		return this.hasOne(require('./AccountIdentification'))
	}

	/**
	 * BalanceResource relationship
	 * @returns {Promise}	-
	 */
	balances() {
		return this.hasMany(require('./BalanceResource'))
	}

	/**
	 * PSUs relationship
	 * @returns {Promise}	-
	 */
	psus() {
		return this.belongsToMany(require('./PSU'), 'psus_accounts', 'account_resource_id', 'psu_id')
	}

	/**
	 * Accreditations relationship
	 * @returns { Promise } -
	 */
	accreditations() {
		return this.belongsToMany(require('./Accreditation'))
	}
}

module.exports = AccountResource
