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
 	 * Model Serializer
	 * @returns	{Object}	- Serialized Model
 	 */
	serialize() {
		const serializedValue = {
			id: this.get('id'),
			name: this.get('name'),
		}

		return serializedValue
	}

	/**
	 * Many to Many relationship
	 * @returns {Promise} -
	 */
	apps() {
		return this.belongsToMany(require('./AppScope'), 'app_scope')
	}

	/**
	 * Many to Many relationship
	 * @returns {Promise} -
	 */
	accessTokens() {
		return this.belongsToMany(require('./AccessToken'), 'oauth_access_token_scope')
	}

	/**
	 * Many to Many relationship
	 * @returns {Promise} -
	 */
	refreshTokens() {
		return this.belongsToMany(require('./RefreshToken'), 'oauth_refresh_token_scope')
	}
}

module.exports = Scope
