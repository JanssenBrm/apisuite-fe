const Notification = require('../../models/Notification')
const Boom = require('boom')

exports = module.exports = {}

/**
 * Module responsible for all notification services.
 * @module services/notification
 */

/**
 * Get the latest public notification
 * @async
 * @throws {Error}											- An error if fails
 * @returns {Notification}			- The latest notification
 */
exports.getLatestNotification = async () => {
	return await Notification.forge()
		.where('public', true)
		.orderBy('alert', 'DESC')
		.orderBy('created_at', 'DESC')
		.fetch()
}

/**
 * List notification
 * @async
 * @param {Object} options							- Pagination options
 * @throws {Error}											- An error if fails
 * @returns {Array.<Notification>}			- A collection of Notifications
 */
exports.listAdminNotification = async (options) => {
	return await Notification.fetchPage({
		page: options.page,
		pageSize: options.pageSize,
	})
}

/**
 * Create Notification
 * @async
 * @param {Object} data									- Notification data
 * @throws {Error}											- An error if fails
 * @returns {Notification}							- The created Notification
 */
exports.createNotification = async (data) => {
	data.author = data.author || 'bot'
	data.scheduled_to = data.scheduled
	return await Notification.create(data)
}


/**
 * Update Notification status
 * @async
 * @param {Integer} id							    - Notification id
 * @param {Object} data									- Notification status to update
 * @throws {Error}											- An error if fails
 * @returns {Notification}							- The Notification status updated
 */
exports.updateNotificationStatus = async (id, data) => {
	const notif = await Notification.where({ id }).fetch()
	if (!notif) {
		throw Boom.notFound()
	}

	const updateData = {}, states = data.status
	for (let state of states) {
		updateData[state] = !notif.get(state)
	}

	try {
		await Notification.update({ ...updateData }, { id })
	} catch (e) {
		for (let state of states) {
			updateData[state] = !updateData[state]
		}
	}

	updateData.id = id

	return updateData
}

/**
 * Delete a Notification
 * @async
 * @param {Integer} id									- Notification id
 * @throws {Error}											- An error if fails
 * @returns {Notification}							- A empty model
 */
exports.deleteNotification = async (id) => {
	const notif = await Notification.where({ id }).fetch()

	if (!notif) {
		throw Boom.notFound()
	}
	return await Notification.destroy({ id })
}
