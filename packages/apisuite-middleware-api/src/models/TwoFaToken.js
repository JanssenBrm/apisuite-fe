const BaseModel = require('./BaseModel')

/**
 * UserTwoFa model
 */
class TwoFaToken extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'two_fa_token' }

	/**
	 *	Returns timestamps setup
	 *	@returns	{String}	-
	 */
	get hasTimestamps() { return true }

}

module.exports = TwoFaToken
