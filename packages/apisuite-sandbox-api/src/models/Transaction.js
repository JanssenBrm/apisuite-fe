const BaseModel = require('./BaseModel')

/**
 * Transaction model
 */
class Transaction extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String}			- table name
	 */
	get tableName() { return 'transaction' }

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
			resourceId: this.get('id').toString(),
			entryReference: this.get('entry_reference'),
			transactionAmount: this.related('transaction_amount').serialize(),
			creditDebitIndicator: this.get('credit_debit_indicator'),
			status: this.get('status'),
			bookingDate: this.get('booking_date'),
			valueDate: this.get('value_date'),
			transactionDate: this.get('transaction_date'),
			remittanceInformation: this.get('remittance_information'),
		}
	}

	/**
	 * AmountType relationship
	 * @returns {Promise}	-
	 */
	transactionAmount() {
		return this.hasOne(require('./AmountType'))
	}

	/**
	 * UnstructuredRemittanceInformation relationship
	 * @returns {Promise}	-
	 */
	remittanceInformation() {
		return this.hasMany(require('./RemittanceInformation'))
	}
}

module.exports = Transaction
