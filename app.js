/* eslint-disable */

var universalWebpack = require('universal-webpack');
var settings = require('./webpack/universal-webpack-settings');
var configuration = require('./webpack/webpack.config');

universalWebpack.server(configuration, settings);
