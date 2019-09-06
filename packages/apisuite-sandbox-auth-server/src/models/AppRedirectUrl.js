const BaseModel = require('./BaseModel')

/**
 * AppRedirectUrl model
 */
class AppRedirectUrl extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'app_redirect_url' }

	/**
	 *	Returns timestamps setup
	 *	@returns	{String}	-
	 */
	get hasTimestamps() { return true }

	/**
 	 * Model Serializer
	 * @returns	{Object}	- Serialized Model
 	 */
	serialize() {
		return this.get('url')
	}

	/**
	 * Returns the query to delete all expired tickets
	 * @param {Number}	appId			- The app ID
	 * @param {Object}	options		- Bookshelf options
	 *
	 * @returns {Promise}				-
	 */
	static deleteAllByAppId (appId, options) {
		return this
			.where({ app_id: appId })
			.destroy(options)
	}

	/**
	 * App relationship
	 * @returns {Promise}	-
	 */
	app() {
		return this.belongsTo(require('./App'))
	}
}

module.exports = AppRedirectUrl
