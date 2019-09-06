/*
 * Webpack PRODUCTION configuration file
 */

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const API_URL = process.env.API_URL || 'https://api.rc0.openbankportal.be'
const RECAPTCHA_KEY = process.env.RECAPTCHA_KEY
const THEME = process.env.THEME
const DEV_PORTAL_CLIENT_ID = process.env.DEV_PORTAL_CLIENT_ID
const DEV_PORTAL_CLIENT_SECRET = process.env.DEV_PORTAL_CLIENT_SECRET

module.exports = {
  mode: 'production',

  output: { filename: '[name]-[hash].js' },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        API_URL: JSON.stringify(API_URL),
        RECAPTCHA_KEY: JSON.stringify(RECAPTCHA_KEY),
        THEME: JSON.stringify(THEME),
        DEV_PORTAL_CLIENT_ID: JSON.stringify(DEV_PORTAL_CLIENT_ID),
        DEV_PORTAL_CLIENT_SECRET: JSON.stringify(DEV_PORTAL_CLIENT_SECRET)
      }
    }),
    new HtmlWebpackPlugin({
      favicon: path.resolve(__dirname, 'src', 'themes', String(THEME), 'favicon.ico'),
      template: path.resolve(__dirname, 'src', 'themes', String(THEME), 'index.html'),
      minify: {
        collapseWhitespace: true
      }
    }),
    new MiniCssExtractPlugin({ filename: '[name]-[hash].css' }),
    new MinifyPlugin({
      regexpConstructors: false,
      mangle: false
    }),
    new CopyWebpackPlugin([
      {from: 'src/assets/docs', to: 'assets/docs'},
      {from: 'src/assets/jsons', to: 'assets/jsons'}
    ]),
    new webpack.HashedModuleIdsPlugin()
  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ]
  }
}
