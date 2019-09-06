const bcrypt = require('bcrypt')
const boom = require('boom')
const uuid = require('uuid')
const config = require('../../config')

const bookshelf = require('../../utils/bookshelf')
const persistence = require('./persistence')

const sandboxAuthServerSrvc = require('../sandboxAuthServer')
const orgSrvc = require('../organization')

// Models
const UserActivationTicket = require('../../models/UserActivationTicket')
const User = require('../../models/User')
const Scope = require('../../models/Scope')
const Organization = require('../../models/Organization')
const ActionRole = require('../../models/ActionRole')

const saltRounds = 10

exports = module.exports = {}

/**
 * Module responsible for all user functions.
 * @module services/user
 */


/**
 * Returns a list of users with their scopes
 *
 * @param {Object} options					- Pagination options
 * @returns {Array.<User>} users		- A collection of users
 */
exports.getUsersWithScopes = async (options) => {
	const users = await persistence.usersGetAll(options)

	return {
		pagination: users.pagination,
		users: users.length === 0 ? [] : users.map(user => ({
			...user.toJSON(),
			scopes: user.related('scopes').toJSON().length > 0 ? user.related('scopes').toJSON().map(scope => scope.name) : [],
		})),
	}
}

exports.userGrantAdmin = async (userId) => {
	const user = await findUser({ id: userId })
	const adminScope = await Scope.findOne({ name: 'admin' })

	const isAlreadyAdmin = user.related('scopes').toJSON().filter(scope => scope.name === adminScope.toJSON().name).length > 0
	if (!isAlreadyAdmin) {
		await user.related('scopes').create(adminScope)
	}

	return {
		...user.toJSON(),
		scopes: user.related('scopes').toJSON().map(scope => scope.name),
	}
}

exports.userRevokeAdmin = async (userId) => {
	const user = await findUser({ id: userId })
	const adminScope = await Scope.findOne({ name: 'admin' })

	const hasAdminScope = user.related('scopes').toJSON().filter(scope => scope.name === adminScope.toJSON().name).length > 0
	if (hasAdminScope) {
		await user.related('scopes').detach([adminScope.get('id')])
	}

	return {
		...user.toJSON(),
		scopes: user.related('scopes').toJSON().map(scope => scope.name),
	}
}

/**
 * Returns a promise to find a user with scopes having a query
 * @param		{Object}	query				- Query object
 * @param		{Object}	options			- Options object
 * @returns	{Promise}							- Returns the promise
 */
const findUser = (query, options) => {
	options = options || { require: false, withRelated: ['scopes'] }
	return User.findOne(query, options)
}

exports.findUser = findUser

/**
 * Creates a user
 * @async
 * @param		{Object}	userObj			- user object
 * @throws	{Error}								- an error if password hash fails or if database query fails
 * @returns	{Number}							- returns the id of the created user
 */
exports.create = async (userObj) => {
	userObj.password = await bcrypt.hash(userObj.password, saltRounds)
	const id = await persistence.insert(userObj)
	return id[0]
}

/**
 * Creates a user given his attrs
 * 
 * @async
 * @param		{Object}	userObj			- user object
 * @throws	{Error}								- an error if query fails
 * @returns	{Number}							- returns the user model
 */
exports.createUser = async (userObj) => await User.create(userObj)

/**
 * Check if a user exists
 * @async
 * @param		{string}	email	- email and login username, unique
 * @throws	{error}					- an error if database query fails
 * @returns	{boolean}				- returns true if the user count is > 0; false otherwise
 */
exports.existsByEmail = async (email) => {
	const count = await persistence.countByEmail(email)
	return (count[0]['count(*)'] > 0)
}

/**
 * Check if a user exists
 * @async
 * @param		{number}	id		- user id
 * @throws	{error}					- an error if database query fails
 * @returns	{boolean}				- returns true if the user count is > 0; false otherwise
 */
exports.existsByID = async (id) => {

	const count = await persistence.countByID(id)

	if (count[0]['count(*)'] > 0) {
		return true
	}

	return false

}

/**
 * Get one user by id
 * @async
 * @param		{number}				id	- user id
 * @throws	{error}							- an error if database query fails
 * @returns	{database_user}			- returns the user object from the database
 */
exports.getByID = async (id) => {
	const user = await persistence.selectByID(id)
	return user[0]
}

/**
 * Get one user by email
 * @async
 * @param		{string}				email	- user email
 * @throws	{error}								- an error if database query fails
 * @returns	{database_user}				- returns the user object from the database
 */
exports.getByEmail = async (email) => {
	const user = await persistence.selectByEmail(email)
	return user[0]
}

/**
 * Change user information
 * @async
 * @param		{Number}	id				- user id
 * @param		{String}	fullName	- user full name
 * @param		{String}	avatar		- user avatar
 * @param		{String}	phone			- user phone number
 * @param		{String}	bio				- user bio
 * @throws	{Error}							- an error if database query fails or if current password doesn't match
 * @returns	{Boolean}						-
 */
exports.updateUserByID = async (id, fullName, avatar, phone, bio) => {
	return await persistence.updateUserByID(id, fullName, avatar, phone, bio)
}

/**
 * Returns a promise of deleting a user by id
 *
 * @param		{Number}	id		- User id
 * @returns	{Promise}				-
 */
exports.deleteUserByID = async (id) => {
	// Deletes the apps related when the user is the last of the organization
	const user = await findUser({ id }, { withRelated: ['organizations'] })
	const organizations = user.related('organizations').toJSON()

	if (organizations.length > 0) {
		organizations.forEach(async org => {
			const orgWithUsers = await Organization.findOne({ id: org.id }, { withRelated: ['users'] })

			if (orgWithUsers.related('users').length <= 1) {
				const apps = await sandboxAuthServerSrvc.listApps(org.id)
				return apps.forEach(async app => await sandboxAuthServerSrvc.deleteApp(app.id))
			}
		})
	}

	// Deletes the user
	return await User.destroy(id)
}

/**
 * Change user password
 * @async
 * @param		{Number}	id					- user id
 * @param		{String}	oldPassword	- current user password
 * @param		{String}	newPassword	- new user password
 * @throws	{error}								- an error if database query fails or if current password doesn't match
 * @returns	{boolean}							-
 */
exports.updatePasswordByID = async (id, oldPassword, newPassword) => {

	const oldHash = await persistence.selectPasswordByID(id)

	const valid = await bcrypt.compare(oldPassword, oldHash[0].password)

	if (!valid) {
		throw boom.badRequest()
	}

	const newHash = await bcrypt.hash(newPassword, saltRounds)

	return await persistence.updatePasswordByID(id, newHash)

}

/**
 * recover user password
 * @async
 * @param		{Number}	id					- user id
 * @param		{String}	newPassword	- new user password
 * @throws	{error}								- an error if database query fails or if current password doesn't match
 * @returns	{boolean}							-
 */
exports.recoverPassword = async (id, newPassword) => {

	const newHash = await bcrypt.hash(newPassword, saltRounds)

	return await persistence.updatePasswordByID(id, newHash)

}

/**
 * Updates or adds an user using it's github information
 * @param		{Number} githubID		- user's github id
 * @param		{String} email			- user's email
 * @param		{String} fullName		- user's full name
 * @param		{String} avatar			-	user's avatar url
 * @throws	{Error}							- an error if database query fails
 * @returns	{Void}							-
 */
exports.upsertGithub = async (githubID, email, fullName, avatar) => {

	let count = await persistence.countByGithubID(githubID)

	if (count[0]['count(*)'] > 0) {
		await persistence.updateUserByGithubID(githubID, email, fullName, avatar)
		return
	}

	count = await persistence.countByEmail(email)

	if (count[0]['count(*)'] > 0) {
		await persistence.updateUserByEmail(email, fullName, avatar, githubID)
		return
	}

	return await persistence.inserGithubUser(githubID, email, fullName, avatar)

}

/**
 * Get one user by it's github id
 * @async
 * @param		{Number}				githubID	- user github id
 * @throws	{Error}										- an error if database query fails
 * @returns	{database_user}						- returns the user object from the database
 */
exports.getByGithubID = async (githubID) => {
	const user = await persistence.selectByGithubID(githubID)
	return user[0]
}

/**
 * Save profileID to user
 * @async
 * @param		{Number}	userID		- user id
 * @param		{Number}	profileID	- profile id
 * @throws	{Error}							- an error if database query fails
 * @returns	{Void}							-
 */
exports.saveProfile = async (userID, profileID) => {
	await persistence.insertProfileID(userID, profileID)
}

/**
 * Generates an activation code for a specific user given his ID
 * @async
 * @param 	{Number}	userID		- user id
 * @throws	{Error}							- an error if database query fails
 * @returns	{Number} code				-
 */
exports.generateUserActivationTicket = async (userID) => {
	const activationCode = uuid.v4()
	const expiresAt = new Date(new Date().getTime() + 60 * 60 * 24 * config.get('users').activationCode.expiration * 1000)

	// If user has one ticket already, update the ticket, else create it
	return await UserActivationTicket.upsert(
		{
			user_id: userID,
		}, {
			activation_code: activationCode,
			expires_at: expiresAt,
		})
}

/**
 * Returns a user account confirmation ticket given an activation code
 * @async
 * @param 	{String}	activationCode		- activation code
 * @throws	{Error}											- an error if database query fails
 * @returns	{Object}										- activation ticket
 */
exports.getUserAccountActivationTicket = async (activationCode) => {
	return await UserActivationTicket.findOne({ activation_code: activationCode })
}

/**
 * Activates a user by id
 * @async
 * @param 	{Int}	activationTicketId		- Activation ticket id
 * @param 	{Int}	userId								- User id
 * @throws	{Error}											- An error if database query fails
 * @returns	{Void}											-
 */
exports.activateUserAccount = async (activationTicketId, userId) => {
	return await bookshelf.transaction((trx) => {

		// Update user activation status, then remove activation ticket
		return User.update({ activated: 1 }, { id: userId }, { transacting: trx })
			.then(() => UserActivationTicket.destroy({ id: activationTicketId }, { transacting: trx }))
	})
}

/**
 * Create a user object to the returned by the API
 * @param		{database_user}	user	- user object from the database
 * @returns	{rest_user}						- returns the user object to be send by the API
 */
exports.present = (user) => {

	const method = user.method && user.method.length > 0 ? user.method : ''

	return {
		id: user.id,
		email: user.email,
		fullName: user.full_name,
		avatar: user.avatar ? user.avatar : '',
		bio: user.bio ? user.bio : '',
		phone: user.phone_number ? user.phone_number : '',
		activated: !!user.activated,
		twoFA: typeof user.tfa !== 'boolean' ? ( user.tfa === 1 ? true : false) : user.tfa,
		twoFAMethod: method,
		github: user.github_id ? true : false,
		created: user.created_at.toISOString(),
		updated: user.updated_at.toISOString(),
	}
}

/**
 * Gets the user roles on a given organization
 * @param {Number} userId - The user Id
 * @param {Number} orgId  - The organization Id
 * @returns { Array } -
 */
exports.getRolesByUserAndOrganization = async (userId, orgId) => {
	return await persistence.getRolesByUserAndOrganization(userId, orgId)
}

/**
 * Gets the user roles grouped by organization
 * @param {Number} userId - The user Id
 * @returns { Array } -
 */
exports.getRolesByUser = async (userId) => {	
	const options = { require: false, withRelated: ['roles', 'roles.role'] }
	const user = await User.findOne({id: userId}, options)
	const roles = user.related('roles')
		.toJSON()
		.sort((a,b) => a.role.level > b.role.level)
		.map(r => {
			return {
				role: r.role.toJSON().name,
				organizationId: r.orgId,
			}
		})	
	
	return roles
}

exports.addUserOrganizationRole = async (userId, orgId, roleId, opts) => {
	return await persistence.addUserOrganizationRole(userId, orgId, roleId, opts)
}

exports.updateUserOrganizationRole = async (userRoleId, roleId) => {
	return await persistence.updateUserOrganizationRole(userRoleId, roleId)
}

exports.removeUserOrganizationRole = async (userRoleId) => {
	return await persistence.removeUserOrganizationRole(userRoleId)
}

exports.getAllUserOrganizationRoles = async(userId, page, pageSize) => {
	return await persistence.getAllUserOrganizationRoles(userId, page, pageSize)
}

exports.getUserOrganizationRoles = async(userId, orgId) => {
	return await persistence.getUserOrganizationRoles(userId, orgId)
}

exports.getUserRole = async (userId, organizationId, roleId) => {
	return await persistence.getUserRole(userId,organizationId, roleId)
}

exports.getExistingRoles = async () => {
	return await persistence.getExistingRoles()
}

exports.canUpdateUserRole = async (userId, organizationId) => {
	// get organization users and check for admin roles
	const userList = await orgSrvc.listOrganizationUsers(organizationId)
	const adminUser = userList.users.filter((user) => {
		const u = user.roles.find((role) => {
			// search for users with admin role in the organization
			return role.id === 1
		})
		return !u ? false : true
	})

	// check if user belong to organization
	const user = userList.users.find((u) => {
		return u.id === Number(userId)
	})
	if (!user) {
		throw boom.preconditionFailed('User does not belong to this organization.')
	}

	// checking if user is the only admin in the organization
	if (adminUser.length === 1 && adminUser[0].id === Number(userId)) {
		throw boom.preconditionFailed('User is the only admin of this organization his role cannot change.')
	}

	return true
}

exports.getActionsAvailableForUserRoles = async (userId, organizationId) => {
	const userRoles = await persistence.getUserOrganizationRoles(userId, organizationId)
	const roles = userRoles.map((role) => role.id)
	
	const actions = await ActionRole
		.forge()
		.where('role_id', 'in', roles)
		.fetchAll()
	
	const serialized = actions ? actions.toJSON() : []

	return serialized.map((action) => action.action)

}

/**
 * The database user object
 * @typedef		{Object}	database_user
 * @property	{Number}	id						- User ID
 * @property	{String}	email					- User's email address
 * @property	{String}	full_name			- User's full name
 * @property	{String}	avatar				- User's avatar
 * @property	{String}	phone_number	- User's phone number
 * @property	{Boolean}	activated			- User's account activation status
 * @property	{Date}		create_at			- Date of users creation
 * @property	{Date}		updated_at		- Date in which the user was last updated
 */

/**
* The REST user object
* @typedef	{Object}	rest_user
* @property	{Number}	id						- User ID
* @property	{String}	email					- User's email address
* @property	{String}	fullName			- User's full name
* @property	{String}	avatar				- User's avatar
* @property	{String}	phone					- User's phone number
* @property	{Boolean}	activated			- User's account activation status
* @property	{String}	create				- Date of users creation
* @property	{String}	updated				- Date in which the user was last updated
*/
