/* eslint-disable */
var path = require('path');
var webpack = ('webpack');

var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var dirs = {
  root: path.resolve(__dirname, '..'),
  context: path.resolve(__dirname, '../src'),
  output: path.resolve(__dirname, '../build/assets'),
};

var isDevelopment = process.env.NODE_ENV === 'development';

var configuration = {
  context: dirs.root,
  entry: {
    app: [
      './src/client/index',
    ],
    vendor: [
      'babel-polyfill',
      'classnames',
      'dots',
      'isomorphic-fetch',
      'jquery',
      'lodash',
      'moment',
      'react',
      'react-dom',
      'react-helmet',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redial',
      'redux',
      'redux-api-middleware',
      'redux-thunk',
      'urlencode',
    ],
  },
  node: {
    __filename: true,
    __dirname: true,
  },
  output: {
    path: dirs.output,
    filename: isDevelopment ? '[name].js' : '[name].[hash].js',
    chunkFilename: isDevelopment ? '[name].js' : '[name].[hash].js',
    publicPath: '/assets/',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel!eslint?quiet=true' },
      { test: /\.json$/, loader: 'json' },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?modules&importLoaders=2&localIdentName=[path][name]-[local]!postcss!less'
        ),
      },
      { test: /\.(jpe?g|png|gif)$/, loader: 'url-loader?limit=1024' },
    ],
  },
  progress: true,
  resolve: {
    extensions: ['', '.json', '.js'],
  },
  plugins: [
    new ExtractTextPlugin(isDevelopment ? 'app.css' : 'app.[hash].css'),
  ],
  postcss: function (){
    return [
      autoprefixer({
        browsers: ['> 1%', 'last 2 versions', 'iOS >= 6', 'Android >= 2.1'],
      }),
    ];
  },
};

module.exports = configuration;
