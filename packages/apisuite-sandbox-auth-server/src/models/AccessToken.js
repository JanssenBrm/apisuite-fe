const BaseModel = require('./BaseModel')
/**
 * AccessToken model
 */
class AccessToken extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'oauth_access_token' }

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
			scope: this.related('scopes').serialize(),
			expires: this.get('expires_on'),
		}
	}

	/**
	 * App relationship
	 * @returns {Promise}	-
	 */
	app() {
		return this.belongsTo(require('./App'),'client_id', 'client_id')
	}

	/**
	 * Many to Many relationship
	 * @returns {Promise} -
	 */
	scopes() {
		return this.hasMany(require('./AccessTokenScope'))
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

module.exports = AccessToken
