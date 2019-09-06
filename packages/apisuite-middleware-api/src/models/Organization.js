const BaseModel = require('./BaseModel')

/**
 * Organization model
 */
class Organization extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'organization' }

	/**
	 *	Returns timestamps setup
	 *	@returns	{String}	-
	 */
	get hasTimestamps() { return true }

	/**
	 * Returns the states of an organization
	 * @returns	{Array}	-
	 */
	static states() { return ['NON_VALIDATED', 'NON_TRUSTED', 'TRUSTED', 'INTERNAL'] }

	/**
 	 * Model Serializer
	 * @returns	{Object}	- Serialized Model
 	 */
	serialize() {
		return {
			id: this.get('id'),
			name: this.get('name'),
			vat: this.get('vat_number'),
			website: this.get('website'),
			description: this.get('description'),
			logoUrl: this.get('logo_url'),
			policyUrl: this.get('policy_url'),
			state: this.get('state'),
			createdAt: this.get('created_at'),
			updatedAt: this.get('updated_at'),
		}
	}

	/**
	 * Users relationship
	 * @returns {Promise}	-
	 */
	users() {
		return this.belongsToMany(require('./User'), 'user_organization').withPivot(['role'])
	}

	/**
	 * Products relationship
	 * @returns {Promise}	-
	 */
	products() {
		return this.belongsToMany(require('./Product')).through(require('./Subscription'))
	}

	/**
	 * Certificates relationship
	 * @returns {Promise}	-
	 */
	certificates() {
		return this.hasMany(require('./OrganizationCertificates'))
	}
}

module.exports = Organization
