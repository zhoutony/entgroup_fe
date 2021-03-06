/* eslint-disable */
var path = require('path');
var webpack = require('webpack');

var isDevelopment = process.env.NODE_ENV === 'development';

var configuration = {
  entry: {
    'home/home': './public/home/home.js',
    'book/book': './public/book/book.js',
    'active/reset': './public/active/reset.js',
    'user/user': './public/user/user.js',
    'pay/payment': './public/pay/payment.js',
    'pay/paywx': './public/pay/paywx.js',
    'plan/index': './public/plan/index.js',
    'Member/Member': './public/Member/Member.js',
    'selectCinema/selectCinema': './public/selectCinema/selectCinema.js',
    'Video_details/film_details': './public/Video_details/film_details.js',
  },
  node: {
    __filename: true,
    __dirname: true,
  },
  output: {
    path: './build',
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.json$/, loader: 'json' },
    ],
  },
  progress: true,
  resolve: {
    extensions: ['', '.js'],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'base', filename: 'base/base.js' }),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: isDevelopment,
    })
  ],
};

if (!isDevelopment) {
  configuration.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
}

module.exports = configuration;
