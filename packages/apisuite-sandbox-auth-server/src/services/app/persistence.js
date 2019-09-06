const App = require('../../models/App')
const AppRedirectUrl = require('../../models/AppRedirectUrl')
const boom = require('boom')
exports = module.exports = {}

exports.findClientByCredentials = async (clientId, clientSecret) => {
	try {
		const app = new App({client_id: clientId,client_secret: clientSecret})
		const result = await app.fetch({withRelated: ['scopes', 'scopes.scope']})
		if (!result) throw boom.unauthorized()
		return result.toJSON()		
	} catch (error) {
		throw error
	}
}

exports.findClientById = async (clientId) => {
	try {
		const app = new App({client_id: clientId})
		const result = await app.fetch()
		if (!result) throw boom.unauthorized()
		return result.toJSON()		
	} catch (error) {
		throw error
	}
}

exports.findAppContainerByClientId = async (clientId) => {
	const query = new App({ client_id : clientId })
	const app = await query.fetch({withRelated: 'container'})
	const result = app.related('container')

	return result.toJSON()
}

exports.findRedirectUrl = async (clientId, redirectUrl) => {

	const appQuery = new App({client_id: clientId})

	const app = await appQuery.fetch()

	if (!app) throw boom.unauthorized()

	const appObj = app.toJSON()

	const appRedirectUrl = new AppRedirectUrl({app_id: appObj.id, url: redirectUrl})

	const result = await appRedirectUrl.fetch()

	if (!result) throw boom.unauthorized()

	return result.toJSON()
}
