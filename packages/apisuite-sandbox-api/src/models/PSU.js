const BaseModel = require('./BaseModel')

/**
 * PSU model
 */
class PSU extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String}			- table name
	 */
	get tableName() { return 'psu' }

	/**
 	 * Model Serializer
	 * @returns	{Object}	- Serialized Model
 	 */
	serialize() {
		return {
			id: this.get('id'),
			email: this.get('email'),
			language: this.get('language'),
			name: this.get('name'),
			username: this.get('username'),
			password: this.get('password'),
			postalAddress: this.related('postalAddress').serialize(),
			avatarUrl: this.get('avatar_url'),
			accounts: this.related('accounts').serialize(),
		}
	}

	/**
	 * PostalAddress relationship
	 * @returns {Promise}	-
	 */
	postalAddress() {
		return this.hasOne(require('./PostalAddress'))
	}

	/**
	 * Accreditation relationship
	 * @returns {Promise}	-
	 */
	accreditation() {
		return this.belongsTo(require('./Accreditation'))
	}

	/**
	 * AccountResource relationship
	 * @returns {Promise}	-
	 */
	accounts() {
		return this.belongsToMany(require('./AccountResource'), 'psus_accounts', 'psu_id', 'account_resource_id')
	}
}

module.exports = PSU
