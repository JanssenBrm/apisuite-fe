const BaseModel = require('./BaseModel')

/**
 * Scope model
 */
class Scope extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'scope' }

	/**
	 *	Returns timestamps setup
	 *	@returns	{String}	-
	 */
	get hasTimestamps() { return false }

	/**
	 * User relationship
	 * @returns {Promise}	-
	 */
	users() {
		return this.belongsToMany(require('./User'), 'user_scope')
	}
}

module.exports = Scope
