const BaseModel = require('./BaseModel')
/**
 * RefreshToken model
 */
class RefreshToken extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'oauth_refresh_token' }

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
			token: this.get('token'),
			clientId: this.get('client_id'),
			userId: this.get('user_id'),
			scopes: this.related('scopes').serialize(),
			expires: this.get('expires_on'),
		}
	}

	/**
	 * Many to Many relationship
	 * @returns {Promise} -
	 */
	scopes() {
		return this.belongsToMany(require('./Scope'), 'oauth_refresh_token_scope')
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

module.exports = RefreshToken
