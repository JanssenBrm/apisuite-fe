const path = require('path')
const webpack = require('webpack')
const config = require('./config')
const OBSANDBOXAUTH_BRANDED = config.get('branded')

module.exports = {
	context: __dirname + '/src',
	entry: {
		authentication: './plugins/oauth/views/authentication/index.js', //['./plugins/oauth/views/index.js', './views/shared/header/index.js']
		authorization: './plugins/oauth/views/authorization/index.js', //['./plugins/oauth/views/index.js', './views/shared/header/index.js']
		payment: './plugins/oauth/views/payment/index.js', //['./plugins/oauth/views/index.js', './views/shared/header/index.js']
		accounts: './plugins/oauth/views/accounts/index.js', //['./plugins/oauth/views/index.js', './views/shared/header/index.js']
	},
	output: {
		path: __dirname + '/dist/js',
		filename: '[name].js',
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				OBSANDBOXAUTH_BRANDED: JSON.stringify(OBSANDBOXAUTH_BRANDED),
			},
		}),
	],
	resolve: {
		extensions: ['*', '.js', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.js(x?)$/,
				include: path.join(__dirname, 'src'),
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(woff|woff2|eot|ttf)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							name: 'assets/fonts/[name].[ext]',
						},
					},
				],  
			},
			{
				test: /\.(png|gif|svg|jpg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'assets/images/[hash].[ext]',
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ],
			},
		],
	},
	watch: false,
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 9010,
	},
}
