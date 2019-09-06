const BaseModel = require('./BaseModel')

/**
 * RefreshTokenScope model
 */
class RefreshTokenScope extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'oauth_refresh_token_scope' }

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
			brand: this.get('brand'),
		}
	}
}

module.exports = RefreshTokenScope
