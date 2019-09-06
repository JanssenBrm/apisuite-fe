const handlers = require('./handlers')

exports = module.exports = {}

/**
 * hapi plugin with API product endpoints.
 * @module plugins/product
 */

/**
 * Configuration object
 */
exports.plugin = {

	register: (server) => {

		// Routes
		server.route([
			{
				method: 'POST',
				path: '/admin/products',
				options: handlers.createProduct,
			},
			{
				method: 'POST',
				path: '/admin/products/{productId}/quarantine',
				options: handlers.quarantineProduct,
			},
			{
				method: 'PUT',
				path: '/admin/products/{productId}',
				options: handlers.updateProduct,
			},
			{
				method: 'DELETE',
				path: '/admin/products/{productId}',
				options: handlers.deleteProduct,
			},
			{
				method: 'GET',
				path: '/admin/products',
				options: handlers.listAdminProducts,
			},
			{
				method: 'GET',
				path: '/admin/products/{productId}',
				options: handlers.getAdminProduct,
			},
			{
				method: 'PUT',
				path: '/admin/products/{productId}/apidocs/{apidocsId}',
				options: handlers.updateAPIState,
			},
			{
				method: 'DELETE',
				path: '/admin/products/{productId}/apidocs/{apidocsId}',
				options: handlers.deleteAPI,
			},
			{
				method: 'GET',
				path: '/products',
				options: handlers.listProducts,
			},
			{
				method: 'GET',
				path: '/products/{productId}',
				options: handlers.getProduct,
			},
		])
	},
	name: 'api-products',
}
