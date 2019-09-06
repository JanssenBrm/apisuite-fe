const BaseModel = require('./BaseModel')

/**
 * TPP model
 */
class TPP extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String}			- table name
	 */
	get tableName() { return 'tpp' }

	/**
 	 * Model Serializer
	 * @returns	{Object}	- Serialized Model
 	 */
	serialize() {
		return {
			id: this.get('id'),
		}
	}

	/**
	 * Accreditation relationship
	 * @returns {Promise}	-
	 */
	accreditation() {
		return this.belongsTo(require('./Accreditation'))
	}
}

module.exports = TPP
