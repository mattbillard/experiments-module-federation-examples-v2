const path = require('path');

const webpackConfigMixin = {
  devServer: {
    port: 1103,
  },
  entry: {
    index: './src/index',
  },
  output: {
    path: path.resolve(__dirname, 'dist/assets/example-team1_definitions'),
    publicPath: '/assets/example-team1_definitions/',
  },
};

const modFedPluginConfig = {};

module.exports = {
  modFedPluginConfig,
  webpackConfigMixin,
};
