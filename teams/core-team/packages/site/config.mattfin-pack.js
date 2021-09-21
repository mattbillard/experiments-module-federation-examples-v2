const path = require('path');

const webpackConfigMixin = {
  devServer: {
    historyApiFallback: {
      index: '/assets/core-team__site/index.html',
    },
    port: 1002,
  },
  entry: {
    index: './src/index',
  },
  output: {
    path: path.resolve(__dirname, 'dist/assets/core-team__site'),
    publicPath: '/assets/core-team__site/',
  },
};

const modFedPluginConfig = {
  name: 'coreTeam__site',
  remotes: {
    exampleTeam1__app1: 'exampleTeam1__app1@/assets/example-team1__app1/remoteEntry.js',
    exampleTeam1__app2: 'exampleTeam1__app2@/assets/example-team1__app2/remoteEntry.js',
    // More remote components are loaded via DynamicModuleFederationLoader
  },
  shared: ['react', 'react-dom'],
};

module.exports = {
  modFedPluginConfig,
  webpackConfigMixin,
};
