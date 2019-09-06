const handlers = require('./handlers')

exports = module.exports = {}

/**
 * hapi plugin with scenarios endpoints.
 * @module plugins/scenario
 */

/**
 * Configuration object for scenarios endpoints
 */
exports.plugin = {
	register: (server) => {
		// Routes
		server.route([
			{
				method: 'GET',
				path: '/admin/scenarios',
				options: handlers.scenarioGetAll,
			},
			{
				method: 'GET',
				path: '/scenarios',
				options: handlers.scenariosFiltered,
			},
			{
				method: 'GET',
				path: '/scenarios/{scenarioId}',
				options: handlers.scenarioGetOne,
			},
			{
				method: 'POST',
				path: '/admin/scenarios',
				options: handlers.scenarioCreate,
			},
			{
				method: 'PUT',
				path: '/admin/scenarios/{scenarioId}',
				options: handlers.scenarioUpdate,
			},
			{
				method: 'DELETE',
				path: '/admin/scenarios/{scenarioId}',
				options: handlers.scenarioDelete,
			},
			{
				method: 'POST',
				path: '/admin/scenarios/{scenarioId}/publish',
				options: handlers.scenarioPublish,
			},
			{
				method: 'POST',
				path: '/admin/scenarios/{scenarioId}/unpublish',
				options: handlers.scenarioUnpublish,
			},
			{
				method: 'GET',
				path: '/endpoints',
				options: handlers.endpointGetAll,
			},
			{
				method: 'GET',
				path: '/apis',
				options: handlers.endpointGetApis,
			},
		])
	},
	name: 'scenario',
}
