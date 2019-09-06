const BaseModel = require('./BaseModel')

/**
 * PaymentTypeInformation model
 */
class PaymentTypeInformation extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String}			- table name
	 */
	get tableName() { return 'payment_type_information' }

	/**
 	 * Model Serializer
	 * @returns	{Object}	- Serialized Model
 	 */
	serialize() {
		const serializedObj = {}

		if (this.get('instruction_priority')) {
			serializedObj.instructionPriority = this.get('instruction_priority')
		}
		if (this.get('local_instrument')) {
			serializedObj.localInstrument = this.get('local_instrument')
		}
		if (this.get('category_purpose')) {
			serializedObj.categoryPurpose = this.get('category_purpose')
		}

		return {
			...serializedObj,
			serviceLevel: this.get('service_level'),
		}
	}

	/**
	 * PaymentRequestResource relationship
	 * @returns {Promise}	-
	 */
	paymentTypeInformation() {
		return this.belongsTo(require('./PaymentRequestResource'))
	}
}

module.exports = PaymentTypeInformation
