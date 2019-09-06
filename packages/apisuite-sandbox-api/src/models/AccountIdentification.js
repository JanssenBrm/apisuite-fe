const BaseModel = require('./BaseModel')

/**
 * AccountIdentification model
 */
class AccountIdentification extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String}			- table name
	 */
	get tableName() { return 'account_identification' }

	/**
 	 * Model Serializer
	 * @returns	{Object}	- Serialized Model
 	 */
	serialize() {
		const serializedObj = {}

		if (this.get('iban')) {
			serializedObj.iban = this.get('iban')
			return serializedObj
		}
		if (this.related('other')) {
			serializedObj.other = this.related('other').serialize()
		}

		return serializedObj
	}

	/**
	 * GenericIdentification relationship
	 * @returns {Promise}	-
	 */
	other() {
		return this.hasOne(require('./GenericIdentification'))
	}

	/**
	 * PaymentCoverageRequestResource relationship
	 * @returns {Promise}	-
	 */
	paymentCoverageRequestResources() {
		return this.hasMany(require('./GenericIdentification'))
	}

	/**
	 * AccountResource relationship
	 * @returns {Promise}	-
	 */
	accountResource() {
		return this.belongsTo(require('./AccountResource'))
	}

	/**
	 * PaymentRequestResource relationship
	 * @returns {Promise}	-
	 */
	debtorAccount() {
		return this.belongsTo(require('./PaymentRequestResource'))
	}

	/**
	 * Beneficiary relationship
	 * @returns {Promise}	-
	 */
	creditorAccount() {
		return this.belongsTo(require('./Beneficiary'), 'creditor_account_id', 'id')
	}
}

module.exports = AccountIdentification
