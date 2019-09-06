const BaseModel = require('./BaseModel')

/**
 * AuthServerToken model
 */
class AuthServerToken extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'auth_server_token' }

	/**
	 *	Returns timestamps setup
	 *	@returns	{String}	-
	 */
	get hasTimestamps() { return false }

	/**
	 * Returns the query to the custom upsert for the auth server token
	 *
	 * @param {Object}	update		- The update data object
	 * @param {Object}	options		- The options object
	 * @returns {Promise}					-
	 */
	static upsert(update, options) {
		options = options || {}
		return this.findOne({}, Object.assign(options, { require: false }))
			.bind(this)
			.then(function (model) {
				return model
					? model.where({ token: model.get('token') }).save(update, Object.assign(options, { patch: true, method: 'update' }))
					: this.create(update, Object.assign(options, { method: 'insert' }))
			})
	}
}

module.exports = AuthServerToken
