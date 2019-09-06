const pug = require('pug')
const path = require('path')

const handlers = require('./handlers')
const authStrategies = require('./authStrategies')

const config = require('../../../config')

exports = module.exports = {}


exports.plugin = {
	register: (server) => {

		// Bearer strategy
		server.auth.strategy('authServerToken', 'bearer-access-token', authStrategies.bearerToken)

		server.route([
			{
				method: 'GET',
				path: '/login',
				options: handlers.login,
			},
			{
				method: 'POST',
				path: '/authenticate',
				options: handlers.authenticate,
			},
			{
				method: 'GET',
				path: '/authorize',
				options: handlers.authorizeView,
			},
			{
				method: 'POST',
				path: '/authorize',
				options: handlers.authorize,
			},
			{
				method: 'POST',
				path: '/token',
				options: handlers.token,
			},
			{
				method: 'POST',
				path: '/revoke',
				options: handlers.revokeToken,
			},
			{
				method: 'POST',
				path: '/introspect',
				options: handlers.introspect,
			},
			{
				method: 'POST',
				path: '/internal',
				options: handlers.internal,
			},
			{
				method: 'GET',
				path: '/assets/fonts/{filename}',
				handler: function (request, h) {
					let filepath = path.join(__dirname, '../../assets/fonts/font.ttf')
					if (config.get('branded')) {
						filepath = path.join(path.join(__dirname, '../../assets/fonts/'), request.params.filename)
					} else {
						if (request.params.filename.indexOf('bnpp') > -1) {
							return h.response().code(404)
						}
						filepath = path.join(path.join(__dirname, '../../assets/fonts/'), request.params.filename)
					}
					return h.file(filepath)
				},
			},
			{
				method: 'GET',
				path: '/assets/images/{filename}',
				handler: function (request, h) {
					let filepath = path.join(__dirname, '../../assets/images/logo.svg')
					if (config.get('branded')) {
						filepath = path.join(path.join(__dirname, '../../assets/images/'), request.params.filename)
					} else {
						let found = ['bnppf', 'fintro', 'hellobank'].some((elem) => {
							return request.params.filename.indexOf(elem) > -1
						})
						if (found) {
							return h.response().code(404)
						}
						filepath = path.join(path.join(__dirname, '../../assets/images/'), request.params.filename)
					}
					return h.file(filepath)
				},
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
	name: 'sandbox-oauth2',
}
