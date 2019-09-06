const BaseModel = require('./BaseModel')

/**
 * AccountOperation model
 */
class AccountOperation extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String}			- table name
	 */
	get tableName() { return 'account_operation' }

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

	/**
	 * Operation relationship
	 * @returns {Promise}	-
	 */
	operation() {
		return this.hasMany(require('./Operation'))
	}
}

module.exports = AccountOperation
