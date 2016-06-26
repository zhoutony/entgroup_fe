var _ = require('lodash');
var webpack = require('webpack');
var clientConfiguration = require('universal-webpack').clientConfiguration;

var settings = require('./universal-webpack-settings');
var baseConfiguration = require('./webpack.config');

var configuration = _.assign({}, baseConfiguration);

var isDevelopment = process.env.NODE_ENV === 'development';

configuration.plugins = configuration.plugins.concat(
  // 环境变量
  new webpack.DefinePlugin({
    __DEVELOPMENT__: isDevelopment,
    __DEVTOOLS__: isDevelopment,
  }),

  // 公共文件
  new webpack.optimize.CommonsChunkPlugin(
    'vendor',
    isDevelopment? 'vendor.js' : 'vendor.[hash].js',
    Infinity
  )
);

// 开发模式
if (isDevelopment) {
  configuration.devtool = 'source-map';
}

// 线上模式，进行压缩混淆处理
if (!isDevelopment) {
  configuration.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      unused: true,
      dead_code: true,
      warnings: false,
      screw_ie8: true,
    },
  }));
}

module.exports = clientConfiguration(configuration, settings);
