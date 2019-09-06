const handlers = require('./handlers')

exports = module.exports =  {}

exports.plugin = {
	register: (server) => {
		server.route([
			{
				method: 'POST',
				path:'/accreditation',
				options: handlers.createAccreditation,
			},
		])
	},
	name: 'sandbox-accreditations',
}
