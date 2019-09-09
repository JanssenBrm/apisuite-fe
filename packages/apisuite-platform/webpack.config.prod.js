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

const THEME = process.env.THEME

/*
 * Webpack PRODUCTION configuration file
 */

module.exports = {
  mode: 'production',

  output: {
    filename: '[name]-[contenthash].js',
    chunkFilename: '[name]-[contenthash].js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      favicon: path.resolve(__dirname, 'src', 'themes', String(THEME), 'favicon.ico'),
      template: path.resolve(__dirname, 'src', 'themes', String(THEME), 'index.html'),
      minify: {
        collapseWhitespace: true,
      },
    }),
    new MiniCssExtractPlugin({ filename: '[name]-[contenthash].css' }),
    new MinifyPlugin({
      regexpConstructors: false,
      mangle: false,
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets/docs', to: 'assets/docs' },
      { from: 'src/assets/jsons', to: 'assets/jsons' },
    ]),
    new webpack.HashedModuleIdsPlugin(),
  ],

  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
}
