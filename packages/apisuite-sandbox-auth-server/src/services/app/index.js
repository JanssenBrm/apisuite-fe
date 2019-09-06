const bookshelf = require('../../utils/bookshelf')
const clientTokens = require('./clientTokens')
const persistence = require('./persistence')
const Boom = require('boom')
const logger = require('../../utils/logger')
// Models
const App = require('../../models/App')
const AppRedirectUrl = require('../../models/AppRedirectUrl')
const Scope = require('../../models/Scope')
const AppScope = require('../../models/AppScope')

exports = module.exports = {}

/**
 * Creates an app bound to a user and organization
 * @async
 * @param		{Object}		appData						- App data
 * @param		{Array}			redirectUrls			- Redirect urls
 * @param		{Array}			products			- Products scope and brand
 * @throws	{Error}												- Error if database query fails
 * @returns	{App}													- Returns the created app with the emails attached
 */
exports.create = async (appData, redirectUrls = [], products = []) => {

	// Generate app credenctials
	appData.client_id = clientTokens.generateClientId()
	appData.client_secret = clientTokens.generateClientSecret()

	// Create scopes if not exist
	const scopesToSave = products.map(p => p.scope)

	for (const scope of scopesToSave) {
		const scopeExist = await Scope.findOne({ name: scope }, { require: false })
		if (!scopeExist) {
			await Scope.create({ name: scope })
		}
	}

	// Fetch scopes
	const scopes = await Scope.forge().where('name', '<>', ['internal']).fetchAll()
	const scopesObj = scopes.toJSON()

	return await bookshelf.transaction(async (trx) => {

		// Create app
		const app = await App.create(appData, { transacting: trx })

		// Create the urls
		const createdRedirectUrls = await Promise.all(redirectUrls.map((url) => {
			return AppRedirectUrl.create({
				url: url,
				app_id: app.get('id'),
			}, { transacting: trx })
		}))

		// Add redirect urls
		app.related('redirectUrls').add(createdRedirectUrls, { transacting: trx })

		// Associate scopes
		for (const p of products) {
			const scope = scopesObj.find(scope => scope.name == p.scope)

			await AppScope.create({
				app_id: app.get('id'),
				scope_id: scope.id,
				brand: p.brand,
			}, { transacting: trx })
		}

		const res = await App.findOne({ id: app.get('id') }, { withRelated: ['redirectUrls', 'container', 'scopes.scope'], transacting: trx })

		return {
			...res.toJSON(),
			scopes: res.toJSON().scopes.toJSON(),
		}
	})
}

/**
 * Retrieves a paginated list of organization apps
 * @async
 * @param		{Object}	query							- Query options
 * @param		{Object}	options						- Pagination options
 * @throws	{Error}											- Error if database query fails
 * @returns	{App[]}											- Returns the user list of apps with the emails attached
 */
exports.listApps = async (query, options) => {
	return await App
		.where(query)
		.orderBy('created_at', 'DESC')
		.fetchPage({
			limit: options.limit || 20,
			offset: options.offset || 0,
			withRelated: ['redirectUrls', 'container', 'scopes.scope'],
		})
}

/**
 * Updates an app
 * @async
 * @param		{String}		appObj						- App name, unique in user's apps
 * @param		{String[]}	redirectURLs			- App redirect URLs
 * @param		{Array}			products					- App products scope and brand
 * @param		{Number}		appId							- App ID
 * @throws	{Error}												- An error if database query fails
 * @returns	{App}													- The updated App model
 */
exports.update = async (appObj, redirectURLs = [], products = [], appId) => {
	return await bookshelf.transaction(async (trx) => {

		// Update app data
		const updatedApp = await App.update(appObj, { id: appId }, { transacting: trx })

		// only update the redirect url if we have some
		if (redirectURLs.length > 0) {
			// Delete all old redirectUrls
			await AppRedirectUrl.deleteAllByAppId(appId, { transacting: trx, require: false })

			// Map all the new urls promises and create them
			const newRedirectUrls = await Promise.all(redirectURLs.map((url) => {
				return AppRedirectUrl.create({
					url: url,
					app_id: appId,
				}, { transacting: trx })
			}))

			// Attach them to user model and return
			updatedApp.related('redirectUrls').add(newRedirectUrls)
		}

		// only update the products if we have some
		if (products.length > 0) {
			// Delete all old scopes and attach new if there's scopes to update
			await App.deleteScopes(appId, { transacting: trx, require: false })

			for (const p of products) {
				const existedScope = await Scope.findOne({ name: p.scope }, { transacting: trx, require: false })

				await AppScope.create({
					app_id: appId,
					scope_id: existedScope.id,
					brand: p.brand,
				}, { transacting: trx })
			}
		}

		const res = await App.findOne({ id: appId }, { withRelated: ['redirectUrls', 'container', 'scopes.scope'], transacting: trx })

		return {
			...updatedApp.toJSON(),
			scopes: res.toJSON().scopes.toJSON(),
		}
	})
}

/**
 * Retrieves an app
 * @async
 * @param		{Number}		appId					- App id
 * @throws	{Error}										- Error if database query fails
 * @returns	{App}											- Returns the user app
 */
exports.getApp = async (appId) => {
	return await App
		.findOne({ id: appId }, {
			withRelated: ['redirectUrls', 'container', 'scopes.scope'],
			require: false,
		})
}
/**
 * Retrieves an app
 * @async
 * @param		{String}		clientId					- Client id
 * @throws	{Error}										- Error if database query fails
 * @returns	{App}											- Returns the user app
 */
exports.getAppByClientId = async (clientId) => {
	const app = await App
		.findOne({ client_id: clientId })

	return app.toJSON()
}

/**
 * Deletes an app
 * @async
 * @param		{Number}		appId		- App ID
 * @throws	{Error}							- An error if database query fails
 * @returns	{Void}							-
 */
exports.deleteApp = async (appId) => {
	return await App.destroy({ id: appId })
}

exports.findClientByCredentials = async (client_id, client_secret) => {
	try {
		const result = await persistence.findClientByCredentials(client_id, client_secret)
		return result
	} catch (error) {
		throw error
	}
}

exports.findClientById = async (client_id) => {
	try {
		const result = await persistence.findClientById(client_id)
		return result
	} catch (error) {
		throw error
	}
}

exports.findRedirectUrl = async (client_id, redirect_url) => {
	return await persistence.findRedirectUrl(client_id, redirect_url)
}

exports.findAppContainerByClientId = async (clientId) => {
	try {
		const result = await persistence.findAppContainerByClientId(clientId)
		return result
	} catch (error) {
		return
	}
}

exports.getAppScopes = async (clientId) => {

	const app = await App.findOne({ client_id: clientId}, {
		withRelated: ['scopes', 'scopes.scope'],
		require: false,
	})

	if (!app) {
		logger.error(`Client ${clientId} not found`)
		Boom.badRequest(`Client ${clientId} not found`)
	}

	try {
		const appScopes = app.related('scopes').toJSON()
		return appScopes
	} catch (error) {
		logger.error(error)
		throw Boom.internal(error)
	}
}


/**
 * The database app object
 * @typedef		{Object}		database_app
 * @property	{Number}		id						- App ID
 * @property	{String}		name					- App name
 * @property	{String}		description		- App description
 * @property	{Number}		user_id				- ID of the user that created the app
 * @property	{String[]}	public_url		-	array of apps public URLs
 * @property	{String[]}	redirect_url	-	array of apps redirect URLs
 * @property	{date}			create_at			- Date of apps creation
 * @property	{date}			updated_at		- Date in which the app was last updated
 */

/**
* The REST app object when requested by the /me endpoint
* @typedef	{Object}		rest_app_user
* @property	{Number}		id						- App ID
* @property	{String}		name					- App name
* @property	{String}		description		- App description
* @property	{String[]}	publicURLs		-	array of apps public URLs
* @property	{String[]}	redirectURLs	-	array of apps redirect URLs
* @property	{string}		create				- Date of apps creation
* @property	{string}		updated				- Date in which the app was last updated
*/
