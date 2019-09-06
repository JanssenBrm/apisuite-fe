const BaseModel = require('./BaseModel')


/**
 * Role model
 */
class Role extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'role' }

	/**
	 *	Returns timestamps setup
	 *	@returns	{String}	-
	 */
	get hasTimestamps() { return true }

	/**
	 * User Serializer
	 * @returns {Promise}	-
	 */
	serialize() {
		return {
			id: this.get('id'),
			name: this.get('name'),
			level: this.get('level'),
			created: this.get('created_at'),
			updated: this.get('updated_at'),
		}
	}
	
}

module.exports = Role
