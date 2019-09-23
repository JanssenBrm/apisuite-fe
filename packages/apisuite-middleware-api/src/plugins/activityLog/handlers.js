const Joi = require('joi')
const activityLogSrvc = require('../../services/activityLog')
const userSrvc = require('../../services/user')
exports = module.exports = {}

/**
 * @memberof module:plugins/activityLog
 */

/**
 * GET /activityLogs
 */
exports.list = {
	id: 'apisuite-activity-logs',
	description: 'Returns a list of activity log',
	notes: ['Returns activity logs'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'Ok' },
				'400': { 'description': 'Bad Request' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
		'apisuite-rbac': {
			roles: ['TESTER'],
			mode: 'hierarchical', // makes it that every user with any role with higher or equal previlege than TESTER is allowed
		},
	},
	validate: {
		query: {
			page: Joi.number().integer()
				.min(1)
				.default(1),
			pageSize: Joi.number().integer()
				.positive()
				.default(20),
			category: Joi.string().required(),
			from: Joi.date().required(),
			to: Joi.date().required(),
			action: Joi.string().optional(),
		},
	},
	auth: {
		strategy: 'appcenterToken',
	},
	handler: async (request, h) => {

		const { pageSize, page, category, from, to } = request.query
		const user = request.auth.artifacts.user
		const { organizationId } = request.params
		const { action, sort } = request.query
		const userRoles = request.auth.credentials.roles

		const isAdminInOrg = userRoles.some((elem) => {
			if (elem.organizationId === organizationId && elem.role.toLowerCase() === 'admin')
				return true
		})

		const dates = {
			from,
			to,
		}
		const allowedActions = await userSrvc.getActionsAvailableForUserRoles(user.get('id'), organizationId)

		const options = {
			pageSize,
			page,
		}

		/**
		 * If the user is an Admin, he can see everyone's activity logs.
		 * Everyone else can only see their own activity, this is why a userId is passed in.
		 */
		const userId = !isAdminInOrg ? user.get('id') : null

		const result = await activityLogSrvc
			.listOrganizationActivityLogs(organizationId, userId, category, action, sort || 'DESC', dates, allowedActions || [], options)

		const retval = {
			pagination: result.pagination,
			records: result.toJSON(),
		}

		return h.response(retval).code(200)
	},
}

/**
 * GET /activity/{organizationId}/kpi
 */
exports.listKPI = {
	id: 'apisuite-activity-logs-kpi',
	description: 'Returns a list of activity log KPI',
	notes: ['Returns activity logs KPI'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'Ok' },
				'400': { 'description': 'Bad Request' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
		'apisuite-rbac': {
			roles: ['TESTER'],
			mode: 'hierarchical', // makes it that every user with any role with higher or equal previlege than TESTER is allowed
		},
	},
	auth: {
		strategy: 'appcenterToken',
	},
	handler: async (request, h) => {
		const user = request.auth.artifacts.user
		const organizationId = request.params.organizationId
		const userRoles = request.auth.credentials.roles

		const isAdminInOrg = userRoles.some((elem) => {
			if (elem.organizationId === organizationId && elem.role.toLowerCase() === 'admin')
				return true
		})

		const allowedActions = await userSrvc.getActionsAvailableForUserRoles(user.get('id'), organizationId)

		const result = await activityLogSrvc
			.listOrganizationKPI(organizationId, isAdminInOrg, allowedActions || [])

		return h.response(result).code(200)
	},
}
