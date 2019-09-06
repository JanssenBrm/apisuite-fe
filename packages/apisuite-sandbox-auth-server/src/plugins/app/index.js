const handlers = require('./handlers')

exports = module.exports = {}

exports.plugin = {

	register: (server) => {
		server.route([
			{
				method: 'POST',
				path: '/apps',
				options: handlers.createApp,
			},
			{
				method: 'GET',
				path: '/apps',
				options: handlers.listApps,
			},
			{
				method: 'GET',
				path: '/apps/{appId}',
				options: handlers.getApp,
			},
			{
				method: 'PUT',
				path: '/apps/{appId}',
				options: handlers.updateApp,
			},
			{
				method: 'DELETE',
				path: '/apps/{appId}',
				options: handlers.deleteApp,
			},
		])
	},

	name: 'app',
}
