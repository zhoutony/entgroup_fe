var _ = require('lodash');
var serverConfiguration = require('universal-webpack').serverConfiguration;
var webpack = require('webpack');

var settings = require('./universal-webpack-settings');
var baseConfiguration = require('./webpack.config');

var configuration = _.assign({}, baseConfiguration);

var isDevelopment = process.env.NODE_ENV === 'development';

configuration.plugins = configuration.plugins.concat(
  // 环境变量
  new webpack.DefinePlugin({
    __DEVELOPMENT__: isDevelopment,
    __DEVTOOLS__: false,
  })
);

module.exports = serverConfiguration(configuration, settings);
