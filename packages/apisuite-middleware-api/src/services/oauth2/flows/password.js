const config = require('../../../config')
const utils = require('../utils')
const dbMethods = require('../db_methods')

// Models
const OauthAccessToken = require('../../../models/OauthAccessToken')

/**
 * Handles password oauth2 flow.
 *
 * @async
 * @param		{String}	userId					- User id
 * @param		{String}	clientId				- Oauth client id
 * @param		{String}	scope						-	User scope
 * @throws 	{Error}										- Throws unauthorized if user/client are not allowed or dont have permissions
 * @returns	{Object} 									- Returns an object with the token, type and expiration timestamp
 */
module.exports = async (userId, clientId, scope) => {
	const tokenData = utils.createToken({ sub: userId, exp: config.get('oauth2').token_expiresIn })

	const jti = utils.decode(tokenData.token).jti

	await OauthAccessToken.create({
		access_token: jti,
		client_id: clientId,
		user_id: userId,
		expiration_date: new Date(tokenData.expires * 1000),
		scope,
	})

	// revoke all user tokens created except current (disables concurrent logons)
	await dbMethods.accessTokens.revokeUserTokens(userId, jti)

	return {
		access_token: tokenData.token,
		expires_in: tokenData.expires,
		token_type: 'bearer',
	}
}
