const BaseModel = require('./BaseModel')

/**
 * Accreditation model
 */
class Accreditation extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String}			- table name
	 */
	get tableName() { return 'accreditation' }

	/**
 	 * Model Serializer
	 * @returns	{Object}	- Serialized Model
 	 */
	serialize() {
		return {
			id: this.get('id'),
			account: this.related('accountResource'),
		}
	}

	/**
	 * TPP relationship
	 * @returns {Promise}	-
	 */
	tpp() {
		return this.hasOne(require('./TPP'))
	}

	/**
	 * PSU relationship
	 * @returns {Promise}	-
	 */
	psu() {
		return this.hasOne(require('./PSU'))
	}

	/**
	 * AccountResource relationship
	 * @returns {Promise}	-
	 */
	accountResource() {
		return this.hasOne(require('./AccountResource'), 'id', 'account_resource_id')
	}
}

module.exports = Accreditation
