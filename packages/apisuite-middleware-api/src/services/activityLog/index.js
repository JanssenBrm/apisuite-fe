const ActivityLog = require('../../models/ActivityLog')
const Boom = require('boom')
const moment = require('moment'
)
const logger = require('../../utils/logger')

const activityLogValidation= require('./validation/activityLogSchema')

exports = module.exports = {}

/**
 * Module responsible for all activity log services.
 * @module services/activityLog
 */

/**
 * List Activity logs of a user on an organization
 * @async
 * @param {Number} userId -
 * @param {Number} organizationId -
 * @param {String} category -
 * @param {Object} dates 							- Activity log filter (user, organization and dates)
 * @param {Array}  allowedActions				- List of allowed actions to be retrieved
 * @param {Object} options							- Pagination options
 * @throws {Error}											- An error if fails
 * @returns {Array.<ActivityLog>}				- A collection of activity logs
 */
exports.listUserOrganizationActivityLogs = async (userId, organizationId, category, dates, allowedActions, options) => {

	if (!userId) throw Boom.badData('User Id is required')
	if (!organizationId) throw Boom.badData('Organization Id is required')

	validate(dates)
	dates = formatDates(dates)

	options = options || { page: 0, pageSize: 10}

	const result = await ActivityLog.forge({
		user_id: userId,
		organization_id: organizationId,
	})
		.where('category', '=', category)
		.where('created_at', '>=', dates.from)
		.where('created_at', '<', dates.to)
		.where('action', 'in', allowedActions)
		.fetchPage(options)

	if (result)
		return result.toJSON()
	
	return []
}

/**
 * List Activity logs of an organization
 * @async
 * @param {Number} organizationId -
 * @param {Number} userId -
 * @param {String} category -
 * @param {String}  action - 
 * @param {String} sort -
 * @param {Object} dates 							- Activity log filter (dates)
 * @param {Array}  allowedActions				- List of allowed actions to be retrieved
 * @param {Object} options							- Pagination options
 * @throws {Error}											- An error if fails
 * @returns {Array.<ActivityLog>}				- A collection of activity logs
 */
exports.listOrganizationActivityLogs = async (organizationId, userId, category, action,sort, dates, allowedActions, options) => {

	validate(dates)

	dates = formatDates(dates)

	options = options || { page: 0, pageSize: 10}

	if (!options.withRelated) options.withRelated = ['user', 'organization']

	const query = ActivityLog.forge()

	if (userId) {
		query.where('user_id', '=', userId)
	}

	if (action) {
		query.where('action', '=', action)
	}

	query.where('organization_id', '=', organizationId)
		.where('category', '=', category)
		.where('created_at', '>=', dates.from)
		.where('created_at', '<', dates.to)
		.where('action', 'in', allowedActions)
		.orderBy('created_at', sort)

	const result = await query.fetchPage(options)

	return result
}

/**
 * List Activity logs of a user on the role* organizations
 * @async
 * @param {Number} userId -
 * @param {Array} organizations 			- array of organization ids
 * @param {String} category 					- category
 * @param {Object} dates 							- Activity log filter (organization and dates)
 * @param {Array}  allowedActions				- List of allowed actions to be retrieved
 * @param {Object} options							- Pagination options
 * @throws {Error}											- An error if fails
 * @returns {Array.<ActivityLog>}				- A collection of activity logs
 */
exports.listUserActivityLogs = async (userId, organizations, category, dates, allowedActions, options) => {

	validate(dates)
	dates = formatDates(dates)

	options = options || { page: 0, pageSize: 10}

	const result = await ActivityLog.forge({
		user_id: userId,
	})
		.where('category', '=', category)
		.where('created_at', '>=', dates.from)
		.where('created_at', '<', dates.to)
		.where('action', 'in', allowedActions)
		.where('organization_id', 'in', organizations)
		.fetchPage(options)

	if (result)
		return result.toJSON()
	
	return []
}


/**
 * List Activity logs of a user on the role* organizations
 * @async
 * @param {Array} organizations 			- array of organization ids
 * @param {String} category -
 * @param {Object} dates 							- Activity log filter (organization and dates)
* @param {Array}  allowedActions				- List of allowed actions to be retrieved
 * @param {Object} options							- Pagination options
 * @throws {Error}											- An error if fails
 * @returns {Array.<ActivityLog>}				- A collection of activity logs
 */
exports.listAllActivityLogs = async (organizations, category,dates, allowedActions, options) => {

	validate(dates)
	dates = formatDates(dates)

	options = options || { page: 0, pageSize: 10}

	const result = await ActivityLog.forge()
		.where('category', '=', category)
		.where('created_at', '>=', dates.from)
		.where('created_at', '<', dates.to)
		.where('action', 'in', allowedActions)
		.where('organization_id', 'in', organizations)
		.fetchPage(options)

	if (result)
		return result.toJSON()
	
	return []
}

/**
 * Create Activity log
 * @async
 * @param {Object} entry 							- Activity log entry
 * @throws {Error}										- An error if fails
 * @returns {Void}										-
 */
exports.createActivityLog = async (entry) => {
	
	const validation = activityLogValidation.validate(entry)
	
	if (validation.error) {
		logger.error(validation.error)
		throw Boom.badData(validation.error)
	}

	try {
		await ActivityLog.create(entry)
		return validation
	} catch (error) {
		logger.error(error)
		throw Boom.internal(error)		
	}
}

/**
 * Get Activity log detail
 * @async
 * @param {Number} logId 								- Activity log id
 * @param {Array}  relations						- withRelated array
 * @throws {Error}											- An error if fails
 * @returns {ActivityLog}								- An instance of an Activity Log
 */
exports.getActivityLog = async (logId, relations) => {

	const result = await ActivityLog.forge({
		id: logId,
	})
		.fetch({withRelated: relations})

	if (result)
		return result.toJSON()
	
	return null
}

/**
 * List Activity log KPI on an organization
 * @async
 * @param {Number} organizationId -
 * @param {Boolean} isAdminInOrg 	-
 * @param {Array}  allowedActions				- List of allowed actions to be retrieved
 * @throws {Error}											- An error if fails
 * @returns {Array.<ActivityLog>}				- A collection of activity logs
 */
exports.listOrganizationKPI = async (organizationId, isAdminInOrg, allowedActions) => {

	const lastYear = moment(new Date()).subtract(1, 'year').format('YYYY-MM-DD')
	const lastWeek = moment(new Date()).subtract(7,'days').format('YYYY-MM-DD')
	const now = moment(new Date()).add(1,'days').format('YYYY-MM-DD')

	const appCount = await ActivityLog.where({
		action: 'APP_CREATION',
		organization_id: organizationId,
	})
		.where('created_at', '>=', lastYear)
		.where('created_at', '<', now)
		.count()

	const testUserLoginCount = await ActivityLog.where({
		action: 'TEST_USER_LOGIN',
		organization_id: organizationId,
	})
		.where('created_at', '>=', lastWeek)
		.where('created_at', '<', now)
		.count()

	const portalLoginCount = await ActivityLog.where({
		action: 'USER_LOGIN',
		organization_id: organizationId,
	})
		.where('created_at', '>=', lastWeek)
		.where('created_at', '<', now)
		.count()

	let result = {
		appCount: appCount,
		testUserLoginCount: testUserLoginCount,
		portalLoginCount: portalLoginCount,
	}

	if (isAdminInOrg) return result

	if (allowedActions.indexOf('APP_CREATION') === -1) {
		delete result.appCount
	}
	if (allowedActions.indexOf('TEST_USER_LOGIN') === -1) {
		delete result.testUserLoginCount
	}
	if (allowedActions.indexOf('USER_LOGIN') === -1) {
		delete result.portalLoginCount
	}

	return result
}

/**
 * 
 * @param {Object} filter - Activity log filter (user, organization and dates)
 * @throws {Error} -
 * @returns {Void} -
 */
function validate(filter) {

	if (!filter) throw Boom.badData('A filter needs to be specified when calling this method')
	if (!filter.from) throw Boom.badData('A starting date needs to be specified.')
	if (!filter.to) throw Boom.badData('An ending date needs to be specified.')
	if (filter.from > filter.to) throw Boom.badData('The starting date needs to be earlier or equal to the ending date.')

}

/**
 * @param {Object} dates 								- date object
 * @returns { Object} - 
 */
function formatDates(dates) {

	dates.from = moment(dates.from).format('YYYY-MM-DD')
	dates.to = moment(dates.to).add(1,'days').format('YYYY-MM-DD')
	return dates
}
