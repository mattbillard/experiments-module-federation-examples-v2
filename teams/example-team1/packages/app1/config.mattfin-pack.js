const path = require('path');

const webpackConfigMixin = {
  devServer: {
    port: 1101,
  },
  entry: {
    index: './src/index',
  },
  output: {
    path: path.resolve(__dirname, 'dist/assets/example-team1_app1'),
    publicPath: '/assets/example-team1_app1/',
  },
};

const modFedPluginConfig = {
  name: 'exampleTeam1_app1',
  filename: 'remoteEntry.js',
  exposes: {
    './app': './src/components/app/app',
    './button': './src/components/button/button',
  },
  shared: ['react', 'react-dom'],
};

module.exports = {
  modFedPluginConfig,
  webpackConfigMixin,
};
