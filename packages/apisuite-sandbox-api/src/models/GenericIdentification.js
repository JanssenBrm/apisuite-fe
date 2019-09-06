const BaseModel = require('./BaseModel')

/**
 * GenericIdentification model
 */
class GenericIdentification extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String}			- table name
	 */
	get tableName() { return 'generic_identification' }

	/**
 	 * Model Serializer
	 * @returns	{Object}	- Serialized Model
 	 */
	serialize() {
		return {
			identification: this.get('identification'),
			schemeName: this.get('scheme_name'),
			issuer: this.get('issuer'),
		}
	}

	/**
	 * AccountIdentification relationship
	 * @returns {Promise}	-
	 */
	accountIdentification() {
		return this.belongsTo(require('./AccountIdentification'))
	}

	/**
	 * PartyIdentification relationship
	 * @returns {Promise}	-
	 */
	partyIdentification() {
		return this.belongsTo(require('./PartyIdentification'))
	}
}

module.exports = GenericIdentification
