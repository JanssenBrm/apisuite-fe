const BaseModel = require('./BaseModel')

/**
 * OauthAccessToken model
 */
class OauthAccessToken extends BaseModel {

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
	 * User relationship
	 * @returns {Promise}	-
	 */
	user() {
		return this.belongsTo(require('./User'))
	}

	/**
	 *	Returns internal scopes
	 *	@returns	{String}	-
	 */
	getScopes () {
		return this.get('scope') ? this.get('scope').split(',') : []
	}

	/**
	 *	Returns promise to delete a token
	 *	@param	{String}	accessToken		- Access token jti
	 *	@param	{Object}	options				- Query options
	 *	@returns	{String}							-
	 */
	static destroyByAccessToken(accessToken, options) {
		return this.forge()
			.where({ access_token: accessToken })
			.destroy(options)
	}
}

module.exports = OauthAccessToken
