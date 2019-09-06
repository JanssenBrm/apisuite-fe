const BaseModel = require('./BaseModel')

/**
 * Brand model
 */
class ActivityLog extends BaseModel {

	/**
	 * Returns table name
	 * @returns  {String}  -
	 */
	get tableName() {
		return 'activity_log'
	}

	/**
	 *  Returns timestamps setup
	 *  @returns  {String}  -
	 */
	get hasTimestamps() {
		return true
	}

	/**
	 * Users relationship
	 * @returns {Promise}  -
	 */
	user() {
		return this.belongsTo(require('./User'))
	}
	
	/**
	 * Organizations relationship
	 * @returns {Promise}  -
	 */
	organization() {
		return this.belongsTo(require('./Organization'))
	}

	/**
	 * Returns the possible actions to log
	 * @returns  {Array}  -
	 */
	static actions() {
		return [
			'USER_CREATION',
			'USER_UPDATE',
			'USER_LOGIN',
			'APP_CREATION',
			'APP_UPDATE',
			'APP_DELETE',
			'APP_SUBSCRIPTION',
			'APP_REVOKE',
			'TEST_USER_CREATION',
			'TEST_USER_UPDATE',
			'TEST_USER_DELETE',
			'TEST_USER_AUTHORISATION',
			'TEST_USER_LOGOUT',
		]
	}

	/**
	 * User Serializer
	 * @returns {Promise}  -
	 */
	serialize() {
		return {
			id: this.get('id'),
			action: this.get('action'),
			creator: this.related('user').serialize(),
			organization: this.related('organization').serialize(),
			category: this.get('category'),
			additionalInfo: this.get('additional_info'),
			created: this.get('created_at'),
		}
	}
}

module.exports = ActivityLog
