const knex = require('../../utils/knex')
const boom = require('boom')

const User = require('../../models/User')
const Role = require('../../models/Role')
const UserOrganizationRole = require('../../models/UserOrganizationRole')

exports = module.exports = {}


exports.usersGetAll = (options) => {
	const { page, pageSize } = options

	return User.fetchPage({
		page,
		pageSize,
		withRelated: ['scopes'],
	})
}

/**
 * Insert a user into the database
 * @async
 * @param		{Object}	userObj			- user object
 * @throws	{Error}								- an error if password hash fails or if database query fails
 * @returns	{Number[]}						- returns an array containg the id of the created user
 */
exports.insert = async (userObj) => {
	const now = new Date

	userObj.create_at = now
	userObj.updated_at = now

	return knex('user')
		.insert(userObj)
}

/**
 * Count users by email query Promise
 * @param		{string}	email	- email and login username, unique
 * @throws	{error}					- an error if database query fails
 * @returns	{Promise}				- returns the query promise
 */
exports.countByEmail = (email) => {
	return knex('user')
		.count()
		.where({ email })
}

/**
 * Count users by id
 * @async
 * @param		{number}		id	- user id
 * @throws	{error}					- an error if database query fails
 * @returns	{object[]}			- returns and array containg an object with the count
 */
exports.countByID = async (id) => {
	return await knex('user').count().where({ 'user.id': id })
}

/**
 * Select one user by id
 * @async
 * @param		{number}				id	- user id
 * @throws	{error}							- an error if database query fails
 * @returns	{database_user}			- returns the user object from the database
 */
exports.selectByID = async (id) => {
	return await knex('user').select(
		'user.id',
		'user.email',
		'user.full_name',
		'user.password',
		'user.avatar',
		'user.phone_number',
		'user.bio',
		'user.activated',
		'user.github_id',
		'user.created_at',
		'user.updated_at',
		'user_two_fa.method',
		{ tfa: 'user_two_fa.verified' }
	).where({ 'user.id': id })
		.leftJoin('user_two_fa', 'user.id', 'user_two_fa.user_id')
}

/**
 * Select one user by id
 * @async
 * @param		{string}				email	- user email
 * @throws	{error}								- an error if database query fails
 * @returns	{database_user}				- returns the user object from the database
 */
exports.selectByEmail = async (email) => {
	return await knex('user').select(
		'user.id',
		'user.email',
		'user.full_name',
		'user.password',
		'user.avatar',
		'user.phone_number',
		'user.activated',
		'user.github_id',
		'user.created_at',
		'user.updated_at',
		{ tfa: 'user_two_fa.verified' },
	).where({ 'user.email': email })
		.leftJoin('user_two_fa', 'user.id', 'user_two_fa.user_id')
}

/**
 * Select user's password by id
 * @async
 * @param		{Number}	id	- user id
 * @throws	{error}				- an error if database query fails
 * @returns	{string}			- passowrd
 */
exports.selectPasswordByID = async (id) => {
	return await knex('user').select('password').where({ id: id })
}

/**
 * Updates user's information
 * @async
 * @param		{Number}	id				- user id
 * @param		{String}	fullName	-	user full name
 * @param		{String}	avatar		- user avatar
 * @param		{String}	phone			- user phone number
 * @param		{String}	bio				- user bio
 * @throws	{Error}							- an error if database query fails
 * @returns	{Object}						-
 */
exports.updateUserByID = async (id, fullName, avatar, phone, bio) => {

	const updateObj = {
		full_name: fullName,
		avatar: avatar === '' ? null : avatar,
		phone_number: phone === '' ? null : phone,
		bio: bio,
		updated_at: new Date,
	}

	return await knex('user').update(updateObj).where({ id: id })

}

/**
 * Deletes user's information
 * @async
 * @param		{Number}	id	- user id
 * @throws	{Error}				- an error if database query fails
 * @returns	{Void}				-
 */
exports.deleteUserByID = async (id) => {

	return await knex('user').where({ id: id }).del()

}

/**
 * Updates user's password by id
 * @async
 * @param		{Number}	id				- user id
 * @param		{String}	password	- user password
 * @throws	{error}							- an error if database query fails
 * @returns	{string}						- passowrd
 */
exports.updatePasswordByID = async (id, password) => {

	const updateObj = {
		password: password,
		updated_at: new Date,
	}

	return await knex('user').update(updateObj).where({ id: id })

}

/**
 * Count users by github ID
 * @async
 * @param		{Number}	githubID	- user's github id
 * @throws	{error}							- an error if database query fails
 * @returns	{object[]}					- returns and array containg an object with the count
 */
exports.countByGithubID = async (githubID) => {
	return await knex('user').count().where({ github_id: githubID })
}

/**
 * Updates user's information
 * @async
 * @param		{Number}	githubID	- user id
 * @param		{String}	email			-	user email
 * @param		{String}	fullName	- user full name
 * @param		{String}	avatar		- user avatar
 * @throws	{Error}							- an error if database query fails
 * @returns	{Object}						-
 */
exports.updateUserByGithubID = async (githubID, email, fullName, avatar) => {

	const updateObj = {
		full_name: fullName,
		avatar: avatar === '' ? null : avatar,
		updated_at: new Date,
	}

	return await knex('user').update(updateObj).where({ github_id: githubID })
}

exports.updateUserByEmail = async (email, fullName, avatar, githubID) => {

	const updateObj = {
		full_name: fullName,
		avatar: avatar === '' ? null : avatar,
		github_id: githubID,
		updated_at: new Date,
	}

	return await knex('user').update(updateObj).where({ email: email })
}

/**
 * Insert a user into the database
 * @async
 * @param		{Number}	githubID		- user's github id
 * @param		{String}	email				- email and login username, unique
 * @param		{String}	fullName		- user's full name
 * @param		{String}	avatar			- user's avatar
 * @throws	{Error}								- an error if password hash fails or if database query fails
 * @returns	{Number[]}						- returns an array containg the id of the created user
 */
exports.inserGithubUser = async (githubID, email, fullName, avatar) => {

	const now = new Date

	const user = {
		github_id: githubID,
		email: email,
		full_name: fullName,
		avatar: avatar,
		created_at: now,
		updated_at: now,
	}

	return await knex('user').insert(user)

}

/**
 * Select one user by github id
 * @async
 * @param		{Number}				githubID	- user github id
 * @throws	{Error}										- an error if database query fails
 * @returns	{database_user}						- returns the user object from the database
 */
exports.selectByGithubID = async (githubID) => {
	return await knex('user').select(
		'user.id',
		'user.email',
		'user.full_name',
		'user.password',
		'user.avatar',
		'user.phone_number',
		'user.activated',
		'user.github_id',
		'user.created_at',
		'user.updated_at',
		{ tfa: 'user_two_fa.verified' },
	).where({ 'user.github_id': githubID })
		.leftJoin('user_two_fa', 'user.id', 'user_two_fa.user_id')
}


exports.count2FAbyUserID = async (userID) => {
	return await knex('user_two_fa').count().where({ user_id: userID })
}

exports.insert2FA = async (userID, secret, method, verified) => {

	const now = new Date

	const tfa = {
		user_id: userID,
		secret: secret,
		method: method,
		verified: verified,
		created_at: now,
		updated_at: now,
	}

	return await knex('user_two_fa').insert(tfa)
}

exports.delete2FA = async (userID) => {
	return await knex('user_two_fa').where({ user_id: userID }).del()
}

exports.insertProfileID = async (userID, profileID) => {

	const now = new Date

	const up = {
		user_id: userID,
		profile_id: profileID,
		created_at: now,
		updated_at: now,
	}

	return await knex('user_profile').insert(up)

}

/**
 * Create a recovery code for a given user
 * @param		{Number}		userID					- user id
 * @param		{String}		recoveryCode		- recovery code
 * @returns {Promise}										- query promise
 */
exports.createUserRecoveryCode = (userID, recoveryCode) => {
	return knex('user_recovery_code')
		.insert({ user_id: userID, code: recoveryCode })
}

/**
 * Create a recovery code for a given user
 * @param		{Number}		userID					- user id
 * @returns {Promise}										- query promise
 */
exports.getRecoveryCodesByUserID = (userID) => {
	return knex('user_recovery_code')
		.select('*')
		.where({ user_id: userID })
}

/**
 * Delete a recovery code for a given user
 * @param		{Number}		codeID					- user id
 * @returns {Promise}										- query promise
 */
exports.removeRecoveryCodeByID = (codeID) => {
	return knex('user_recovery_code')
		.where({ id: codeID })
		.del()
}

exports.getRolesByUser = async (userId) => {

	try {

		const options = { require: false, withRelated: ['roles', 'roles.role'] }
		const user = await User.findOne({id: userId}, options)
		const roles = user.related('roles')
			.toJSON()
			.sort((a,b) => a.role.level > b.role.level)
			.map(r => {
				return {
					role: r.role.name,
					organizationId: r.orgId,
				}
			})	
		
		return roles

	} catch (error) {
		throw boom.internal(error)
	}
}

exports.getRolesByUserAndOrganization = async (userId, orgId) => {
	const result = await new UserOrganizationRole({user_id: userId, organization_id: orgId})
		.fetchAll({withRelated: ['role']})

	try {

		const retVal = result.toJSON()
			.sort((a,b) => a.role.level > b.role.level)
			.map(r => r.role.name)		

		return retVal
	} catch (error) {
		throw boom.internal(error)
	}
}

exports.addUserOrganizationRole = async (userId, orgId, roleId, opts) => {
	const now = new Date()

	return await UserOrganizationRole.create({
		user_id: userId,
		organization_id: orgId,
		role_id: roleId,
		created_at: now,
		updated_at: now,
	}, opts)

}

exports.updateUserOrganizationRole = async (userRoleId, roleId) => {
	const now = new Date()

	return await UserOrganizationRole.forge({id: userRoleId})
		.save({role_id: roleId, updated_at: now}, {patch:true})
}

exports.removeUserOrganizationRole = async (userRoleId) => {
	return await UserOrganizationRole
		.forge({id: userRoleId})
		.destroy()
}

exports.getAllUserOrganizationRoles = async(userId, page, pageSize) => {
	return await UserOrganizationRole
		.forge({user_id: userId})
		.fetchPage({
			page,
			pageSize,
			withRelated: ['role', 'organization'],
		})
}

exports.getUserOrganizationRoles = async(userId, orgId) => {


	const user =  await User.findOne({ id: userId},
		{
			withRelated: [
				'roles.role',
				{ 
					roles : (qb)=> { 
						qb.where('organization_id', orgId) 
					},
				},
			], 
		})

	const retval = user.related('roles').toJSON().map((role) => {
		return {
			id: role.roleId,
			name: role.role.toJSON().name,
			organizationId: role.orgId,
		}
	})
	return retval
}

exports.getUserOrganizationRole = async(userId, orgId, roleId) => {
	return await UserOrganizationRole
		.where({user_id: userId, organization_id: orgId, role_id: roleId})
		.fetch()
}

exports.getExistingRoles = async () => {
	return await Role.forge()
		.fetchAll()
}

exports.getUserRole = async(userId, orgId, roleId) => {
	
	return await UserOrganizationRole
		.forge({user_id: userId, organization_id: orgId, role_id: roleId})
		.fetch({withRelated: ['role']})
}
