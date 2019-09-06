const BaseModel = require('./BaseModel')

/**
 * GitHubApp model
 */
class GitHubApp extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'github_app' }

	/**
	 *	Returns timestamps setup
	 *	@returns	{String}	-
	 */
	get hasTimestamps() { return true }

}

module.exports = GitHubApp
