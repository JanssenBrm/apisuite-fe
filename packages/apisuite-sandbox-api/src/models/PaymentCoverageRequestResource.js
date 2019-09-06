const BaseModel = require('./BaseModel')

/**
 * PaymentCoverageRequestResource model
 */
class PaymentCoverageRequestResource extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String}			- table name
	 */
	get tableName() { return 'payment_coverage_request_resource' }

	/**
 	 * Model Serializer
	 * @returns	{Object}	- Serialized Model
 	 */
	serialize() {
		return {
			paymentCoverageRequestId: this.get('id'),
			payee: this.get('payee'),
			instructedAmount: this.related('amountType').serialize(),
			accountId: this.related('accountIdentification').serialize(),
		}
	}

	/**
	 * AmountType relationship
	 * @returns {Promise}	-
	 */
	amountType() {
		return this.morphOne(require('./AmountType'), 'resource')
	}

	/**
	 * AccountIdentification relationship
	 * @returns {Promise}	-
	 */
	accountIdentification() {
		return this.belongsTo(require('./AccountIdentification'))
	}

}

module.exports = PaymentCoverageRequestResource
