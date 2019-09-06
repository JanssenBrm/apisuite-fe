const BaseModel = require('./BaseModel')

/**
 * CodeScope model
 */
class CodeScope extends BaseModel {

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
			codeId: this.get('oauth_auth_code_id'),
			scopeId: this.get('scope_id'),
			brand: this.get('brand'),
		}
	}
}

module.exports = CodeScope
