const BaseModel = require('./BaseModel')

/**
 * PaymentIdentification model
 */
class PaymentIdentification extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String}			- table name
	 */
	get tableName() { return 'payment_identification' }

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
		const obj = {
			instructionId: this.get('instruction_id'),
			endToEndId: this.get('end_to_end_id'),
		}
		
		if (this.get('id')) {
			obj.resourceId = this.get('id').toString()
		}
		
		return obj
	}

	/**
	 * CreditTransferTransaction relationship
	 * @returns {Promise}	-
	 */
	paymentId() {
		return this.belongsTo(require('./CreditTransferTransaction'))
	}
}

module.exports = PaymentIdentification
