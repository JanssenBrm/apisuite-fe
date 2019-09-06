const BaseModel = require('./BaseModel')
/**
 * AccessToken model
 */
class State extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'oauth_state' }

	/**
	 *	Returns timestamps setup
	 *	@returns	{String}	-
	 */
	get hasTimestamps() { return true }

	/**
 	 * Model Serializer
	 * @returns	{Object}	- Serialized Model
 	 */
	serialize() {
		return {
			id: this.get('id'),
			token: this.get('state'),
			expires: this.get('expires_on'),
		}
	}

	/**
	 * Returns the query to delete all expired tickets
	 *
	 * @returns {Promise}					-
	 */
	static deleteAllExpired () {
		return this
			.query()
			.where('expires_on', '<', new Date())
			.del()
	}
}

module.exports = State
