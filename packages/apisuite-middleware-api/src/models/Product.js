const BaseModel = require('./BaseModel')

/**
 * Product model
 */
class Product extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'product' }

	/**
	 *	Returns timestamps setup
	 *	@returns	{String}	-
	 */
	get hasTimestamps() { return true }

	/**
	 * Product Serializer
	 * @returns {Promise}	-
	 */
	serialize() {
		return {
			id: this.get('id'),
			name: this.get('name'),
			baseUri: this.get('base_uri'),
			sandboxBaseUri: this.get('sandbox_base_uri'),
			longname: this.get('longname'),
			intro: this.get('intro'),
			description: this.get('description'),
			image: this.get('image'),
			role: this.get('role'),
			version: this.get('version'),
			quarantine: this.get('quarantine'),
			brand_id: this.get('brand_id'),
			created:  this.get('created_at') && this.get('created_at').toISOString ? this.get('created_at').toISOString() : null,
			updated:  this.get('updated_at') && this.get('updated_at').toISOString ? this.get('updated_at').toISOString() : null,
			fields: this.related('fields'),
			features: this.related('features'),
			usecases: this.related('usecases'),
			apidocs: this.related('apidocs'),
		}
	}

	/**
	 * Organizations relationship
	 * @returns {Promise}	-
	 */
	organizations() {
		return this.belongsToMany(require('./Organization')).through(require('./Subscription'))
	}

	/**
	 * Brand relationship
	 * @returns {Promise}	-
	 */
	brand() {
		return this.belongsTo(require('./Brand'))
	}

	/**
	 * Fields relationship
	 * @returns {Promise}	-
	 */
	fields() {
		return this.hasMany(require('./ProductField'))
	}

	/**
	 * Feature relationship
	 * @returns {Promise}	-
	 */
	features() {
		return this.hasMany(require('./ProductFeature'))
	}

	/**
	 * Usecase relationship
	 * @returns {Promise}	-
	 */
	usecases() {
		return this.hasMany(require('./ProductUsecase'))
	}

	/**
	 * API Docs relationship
	 * @returns {Promise}	-
	 */
	apidocs() {
		return this.hasMany(require('./ApiDoc'))
	}
}

module.exports = Product
