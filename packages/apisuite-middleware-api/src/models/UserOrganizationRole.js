const BaseModel = require('./BaseModel')


/**
 * Role model
 */
class UserOrganizationRole extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'user_organization_role' }

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
			userId: this.get('user_id'),
			orgId: this.get('organization_id'),
			roleId: this.get('role_id'),
			role: this.related('role'),
			organization: this.related('organization'),
			created: this.get('created_at'),
			updated: this.get('updated_at'),
		}
	}

	/**
	 * Role relationship
	 * @returns {Promise} - 
	 */
	role() {
		return this.belongsTo(require('./Role'))
	}

	/**
	 * Role relationship
	 * @returns {Promise} - 
	 */
	user() {
		return this.belongsTo(require('./User'))
	}

	/**
	 * Role relationship
	 * @returns {Promise} - 
	 */
	organization() {
		return this.belongsTo(require('./Organization'))
	}

}

module.exports = UserOrganizationRole
