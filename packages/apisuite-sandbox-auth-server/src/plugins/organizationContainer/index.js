const handlers = require('./handlers')

exports = module.exports = {}

exports.plugin = {

	register: (server) => {
		server.route([
			{
				method: 'POST',
				path: '/organization_containers',
				options: handlers.createOrgContainer,
			},
			{
				method: 'GET',
				path: '/organization_containers',
				options: handlers.getOrgContainer,
			},
		])
	},

	name: 'organization_container',
}
