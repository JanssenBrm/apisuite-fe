const BaseModel = require('./BaseModel')

/**
 * ActionRole model
 */
class ActionRole extends BaseModel {

	/**
	 * Returns table name
	 * @returns  {String}  -
	 */
	get tableName() {
		return 'action_role'
	}

	/**
	 *  Returns timestamps setup
	 *  @returns  {String}  -
	 */
	get hasTimestamps() {
		return true
	}


	/**
	 * ActionRole Serializer
	 * @returns {Promise}  -
	 */
	serialize() {
		return {
			id: this.get('id'),
			action: this.get('action'),
			roleId: this.get('role_id'),
		}
	}
}

module.exports = ActionRole
