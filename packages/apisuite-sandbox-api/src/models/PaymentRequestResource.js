const BaseModel = require('./BaseModel')

/**
 * PaymentRequestResource model
 */
class PaymentRequestResource extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String}			- table name
	 */
	get tableName() { return 'payment_request_resource' }

	/**
	 *	Returns timestamps setup
	 *	@returns	{String}	-
	 */
	get hasTimestamps() { return true }

	/**
	 * Returns the status of a payment request
	 * @returns	{Object}	-
	 */
	static status() {
		return {
			ACCP: 'ACCP',
			ACSC: 'ACSC',
			ACSP: 'ACSP',
			ACTC: 'ACTC',
			ACWC: 'ACWC',
			ACWP: 'ACWP',
			PART: 'PART',
			RCVD: 'RCVD',
			PDNG: 'PDNG',
			RJCT: 'RJCT',
		}
	}

	/**
 	 * Model Serializer
	 * @returns	{Object}	- Serialized Model
 	 */
	serialize() {
		return {
			resourceId: this.get('id').toString(),
			paymentInformationId: this.get('payment_information_id'),
			creationDateTime: new Date(this.get('created_at')).toISOString().slice(0, 19),
			numberOfTransactions: this.get('number_of_transactions'),
			paymentInformationStatus: this.get('payment_information_status'),
			statusReasonInformation: this.get('status_reason_information'),
			initiatingParty: this.related('initiatingParty').serialize(),
			paymentTypeInformation: this.related('paymentTypeInformation').serialize(),
			debtor: this.related('debtor').serialize(),
			debtorAccount: this.related('debtorAccount').serialize(),
			beneficiary: this.related('prrBeneficiary').serialize(),
			ultimateCreditor: this.related('ultimateCreditor').serialize(),
			purpose: this.get('purpose'),
			chargeBearer: this.get('charge_bearer'),
			creditTransferTransaction: this.related('creditTransferTransaction').serialize(),
			fundsAvailability: this.get('funds_availability'),
			booking: this.get('booking'),
			requestedExecutionDate: new Date(this.get('requested_execution_date')).toISOString().slice(0, 10),
			supplementaryData: this.related('supplementaryData').serialize(),
			debtorAccountId: this.get('debtor_account_id'),
			creditorAccountId: this.get('creditor_account_id'),
			brand: this.get('brand'),
		}
	}

	/**
	 * PartyIdentification relationship
	 * @returns {Promise}	-
	 */
	initiatingParty() {
		return this.hasOne(require('./PartyIdentification'), 'initiating_party_id', 'id')
	}

	/**
	 * PaymentTypeInformation relationship
	 * @returns {Promise}	-
	 */
	paymentTypeInformation() {
		return this.hasOne(require('./PaymentTypeInformation'))
	}

	/**
	 * PartyIdentification relationship
	 * @returns {Promise}	-
	 */
	debtor() {
		return this.hasOne(require('./PartyIdentification'), 'debtor_id', 'id')
	}

	/**
	 * AccountIdentification relationship
	 * @returns {Promise}	-
	 */
	debtorAccount() {
		return this.hasOne(require('./AccountIdentification'))
	}

	// /**
	//  * FinancialInstitutionIdentification relationship
	//  * @returns {Promise}	-
	//  */
	// paymentRequestResourceDebtorAgent() {
	// 	return this.hasOne(require('./FinancialInstitutionIdentification'))
	// }

	/**
	 * Beneficiary relationship
	 * @returns {Promise}	-
	 */
	prrBeneficiary() {
		return this.hasOne(require('./Beneficiary'))
	}

	/**
	 * PartyIdentification relationship
	 * @returns {Promise}	-
	 */
	ultimateCreditor() {
		return this.hasOne(require('./PartyIdentification'), 'ultimate_creditor_id', 'id')
	}

	/**
	 * CreditTransferTransaction relationship
	 * @returns {Promise}	-
	 */
	creditTransferTransaction() {
		return this.hasMany(require('./CreditTransferTransaction'))
	}

	/**
	 * SupplementaryData relationship
	 * @returns {Promise}	-
	 */
	supplementaryData() {
		return this.hasOne(require('./SupplementaryData'))
	}
}

module.exports = PaymentRequestResource
