const handlers = require('./handlers')

exports = module.exports = {}

/**
 * hapi plugin with accounts endpoints. Can be used for load balancing purposes.
 * @module plugins/accounts
 */

/** Configuration object for accounts endpoints */
exports.plugin = {
	register: (server) => {
		server.ext('onPreResponse', function (request, reply) {
			let response = request.response

			if (response.isBoom) {
				const error = {
					timestamp: new Date(),
					status: response.data && response.data.statusCode ? response.data.statusCode : response.output.payload.statusCode,
					error: response.data && response.data.error ? response.data.error : response.output.payload.error,
					message: response.data && response.data.message ? response.data.message : response.output.payload.message,
					path: response.data && response.data.path ? response.data.path : request.path,
				}
				return error
			}

			if (response.source && response.source.status) {
				response.statusCode = response.source.status
			}
			return reply.continue
		})
		server.route([
			{
				method: 'GET',
				path: '/v1/accounts',
				options: handlers.getAccounts,
			},
			{
				method: 'GET',
				path: '/v1/accounts/{accountResourceId}/balances',
				options: handlers.getAccountBalances,
			},
			{
				method: 'GET',
				path: '/v1/accounts/{accountResourceId}/transactions',
				options: handlers.getAccountTransactions,
			},
		])
	},
	name: 'sandbox-accounts',
}
