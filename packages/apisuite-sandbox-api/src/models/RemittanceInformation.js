const BaseModel = require('./BaseModel')

/**
 * RemittanceInformation model
 */
class RemittanceInformation extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String}			- table name
	 */
	get tableName() { return 'remittance_information' }

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
		return this.get('remittance_line')
	}

	/**
	 * CreditTransferTransaction relationship
	 * @returns {Promise}	-
	 */
	cttRemittanceInformation() {
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

module.exports = RemittanceInformation
