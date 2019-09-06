const BaseModel = require('./BaseModel')

/**
 * BalanceResource model
 */
class BalanceResource extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String}			- table name
	 */
	get tableName() { return 'balance_resource' }

	/**
	 *	Returns timestamps setup
	 *	@returns	{String}	-
	 */
	get hasTimestamps() { return true }

	/**
	 * Returns the types of a balance
	 * @returns	{Object}	-
	 */
	static types() {
		return {
			CLBD: 'CLBD',
			XPCD: 'XPCD',
			VALU: 'VALU',
			OTHR: 'OTHR',
		}
	}

	/**
 	 * Model Serializer
	 * @returns	{Object}	- Serialized Model
 	 */
	serialize() {
		return {
			id: this.get('id'),
			name: this.get('name'),
			balanceType: this.get('balance_type'),
			referenceDate: this.get('reference_date'),
			balanceAmount: this.related('balanceAmount').serialize(),
			lastChangeDateTime: this.get('last_change_date_time'),
			lastCommittedTransaction: this.get('last_committed_transaction'),
			account_resource_id: this.get('account_resource_id'),
		}
	}

	/**
	 * AmountType relationship
	 * @returns {Promise}	-
	 */
	balanceAmount() {
		return this.hasOne(require('./AmountType'))
	}

	/**
	 * AccountResource relationship
	 * @returns {Promise}	-
	 */
	balances() {
		return this.belongsTo(require('./AccountResource'))
	}
}

module.exports = BalanceResource
