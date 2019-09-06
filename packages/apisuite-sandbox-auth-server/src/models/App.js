const BaseModel = require('./BaseModel')
const Bookshelf = require('../utils/bookshelf')

/**
 * App model
 */
class App extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'app' }

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
		const grantsRaw = this.get('grant_type')
		const grants = grantsRaw ? grantsRaw.split(';') : []

		const serializedValue =  {
			id: this.get('id'),
			name: this.get('name'),
			description: this.get('description'),
			publicURL: this.get('public_url'),
			clientId: this.get('client_id'),
			ownerId: this.get('owner_id'),
			organizationId: this.get('organization_id'),
			iconURL: this.get('icon_url'),
			clientSecret: this.get('client_secret'),
			redirectURLs: this.related('redirectUrls').serialize(),
			grants: grants,
			scopes: this.related('scopes'),
			createdAt: this.get('created_at'),
			updatedAt: this.get('updated_at'),
		}

		// If container data is present, serialize it
		if (this.related('container')) serializedValue.container = this.related('container').get('name')

		return serializedValue
	}

	/**
	 * Returns the query to delete all scopes
	 * @param {Number}	appId			- The app ID
	 * @param {Object}	options		- Bookshelf options
	 *
	 * @returns {Promise}				-
	 */
	static deleteScopes (appId, options) {
		return Bookshelf.knex('app_scope')
			.where({ app_id: appId })
			.del(options)
	}

	/**
	 * Users relationship (ownership)
	 * @returns {Promise}	-
	 */
	user() {
		return this.belongsTo(require('./User'))
	}

	/**
	 * Multiple redirect urls relationship
	 * @returns {Promise}	-
	 */
	redirectUrls() {
		return this.hasMany(require('./AppRedirectUrl'))
	}

	/**
	 * One-to-One app container
	 * @returns {Promise} -
	 */
	container() {
		return this.belongsTo(require('./OrgContainer'))
	}

	/**
	 * Many to Many relationship
	 * @returns {Promise} -
	 */
	scopes() {
		return this.hasMany(require('./AppScope'))
	}

}

module.exports = App
