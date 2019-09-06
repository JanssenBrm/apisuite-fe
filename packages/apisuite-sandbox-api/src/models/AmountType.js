const BaseModel = require('./BaseModel')

/**
 * AmountType model
 */
class AmountType extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String}			- table name
	 */
	get tableName() { return 'amount_type' }

	/**
	 *	Returns timestamps setup
	 *	@returns	{String}	-
	 */
	get hasTimestamps() { return true }

	/**
 	 * Model Serializer
	 * @returns	{Object}	- Serialized Model
 	 */
	serialize() {
		return {
			currency: this.get('currency'),
			amount: this.get('amount'),
		}
	}

	/**
	 * PaymentCoverageRequestResource relationship
	 * @returns {Promise}	-
	 */
	resource() {
		return this.morphTo(require('resource', require('./PaymentCoverageRequestResource')))
	}

	/**
	 * BalanceResource relationship
	 * @returns {Promise}	-
	 */
	balanceAmount() {
		return this.belongsTo(require('./BalanceResource'))
	}

	/**
	 * CreditTransferTransaction relationship
	 * @returns {Promise}	-
	 */
	instructedAmount() {
		return this.belongsTo(require('./CreditTransferTransaction'))
	}

	/**
	 * Transaction relationship
	 * @returns {Promise}	-
	 */
	transaction() {
		return this.belongsTo(require('./Transaction'))
	}
}

module.exports = AmountType
