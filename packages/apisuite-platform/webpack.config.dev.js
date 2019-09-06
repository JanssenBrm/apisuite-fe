/*
 * Webpack DEVELOPMENT configuration file
 */

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Dotenv = require('dotenv-webpack')
const API_URL = process.env.API_URL || 'https://api.develop.openbankportal.be'
const RECAPTCHA_KEY = process.env.RECAPTCHA_KEY
const THEME = process.env.THEME
const DEV_PORTAL_CLIENT_ID = process.env.DEV_PORTAL_CLIENT_ID
const DEV_PORTAL_CLIENT_SECRET = process.env.DEV_PORTAL_CLIENT_SECRET

module.exports = {
  mode: 'development',

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
      template: path.resolve(__dirname, 'src', 'themes', String(THEME), 'index.html')
    }),
    new MiniCssExtractPlugin('style.css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new Dotenv()
  ],

  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    publicPath: '/',
    historyApiFallback: {
      disableDotRule: true
    },
    port: 9001,
    host: '0.0.0.0',
    noInfo: false,
    inline: true,
    hot: true,
    stats: {
      modules: false,
      colors: true
    }
  },

  devtool: 'cheap-module-source-map'
}
