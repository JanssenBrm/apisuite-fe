const BaseModel = require('./BaseModel')
const Bookshelf = require('../utils/bookshelf')
const bcrypt = require('bcrypt')

/**
 * User model
 */
class User extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'user' }

	/**
	 *	Returns timestamps setup
	 *	@returns	{String}	-
	 */
	get hasTimestamps() { return true }

	/**
	 *	Tests if a password match
	 *
	 *	@async
	 *	@param	{String}	password	- Password to compare
	 *	@returns	{Boolean}					-
	 */
	async comparePassword (password) {
		return await bcrypt.compare(password, this.get('password'))
	}

	/**
	 *	Tests if a user has a specific set of scopes
	 *
	 *	@param	{Array}	scopes	- Scope to compare
	 *  @throws {Error}					-	Error thrown when no scopes were loaded from db
	 *	@returns	{Boolean}			-
	 */
	hasScopes (scopes) {
		if (!this.related('scopes'))
			throw new Error('Scopes are not loaded from db yet')

		if (!scopes || !scopes.length || scopes.includes('*'))
			return true

		const userScopes = this.related('scopes').toJSON()
			.map(elem => elem.name)

		return scopes.every(elem => userScopes.includes(elem))
	}

	/**
	 * Organizations relationship
	 * @returns {Promise}	-
	 */
	organizations() {
		return this.belongsToMany(require('./Organization'), 'user_organization')
			.withPivot(['role'])
	}

	/**
	 * 2FA relationship
	 * @returns {Promise}	-
	 */
	tfa() {
		return this.hasOne(require('./UserTwoFa'))
	}

	/**
	 * Scopes relationship
	 * @returns {Promise}	-
	 */
	scopes() {
		return this.belongsToMany(require('./Scope'), 'user_scope')
	}

	/**
	 * OauthAccessToken relationship
	 * @returns {Promise}	-
	 */
	accessTokens() {
		return this.hasMany(require('./OauthAccessToken'))
	}

	/**
	 * OnboardingToken relationship
	 * @returns {Promise}	-
	 */
	onboardingToken() {
		return this.hasOne(require('./OnboardingToken'))
	}

	/**
	 * Organization Roles relationship
	 * @returns {Promise} -
	 */
	roles() {
		return this.hasMany(require('./UserOrganizationRole'), 'user_id')
	}

	/**
	 * User Serializer
	 * @returns {Promise}	-
	 */
	serialize() {
		return {
			id: this.get('id'),
			email: this.get('email'),
			fullName: this.get('full_name'),
			avatar: this.get('avatar') || '',
			bio: this.get('bio') || '',
			phone: this.get('phone_number') || '',
			activated: !!this.get('activated'),
			github: this.get('github_id') ? true : false,
			created: this.get('created_at').toISOString(),
			updated: this.get('updated_at').toISOString(),
		}
	}

	/**
	 * Promise to delete the user and his organization case he is the last member
	 *
	 * @param	{Int}	userId		- The user id
	 * @returns {Promise}			-
	 */
	static destroy (userId) {
		return Bookshelf.knex.transaction(async (trx) => {

			// Deletes all organizations where the user is the only member
			await Bookshelf.knex('organization')
				.whereIn('organization.id', function () {
					this
						.select('user_organization.organization_id')
						.from('user_organization')
						.where('user_organization.user_id', '=', userId)
						.innerJoin(
							Bookshelf.knex('user_organization')
								.select('user_organization.organization_id')
								.groupBy('user_organization.organization_id')
								.havingRaw('count(user_organization.organization_id) <= 1')
								.as('a'), 'a.organization_id', 'user_organization.organization_id')
				})
				.del()
				.transacting(trx)

			// Deletes user himself
			await Bookshelf.knex('user')
				.where('user.id', '=', userId)
				.del()
				.transacting(trx)

		})
	}
}

module.exports = User
