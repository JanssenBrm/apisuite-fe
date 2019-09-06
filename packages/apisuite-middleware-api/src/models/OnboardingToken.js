const BaseModel = require('./BaseModel')

/**
 * OnboardingToken model
 */
class OnboardingToken extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'onboarding_token' }

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
	 *	Returns promise to delete a token
	 *	@param	{String}	token					- onboarding token
	 *	@param	{Object}	options				- Query options
	 *	@returns	{String}							-
	 */
	static destroyByToken(token, options) {
		return this.forge()
			.where({ token: token })
			.destroy(options)
	}
}

module.exports = OnboardingToken
