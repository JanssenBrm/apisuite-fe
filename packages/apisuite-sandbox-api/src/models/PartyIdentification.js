const BaseModel = require('./BaseModel')

/**
 * PartyIdentification model
 */
class PartyIdentification extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String}			- table name
	 */
	get tableName() { return 'party_identification' }

	/**
 	 * Model Serializer
	 * @returns	{Object}	- Serialized Model
 	 */
	serialize() {
		const serializedObj = {}

		if (this.related('postalAddress').serialize()) {
			serializedObj.postalAddress = this.related('postalAddress').serialize()
		}
		if (this.related('organisationId').serialize().identification) {
			serializedObj.organisationId = this.related('organisationId').serialize()
		}
		if (this.related('privateId').serialize().identification) {
			serializedObj.privateId = this.related('privateId').serialize()
		}

		return {
			name: this.get('name'),
			...serializedObj,
		}
	}

	/**
	 * PostalAddress relationship
	 * @returns {Promise}	-
	 */
	postalAddress() {
		return this.hasOne(require('./PostalAddress'), 'party_identification_id', 'id')
	}

	/**
	 * GenericIdentification relationship
	 * @returns {Promise}	-
	 */
	organisationId() {
		return this.hasOne(require('./GenericIdentification'), 'organisation_id', 'id')
	}

	/**
	 * GenericIdentification relationship
	 * @returns {Promise}	-
	 */
	privateId() {
		return this.hasOne(require('./GenericIdentification'), 'private_id', 'id')
	}

	/**
	 * PaymentRequestResource relationship
	 * @returns {Promise}	-
	 */
	paymentRequestResource() {
		return this.belongsTo(require('./PaymentRequestResource'))
	}

	/**
	 * Beneficiary relationship
	 * @returns {Promise}	-
	 */
	creditor() {
		return this.belongsTo(require('./Beneficiary'))
	}
}

module.exports = PartyIdentification
