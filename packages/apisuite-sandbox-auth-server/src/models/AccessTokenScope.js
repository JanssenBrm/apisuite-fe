const BaseModel = require('./BaseModel')

/**
 * AccessTokenScope model
 */
class AccessTokenScope extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'oauth_access_token_scope' }

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
			tokenId: this.get('oauth_access_token_id'),
			scopeId: this.get('scope_id'),
			scope: this.related('scope').serialize(),
			brand: this.get('brand'),
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

module.exports = AccessTokenScope
