'use strict';
const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

//add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
});

const pages = Object.keys(utils.getEntry(path.resolve(__dirname, '../src/view/**/*.html')));
pages.forEach( basename => {
  // https://github.com/ampedandwired/html-webpack-plugin
  const conf = {
    filename: `${basename}/index.html`, //生成的html存放路径，相对于path
    template: path.resolve(__dirname, `../src/view/${basename}/index.html`), //html模板路径
    inject: true,
    chunks: [basename]
  };
  baseWebpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
});

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ]
});
