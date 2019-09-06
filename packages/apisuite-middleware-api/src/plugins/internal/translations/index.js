/**
 * Plugin to serve translations
 * @module plugins/internal/translations
 */

/** Configuration object for translations endpoints */
exports.plugin = {
	register: (server) => {
		server.route([
			{
				method: 'GET',
				path: '/translations/{file*}',
				options: {
					handler: {
						directory: {
							path: 'src/translations',
						},
					},
				},
			},
		])
	},
	name: 'translations',
}
