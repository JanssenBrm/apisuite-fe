const BaseModel = require('./BaseModel')

/**
 * AuthorizationCode model
 */
class AuthorizationCode extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'oauth_authorization_code' }

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
			code: this.get('code'),
			clientId: this.get('client_id'),
			userId: this.get('user_id'),
			scopes: this.related('scopes').serialize(),
			codeChallenge: this.get('code_challenge'),
			codeChallengeMethod: this.get('code_challenge_method'),
			expires: this.get('expires_on'),
		}
	}

	/**
	 * App relationship
	 * @returns {Promise}	-
	 */
	app() {
		return this.belongsTo(require('./App'))
	}
	/**
	 * Many to Many relationship
	 * @returns {Promise} -
	 */
	scopes() {
		return this.hasMany(require('./AuthorizationCodeScope'),'oauth_auth_code_id')
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

module.exports = AuthorizationCode
