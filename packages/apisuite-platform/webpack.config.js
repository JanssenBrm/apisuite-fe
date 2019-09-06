/*
 * Webpack configuration file
 */
const path = require('path')
const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const __PROD__ = process.env.NODE_ENV === 'production'
const devConfig = require('./webpack.config.dev')
const prodConfig = require('./webpack.config.prod')

module.exports = merge.smart({
  entry: path.resolve(__dirname, 'src', 'index.js'),

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  module: {
    exprContextCritical: false,
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => ([autoprefixer({ browsers: ['last 3 versions', '> 1%', 'IE >= 11'] })])
            }
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'extended'
            }
          }
        ]
      },
      {
        test: /\.(png|gif|svg|jpg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/images/[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(pdf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/docs/[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'assets/fonts/[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'raw-loader'
          }
        ]
      }
    ]
  },

  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ]
  },

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}, __PROD__ ? prodConfig : devConfig)
