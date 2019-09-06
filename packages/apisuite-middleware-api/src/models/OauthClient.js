const BaseModel = require('./BaseModel')

/**
 * OauthClient model
 */
class OauthClient extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'oauth_client' }

	/**
	 *	Returns timestamps setup
	 *	@returns	{String}	-
	 */
	get hasTimestamps() { return true }

	/**
	 *	Returns internal scopes
	 *	@returns	{String}	-
	 */
	getScopes () {
		return this.get('scope') ? this.get('scope').split(',') : ''
	}

}

module.exports = OauthClient
