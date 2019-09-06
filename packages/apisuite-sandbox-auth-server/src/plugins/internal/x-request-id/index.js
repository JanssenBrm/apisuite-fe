
module.exports = {
	plugin: require('hapi-x-request-id'),
	options: {
		header: 'x-auth-request-id',
	},
	name: 'x-request-id-plugin',
}
