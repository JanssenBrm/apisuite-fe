const ExternalResource = require('../../models/ExternalResource')
const GitHubApp = require('../../models/GitHubApp')
const Bookshelf = require('../../utils/bookshelf')

exports = module.exports = {}

/**
 * Module responsible for all the external resources.
 * @module services/externalResources
 */

/**
 * Get the external resources paginated
 * @async
 * @param {Object} options					- Pagination options
 * @returns {ExternalResource[]}		- The External Resources list
 */
exports.listExternalResources = async (options) => {
	const list = await ExternalResource.fetchPage({
		page: options.page,
		pageSize: options.pageSize,
	})

	const app = await getGitHubApp()

	return {
		source_account: app ? app.source_account : 'https://github.com',
		external_resources: list.serialize(),
		pagination: list.pagination,
	}
}

/**
 * Upsert the external resource data
 * @async
 * @param {Object} resource					- The resource to upsert
 * @throws {Error}									- An error if fails
 * @returns {ExternalResource|null}	- The external resource model
 */
exports.upsertExternalResources = async (resource) => {
	const rsrc = await ExternalResource.findOne({
		repo_id: resource.repo_id,
	}, {
		require: false,
	})

	if (!rsrc) {
		return await ExternalResource.create(resource)
	}

	return await ExternalResource.update(resource, {
		id: rsrc.get('id'),
	})
}

/**
 * Delete external resource
 * @async
 * @param {Number} resourceId			- The resource id
 * @throws {Error}								- An error if fails
 * @returns {void}
 */
exports.deleteExternalResource = async (resourceId) => {
	return await ExternalResource.destroy({
		id: resourceId,
		require: false,
	})
}

/**
 * Get the id of the resources that where deleted in github
 * @param {Number[]} ids 					- Array of content that exists
 * @returns {ExternalResource[]}	- Array of deleted content
 */
exports.listDeletedExternalResources = async (ids) => {
	return await ExternalResource.query((qb) => {
		qb.where('repo_id', 'not in', ids)
	}).fetchAll()
}

/**
 * Check if external resources need to sync
 * @returns {Boolean}	- If it needs or not
 */
exports.checkForSync = async () => {
	const res = await Bookshelf.knex.raw('select datediff(now(), (select updated_at FROM `external_resource` limit 1)) as `days`;')
	const days = res[0][0]['days']

	// if we haven't updated for a day or never updated the sync
	return days > 1 || days === null
}

/**
 * Get the GitHub App data
 * @returns {GitHubApp}	- The github app data
 */
const getGitHubApp = async () => {
	let app = await GitHubApp.query((qb) => {
		qb.limit(1)
	}).fetchAll()

	app = app.toJSON()
	if (app.length) return app[0]
	return null
}

exports.getGitHubApp = getGitHubApp
