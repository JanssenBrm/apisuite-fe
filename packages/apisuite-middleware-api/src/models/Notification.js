const BaseModel = require('./BaseModel')

/**
 * Notification model
 */
class Notification extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'notification' }

	/**
	 *	Returns timestamps setup
	 *	@returns	{String}	-
	 */
	get hasTimestamps() { return true }

	/**
	 * Notification Serializer
	 * @returns {Promise}	-
	 */
	serialize() {
		return {
			id: this.get('id'),
			tag: this.get('tag') || null,
			message: this.get('message'),
			link: this.get('link') || null,
			author: this.get('author'),
			public: this.get('public') ? true : false,
			alert: this.get('alert') ? true : false,
			scheduled: this.get('scheduled_to') && this.get('scheduled_to').toISOString ? this.get('scheduled_to').toISOString() : null,
			created: this.get('created_at') && this.get('created_at').toISOString ? this.get('created_at').toISOString() : null,
			updated: this.get('updated_at') && this.get('updated_at').toISOString ? this.get('updated_at').toISOString() : null,
		}
	}

}

module.exports = Notification
