const handlers = require('./handlers')

exports = module.exports = {}

exports.plugin = {
	register: (server) => {
		server.route([
			{
				method: 'POST',
				path: '/auth/psu',
				options: handlers.validatePsu,
			},
			{
				method: 'POST',
				path: '/admin/psus',
				options: handlers.addPSU,
			},
			{
				method: 'GET',
				path: '/admin/psus',
				options: handlers.getPSUs,
			},
			{
				method: 'GET',
				path: '/admin/psus/{psuId}',
				options: handlers.getPSUDetails,
			},
			{
				method: 'PUT',
				path: '/admin/psus/{psuId}',
				options: handlers.updatePSU,
			},
			{
				method: 'GET',
				path: '/admin/psus/accounts',
				options: handlers.getPSUAccounts,
			},
			{
				method: 'GET',
				path: '/admin/accounts/{accountId}/transactions',
				options: handlers.getAccountTransactions,
			},
		])
	},
	name: 'sandbox-psus',
}
