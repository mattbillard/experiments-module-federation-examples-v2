const path = require('path');

const webpackConfigMixin = {
  devServer: {
    historyApiFallback: {
      index: '/assets/core-team_site/index.html',
    },
    port: 1002,
  },
  entry: {
    index: './src/index',
  },
  output: {
    path: path.resolve(__dirname, 'dist/assets/core-team_site'),
    publicPath: '/assets/core-team_site/',
  },
};

const modFedPluginConfig = {
  name: 'coreTeam_site',
  remotes: {
    exampleTeam1_app1: 'exampleTeam1_app1@/assets/example-team1_app1/remoteEntry.js',
    exampleTeam1_app2: 'exampleTeam1_app2@/assets/example-team1_app2/remoteEntry.js',
    // More remote components are loaded via DynamicModuleFederationLoader
  },
  shared: ['react', 'react-dom'],
};

module.exports = {
  modFedPluginConfig,
  webpackConfigMixin,
};
