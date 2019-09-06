const pug = require('pug')

const handlers = require('./handlers')

exports = module.exports = {}


exports.plugin = {
	register: (server) => {
		server.route([
			{
				method: 'GET',
				path: '/payment-requests',
				options: handlers.home,
			},
			{
				method: 'GET',
				path: '/payment-requests/{id}/consent',
				options: handlers.consentGET,
			},
			{
				method: 'POST',
				path: '/payment-requests/{id}/account-selection',
				options: handlers.accountSelection,
			},
			{
				method: 'POST',
				path: '/payment-requests/{id}/consent',
				options: handlers.consentPOST,
			},
			{
				method: 'POST',
				path: '/payment-requests/{id}/cancel',
				options: handlers.cancelPOST,
			},
		])
		server.views({
			engines: {pug: pug},
			path: __dirname + '/views',
			compileOptions: {
				pretty: true,
			},
		})
	},
	name: 'sandbox-payment-requests',
}
