const BaseModel = require('./BaseModel')

/**
 * ApiDoc model
 */
class ApiDoc extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'api_docs' }

	/**
	 *	Returns timestamps setup
	 *	@returns	{String}	-
	 */
	get hasTimestamps() { return true }

	/**
	 * API Doc Serializer
	 * @returns {Promise}	-
	 */
	serialize() {
		return {
			id: this.get('id'),
			title: this.get('title'),
			swagger: this.get('swagger'),
			version: this.get('version'),
			accessScope: this.get('access_scope'),
			public: this.get('public'),
			live: this.get('live'),
			sandbox: this.get('sandbox'),
			deprecated: this.get('deprecated'),
			product_id: this.get('product_id'),
			sandboxSourceControlKey: this.get('sandbox_source_control_key'),
			sandboxSourceControlName: this.get('sandbox_source_control_name'),
			created: this.get('created_at') && this.get('created_at').toISOString ? this.get('created_at').toISOString() : null,
			updated: this.get('updated_at') && this.get('updated_at').toISOString ? this.get('updated_at').toISOString() : null,
			products: this.related('products').serialize(),
		}
	}

	/**
	 * Product relationship
	 * @returns {Promise}	-
	 */
	products() {
		return this.belongsTo(require('./Product'))
	}

	/**
	 * Product Endpoint relationship
	 * @returns {Promise}	-
	 */
	productEndpoints() {
		return this.hasMany(require('./ProductEndpoint'))
	}
}

module.exports = ApiDoc
