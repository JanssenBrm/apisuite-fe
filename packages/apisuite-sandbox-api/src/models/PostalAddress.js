const BaseModel = require('./BaseModel')

/**
 * PostalAddress model
 */
class PostalAddress extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String}			- table name
	 */
	get tableName() { return 'postal_address' }

	/**
 	 * Model Serializer
	 * @returns	{Object}	- Serialized Model
 	 */
	serialize() {
		return {
			country: this.get('country'),
			addressLine: this.related('addressLine').serialize().map(address => address.address_line),
		}
	}

	/**
	 * AddressLine relationship
	 * @returns {Promise}	-
	 */
	addressLine() {
		return this.hasMany(require('./AddressLine'))
	}

	/**
	 * FinancialInstitutionIdentification relationship
	 * @returns {Promise}	-
	 */
	fiiPostalAddress() {
		return this.belongsTo(require('./FinancialInstitutionIdentification'))
	}

	/**
	 * PartyIdentification relationship
	 * @returns {Promise}	-
	 */
	piPostalAddress() {
		return this.belongsTo(require('./PartyIdentification'))
	}

	/**
	 * PSU relationship
	 * @returns {Promise}	-
	 */
	psuPostalAddress() {
		return this.belongsTo(require('./PSU'))
	}
}

module.exports = PostalAddress
