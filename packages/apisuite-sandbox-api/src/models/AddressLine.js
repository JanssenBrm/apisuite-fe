const BaseModel = require('./BaseModel')

/**
 * AddressLine model
 */
class AddressLine extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String}			- table name
	 */
	get tableName() { return 'address_line' }

	/**
 	 * Model Serializer
	 * @returns	{Object}	- Serialized Model
 	 */
	serialize() {
		return {
			// id: this.get('id'),
			address_line: this.get('address_line'),
		}
	}

	/**
	 * PostalAddress relationship
	 * @returns {Promise}	-
	 */
	postalAddress() {
		return this.belongsTo(require('./PostalAddress'))
	}
}

module.exports = AddressLine
