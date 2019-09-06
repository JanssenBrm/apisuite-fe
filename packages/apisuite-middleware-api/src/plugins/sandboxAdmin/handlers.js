const Joi = require('joi')
const Boom = require('boom')

const log = require('../../utils/logger')
const sandboxAuthServerSrvc = require('../../services/sandboxAuthServer')
const organizationSrvc = require('../../services/organization')
const productSubscriptionSrvc = require('../../services/productSubscription')
//const activityLog = require('../../utils/activity-log')

exports = module.exports = {}

/**
 * @memberof module:plugins/sandboxAdmin
 */


/**
 * Check if the organization has the necessary conditions to access the sandbox data
 * @param {Object} organization - Bookshelf object
 * @returns {Boolean} 					- Returns true if the organization is allowed to access the sandbox data. False otherwise.
 */
const canOrganizationAccessSandbox = async (organization) => {
	let res = true
	const orgId = organization.get('id')

	if (!organization || organization.related('users').length === 0) {
		log.error('organization does not belong to the user')
		res = false
	}

	// Check if the organization has products subscriptions
	// TODO: for now, all the apis are the same, but this will have to changed once we get different apis
	const subscriptions = await productSubscriptionSrvc.listOrganizationProducts(orgId)
	if (!subscriptions.length) {
		log.error(`no subscriptions found for organisation ${orgId}`)
		res = false
	}

	// Check if the organization has created an app
	const apps = await sandboxAuthServerSrvc.listApps(orgId)
	if (!apps.length) {
		log.error(`no apps found for organisation ${orgId}`)
		res = false
	}

	// Check if the organization has the correct access
	if (!organizationSrvc.isValidated(organization.get('state'))) {
		log.error(`${organization.get('state')} is an invalid state to retrieve testdata`)
		res = false
	}

	return res
}

/**
 * GET /organizations/{orgId}/testdata
 */
exports.getTestData = {
	id: 'ob-get-list-psus',
	description: 'Returns a list of PSUs',
	notes: ['Returns organization PSUs enriched with the linked accounts'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'Ok' },
				'400': { 'description': 'Bad Request' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
	},
	auth: {
		strategy: 'appcenterToken',
	},
	response: {
		status: {
			200: Joi.object().keys({
				users: Joi.array().items(),
				pagination: Joi.object(),
			})
				.label('organization-psus'),
		},
	},
	validate: {
		params: {
			orgId: Joi.number().integer(),
		},
		query: {
			page: Joi.number().integer()
				.min(1)
				.default(1),
			pageSize: Joi.number().integer()
				.positive()
				.default(5),
		},
	},
	pre: [
		// Validate if organization exists, belongs to the user and is validated
		{
			assign: 'organization',
			method: async (request) => {
				const organization = await organizationSrvc.getUserOrganization(request.auth.artifacts.user.get('id'), request.params.orgId)
					.catch(() => {
						log.error('getTestData: organization not found')
						throw Boom.forbidden()
					})

				const canAccessSandbox = await canOrganizationAccessSandbox(organization)
				if (!canAccessSandbox) {
					throw Boom.forbidden()
				}

				return organization
			},
		},
		{
			assign: 'orgContainer',
			method: async (request) => {
				const orgContainer = await sandboxAuthServerSrvc.getOrgContainer(request.params.orgId)
				if (!orgContainer) {
					log.error('getTestData: organization container not found')
					throw Boom.unauthorized()
				}

				return orgContainer
			},
		},
	],
	handler: async (request) => {
		const { page, pageSize } = request.query
		const { name } = request.pre.orgContainer
		const options = {
			page,
			pageSize,
		}
		return await sandboxAuthServerSrvc.getPsus(name, options)
	},
}

/**
 * GET /organizations/{orgId}/testdata/{psuId}
 */
exports.getPsuDetails = {
	id: 'ob-get-psu-details',
	description: 'Returns a PSU with its accounts and balances details',
	notes: ['Returns organization PSU enriched with the linked accounts and balances'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'Ok' },
				'400': { 'description': 'Bad Request' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
	},
	auth: {
		strategy: 'appcenterToken',
	},
	validate: {
		params: {
			orgId: Joi.number().integer(),
			psuId: Joi.number().integer(),
		},
	},
	pre: [
		// Validate if organization exists, belongs to the user and is validated
		{
			assign: 'organization',
			method: async (request) => {
				const organization = await organizationSrvc.getUserOrganization(request.auth.artifacts.user.get('id'), request.params.orgId)
					.catch(() => {
						log.error('getTestData: organization not found')
						throw Boom.forbidden()
					})

				const canAccessSandbox = await canOrganizationAccessSandbox(organization)
				if (!canAccessSandbox) {
					throw Boom.forbidden()
				}

				return organization
			},
		},
		{
			assign: 'orgContainer',
			method: async (request) => {
				const orgContainer = await sandboxAuthServerSrvc.getOrgContainer(request.params.orgId)
				if (!orgContainer) {
					log.error('getTestData: organization container not found')
					throw Boom.unauthorized()
				}

				return orgContainer
			},
		},
	],
	handler: async (request) => {
		const { psuId } = request.params
		const { name } = request.pre.orgContainer
		return await sandboxAuthServerSrvc.getPsuDetails(name, psuId)
	},
}

/**
 * PUT /organizations/{orgId}/testdata/{psuId}
 */
exports.updatePSU = {
	id: 'ob-put-psu-details',
	description: 'Returns an updated PSU with its accounts and balances details',
	notes: ['Returns an updated PSU enriched with the linked accounts and balances'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'Ok' },
				'400': { 'description': 'Bad Request' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
	},
	auth: {
		strategy: 'appcenterToken',
	},
	validate: {
		params: {
			orgId: Joi.number().integer(),
			psuId: Joi.number().integer(),
		},
		payload: {
			name: Joi.string().required(),
			password: Joi.string().required(),
			email: Joi.string().required(),
			avatarUrl: Joi.string().allow(null, '').default(''),
		},
	},
	pre: [
		// Validate if organization exists, belongs to the user and is validated
		{
			assign: 'organization',
			method: async (request) => {
				const organization = await organizationSrvc.getUserOrganization(request.auth.artifacts.user.get('id'), request.params.orgId)
					.catch(() => {
						log.error('getTestData: organization not found')
						throw Boom.forbidden()
					})

				const canAccessSandbox = await canOrganizationAccessSandbox(organization)
				if (!canAccessSandbox) {
					throw Boom.forbidden()
				}

				return organization
			},
		},
		{
			assign: 'orgContainer',
			method: async (request) => {
				const orgContainer = await sandboxAuthServerSrvc.getOrgContainer(request.params.orgId)
				if (!orgContainer) {
					log.error('getTestData: organization container not found')
					throw Boom.unauthorized()
				}

				return orgContainer
			},
		},
	],
	handler: async (request) => {
		const { params, payload } = request
		const { psuId } = params
		const { name } = request.pre.orgContainer
		const result = await sandboxAuthServerSrvc.updatePSU(name, psuId, payload)

		/*
		// ACTIVITYLOGUNCOMMENT
		await activityLog.log(
			request.auth.artifacts.user.get('id'),
			[request.params.orgId],
			'TEST_USER_UPDATE',
			'sandbox',
			`User ${ request.auth.artifacts.user.get('name') } updated test user ${ request.payload.email }.`
		)
		*/

		return result
	},
}

/**
 * GET /organizations/{orgId}/testdata/{accountId}/transactions
 */
exports.getAccountTransactions = {
	id: 'ob-get-account-transactions',
	description: 'Returns a list of account resource transactions',
	notes: ['Returns account resource transactions with pagination'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'Ok' },
				'400': { 'description': 'Bad Request' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
	},
	auth: {
		strategy: 'appcenterToken',
	},
	validate: {
		params: {
			orgId: Joi.number().integer(),
			accountId: Joi.number().integer(),
		},
		query: {
			page: Joi.number().integer()
				.min(1)
				.default(1),
			pageSize: Joi.number().integer()
				.positive()
				.default(5),
		},
	},
	pre: [
		// Validate if organization exists, belongs to the user and is validated
		{
			assign: 'organization',
			method: async (request) => {
				const organization = await organizationSrvc.getUserOrganization(request.auth.artifacts.user.get('id'), request.params.orgId)
					.catch(() => {
						log.error('getTestData: organization not found')
						throw Boom.forbidden()
					})

				const canAccessSandbox = await canOrganizationAccessSandbox(organization)
				if (!canAccessSandbox) {
					throw Boom.forbidden()
				}

				return organization
			},
		},
		{
			assign: 'orgContainer',
			method: async (request) => {
				const orgContainer = await sandboxAuthServerSrvc.getOrgContainer(request.params.orgId)
				if (!orgContainer) {
					log.error('getTestData: organization container not found')
					throw Boom.unauthorized()
				}

				return orgContainer
			},
		},
	],
	handler: async (request) => {
		const { accountId } = request.params
		const { name } = request.pre.orgContainer
		return await sandboxAuthServerSrvc.getAccountTransactions(name, accountId)
	},
}

/**
 * POST /organizations/{orgId}/testdata
 */
exports.addPSU = {
	id: 'ob-add-psu',
	description: 'Returns the added PSU data',
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'201': { 'description': 'Created' },
				'400': { 'description': 'Bad Request' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
	},
	auth: {
		strategy: 'appcenterToken',
	},
	validate: {
		params: {
			orgId: Joi.number().integer(),
		},
		payload: Joi.object().keys({
			fullName: Joi.string().required(),
			email: Joi.string().required(),
			avatar: Joi.string().optional(),
			passPhrase: Joi.string().min(12).required(),
			accountTypes: Joi.array().items(
				Joi.object().keys({
					id: Joi.number().required(),
				}).unknown(true)
			).required(),
		}),
	},
	pre: [
		// Validate if organization exists, belongs to the user and is validated
		{
			assign: 'organization',
			method: async (request) => {
				const organization = await organizationSrvc.getUserOrganization(request.auth.artifacts.user.get('id'), request.params.orgId)
					.catch(() => {
						log.error('addTestData: organization not found')
						throw Boom.forbidden()
					})

				const canAccessSandbox = await canOrganizationAccessSandbox(organization)
				if (!canAccessSandbox) {
					throw Boom.forbidden()
				}

				return organization
			},
		},
		{
			assign: 'orgContainer',
			method: async (request) => {
				const orgContainer = await sandboxAuthServerSrvc.getOrgContainer(request.params.orgId)
				if (!orgContainer) {
					log.error('addTestData: organization container not found')
					throw Boom.unauthorized()
				}

				return orgContainer
			},
		},
	],
	handler: async (request) => {
		const { name } = request.pre.orgContainer
		const psuData = request.payload

		// get the full account type information needed for the creationm of the PSU
		psuData.accountTypes = await Promise.all(psuData.accountTypes.map(async (acc) => {
			const accountData = await sandboxAuthServerSrvc.getPsuAccountTypeById(acc.id)
			return accountData.toJSON ? accountData.toJSON() : accountData
		}))

		const result = await sandboxAuthServerSrvc.addPSU(name, psuData)

		/*
		// ACTIVITYLOGUNCOMMENT
		await activityLog.log(
			request.auth.artifacts.user.get('id'),
			[request.params.orgId],
			'TEST_USER_CREATION',
			'sandbox',
			`User ${ request.auth.artifacts.user.get('name') } created test user ${ request.payload.email }.`
		)
		*/

		return result
	},
}

/**
 * GET /testdata/form
 */
exports.getAccountTypes = {
	id: 'ob-get-list-account-types',
	description: 'Returns a list of the account types',
	notes: ['Returns organization PSU account types'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'Ok' },
				'400': { 'description': 'Bad Request' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
	},
	auth: {
		strategy: 'appcenterToken',
	},
	response: {
		status: {
			200: Joi.object().keys({
				form: Joi.object().keys({
					accountTypes: Joi.array().items(
						Joi.object().keys({
							id: Joi.number(),
							type: Joi.string(),
						}),
					),
				}),
			})
				.label('organization-psu-account-types'),
		},
	},
	handler: async () => {
		const accounts = await sandboxAuthServerSrvc.getPsuAccountTypes({}, {
			columns: ['id', 'type'],
		})

		return {
			form: {
				accountTypes: accounts.toJSON(),
			},
		}
	},
}
