const BaseModel = require('./BaseModel')

/**
 * CreditTransferTransaction model
 */
class CreditTransferTransaction extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String}			- table name
	 */
	get tableName() { return 'credit_transfer_transaction' }

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
			paymentId: this.related('paymentId').serialize(),
			requestedExecutionDate: this.get('requested_execution_date'),
			endDate: this.get('end_date'),
			executionRule: this.get('execution_rule'),
			frequency: this.get('frequency'),
			instructedAmount: this.related('instructedAmount').serialize(),
			remittanceInformation: this.related('cttRemittanceInformation').serialize(),
			transactionStatus: this.get('transaction_status'),
			statusReasonInformation: this.get('status_reason_information'),
		}
	}

	/**
	 * PaymentIdentification relationship
	 * @returns {Promise}	-
	 */
	paymentId() {
		return this.hasOne(require('./PaymentIdentification'))
	}

	/**
	 * AmountType relationship
	 * @returns {Promise}	-
	 */
	instructedAmount() {
		return this.hasOne(require('./AmountType'))
	}

	/**
	 * Multiple RemittanceInformation relationship
	 * @returns {Promise}	-
	 */
	cttRemittanceInformation() {
		return this.hasMany(require('./RemittanceInformation'))
	}

	// /**
	//  * Beneficiary relationship
	//  * @returns {Promise}	-
	//  */
	// beneficiary() {
	// 	return this.hasOne(require('./Beneficiary'))
	// }

	// /**
	//  * PartyIdentification relationship
	//  * @returns {Promise}	-
	//  */
	// ultimateCreditor() {
	// 	return this.hasOne(require('./PartyIdentification'))
	// }

	// /**
	//  * RegulatoryReportingCodes relationship
	//  * @returns {Promise}	-
	//  */
	// regulatoryReportingCodes() {
	// 	return this.hasOne(require('./RegulatoryReportingCodes'))
	// }

	/**
	 * PaymentRequestResource relationship
	 * @returns {Promise}	-
	 */
	creditTransferTransaction() {
		return this.belongsTo(require('./PaymentRequestResource'))
	}
}

module.exports = CreditTransferTransaction
