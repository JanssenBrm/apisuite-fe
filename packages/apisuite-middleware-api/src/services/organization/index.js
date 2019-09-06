const Organization = require('../../models/Organization')
const User = require('../../models/User')
const userPersistence = require('../../services/user/persistence')
const Logger = require('../../utils/logger')
const Boom  = require('boom')

const persistence = require('./persistence')

exports = module.exports = {}

/**
 * Module responsible for all organization services.
 * @module services/organization
 */

exports.isValidated = (state) => {
	return state !== 'NON_VALIDATED'
}

/**
 * List organizations
 * @async
 * @param {Object} options							- Options including pagination
 * @returns {Array.<Organization>}			- A collection of organizations
 */
exports.listOrganizationsWithUsers = async (options) => {
	const { page, pageSize, state } = options

	const organizations = await Organization
		.where('state', 'IN', state)
		.fetchPage({
			pageSize,
			page,
			withRelated: 'users',
		})

	return {
		pagination: organizations.pagination,
		organizations: organizations.map(org => ({
			...org.toJSON(),
			users: org.related('users').map(user => ({
				...user.toJSON(),
				role: user.pivot.get('role'),
			})),
		})),
	}
}

/**
 * List user organizations
 * @async
 * @param {Int} userId 									- User id
 * @throws {Error}											- An error if fails
 * @returns {Array.<Organization>}			- A collection of organizations
 */
const listUserOrganizations = async (userId) => {
	const userOrganizations = await User.findOne({ id: userId }, {
		withRelated: [
			'organizations', {
				'organizations.certificates': (qb) => {
					qb.column('id', 'expiration_date', 'organization_id')
				},
			},
		],
	})

	let orgsCerts = userOrganizations.related('organizations').map((org) => {
		return { ...org.toJSON(), certificates: org.related('certificates').toJSON() }
	})

	return orgsCerts
}

exports.listUserOrganizations = listUserOrganizations

/**
 * Checks if organization belongs to user
 * @async
 * @param {Int} userId 									- User id
 * @param {Int} organizationId 					- Organization id
 * @throws {Error}											- An error if fails
 * @returns {Boolean}										-
 */
exports.getUserOrganization = async (userId, organizationId) => {
	return await Organization.findOne(
		{
			id: organizationId,
		},
		{
			withRelated: [
				{
					users: (qb) => {
						qb.where('user.id', userId)
					},
				},
				'products',
			],
		})
}

/**
 * Update organization
 * @async
 * @param {Int} organizationId 					- Organization id
 * @param {Object} organizationData 		- Organization data to update
 * @param {Object} opts									- Query options
 * @throws {Error}											- An error if fails
 * @returns {Organization}							- An updated organization
 */
exports.updateOrganization = async (organizationId, organizationData, opts) => {
	return await Organization.update(organizationData, { id: organizationId, ...opts })
}

exports.getOrganization = async (query) => {
	return await Organization.findOne(query, { withRelated: ['users', 'products'], require: false })
}

/**
 * List organization Users
 * @async
 * @param { Number } organizationId			- Organization id
 * @returns {Array.<User>}			- A collection of Users
 */
const listOrganizationUsers = async (organizationId) => {

	const organization = await Organization
		.forge({id: organizationId})
		.fetch({withRelated: [
			'users',
			'users.roles',
			'users.roles.role',
			'users.tfa',
		]})

	const users = organization.related('users')
	
	const userWithRoles = users.map((user) => {

		let tfa = user.related('tfa')

		if (!tfa) {
			tfa = {
				enabled: false,
			}
		} else {
			tfa = tfa.toJSON()
			tfa = {
				enabled: true,
				method: tfa.method,
			}
		}


		return {
			...user.toJSON(),
			twofa: tfa,
			roles: user.related('roles').map((r) => {
				const {id, name} = r.related('role').toJSON()				
				const { orgId } = r.toJSON()
				return { id, orgId, name }
			}).filter((role) => role.orgId.toString() === organizationId.toString() ),
		}
	})

	const roleList = await userPersistence.getExistingRoles()


	const retval = {
		users: userWithRoles,
		roles: roleList.toJSON(),
	} 

	return retval
}

exports.listOrganizationUsers = listOrganizationUsers

/**
 * Remove organization User
 * @async
 * @param { Number } userId - User Id
 * @param { Number } organizationId			- Organization id
 * @returns { Void }			- 
 */
exports.removeUserFromOrganization = async (userId ,organizationId) => {
	
	try {
		await persistence.removeUserFromOrganization(userId, organizationId)
		
	} catch (error) {
		Logger.error(error)
		throw Boom.internal(error)
	}
	
}

exports.canRemoveUser = async (userId, organizationId) => {
	const userOrgs = await listUserOrganizations(userId)

	// check if user belong to organization or only has this one organization
	const foundOrg = userOrgs.find((org) => {
		return org.id === Number(organizationId)
	})
	if (!foundOrg) {
		Logger.error('User does not belongs to the organization.')
		return false
	} else if (userOrgs.length === 1) {
		Logger.error('User only belongs to this organization.')
		return false
	}

	// check if user is the only admin on the account
	const userList = await listOrganizationUsers(organizationId)
	const users = userList.users.filter((user) => {
		const u = user.roles.find((role) => {
			// search for users with admin role in the organization
			return role.id === 1
		})
		return !u ? false : true
	})
	if (users.length === 1 && users[0].id === Number(userId)) {
		Logger.error('User is the only admin of this organization.')
		return false
	}

	return true
}

exports.areUsersInOrg = async (requesterId, userId, organizationId) => {
	const userList = await listOrganizationUsers(organizationId)
	// check if user belong to organization
	const users = userList.users.filter((user) => {
		return user.id === Number(requesterId) || user.id === Number(userId)
	})

	return users.length === 2 || (users.length === 1 && Number(requesterId) === Number(userId))
}
