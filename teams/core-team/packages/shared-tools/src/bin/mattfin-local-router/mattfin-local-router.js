#!/usr/bin/env node

const path = require('path');
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server/lib/Server');

// Paths
const cwd = process.cwd();
const mattfinConfigsPath = path.join(cwd, 'config.mattfin-local-router');
const webpackConfigPath = path.join(__dirname, 'webpack.config.mattfin-local-router');

// Get configs
const mattfinConfigs = require(mattfinConfigsPath);
const getWebpackConfig = require(webpackConfigPath);
const webpackConfig = getWebpackConfig(cwd, mattfinConfigs);
const compiler = Webpack(webpackConfig);

// Start WebpackDevServer
const server = new WebpackDevServer(webpackConfig.devServer, compiler);

server.startCallback(() => {
  const port = webpackConfig.devServer.port || 8080;
  const protocol = webpackConfig.devServer.secure ? 'https' : 'http';
  const pathname = webpackConfig.output.publicPath || '';

  console.log(`\n\n\nStarting server on \n${protocol}://localhost:${port}${pathname}\n\n\n`);
});
