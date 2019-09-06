const BaseModel = require('./BaseModel')

/**
 * AuthorizationCodeScope model
 */
class AuthorizationCodeScope extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'oauth_authorization_code_scope' }

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
		return {
			tokenId: this.get('oauth_auth_code_id'),
			scopeId: this.get('scope_id'),
			brand: this.get('brand'),
			scope: this.related('scope').serialize(),
		}
	}
	
	/**
	 * Scope relationship
	 * @returns {Promise}	-
	 */
	scope() {
		return this.belongsTo(require('./Scope'))
	}
}

module.exports = AuthorizationCodeScope
