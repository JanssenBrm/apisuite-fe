const BaseModel = require('./BaseModel')

/**
 * Beneficiary model
 */
class Beneficiary extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String}			- table name
	 */
	get tableName() { return 'beneficiary' }

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
			id: this.get('id'),
			isTrusted: this.get('is_trusted'),
			creditor: this.related('creditor').serialize(),
			creditorAccount: this.related('creditorAccount').serialize(),
		}
	}

	// /**
	//  * FinancialInstitutionIdentification relationship
	//  * @returns {Promise}	-
	//  */
	// creditorAgent() {
	// 	return this.hasOne(require('./FinancialInstitutionIdentification'))
	// }

	/**
	 * PartyIdentification relationship
	 * @returns {Promise}	-
	 */
	creditor() {
		return this.hasOne(require('./PartyIdentification'), 'creditor_id', 'id')
	}

	/**
	 * AccountIdentification relationship
	 * @returns {Promise}	-
	 */
	creditorAccount() {
		return this.hasOne(require('./AccountIdentification'))
	}

	// /**
	//  * CreditTransferTransaction relationship
	//  * @returns {Promise}	-
	//  */
	// cttBeneficiary() {
	// 	return this.belongsTo(require('./CreditTransferTransaction'))
	// }

	/**
	 * PaymentRequestResource relationship
	 * @returns {Promise}	-
	 */
	prrBeneficiary() {
		return this.belongsTo(require('./PaymentRequestResource'))
	}
}

module.exports = Beneficiary
