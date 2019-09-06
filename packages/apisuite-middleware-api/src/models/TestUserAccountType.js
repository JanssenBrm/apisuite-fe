const BaseModel = require('./BaseModel')

/**
 * Test User Account Type model
 */
class TestUserAccountType extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'testuser_account_type' }

	/**
	 *	Returns timestamps setup
	 *	@returns	{String}	-
	 */
	get hasTimestamps() { return true }
}

module.exports = TestUserAccountType
