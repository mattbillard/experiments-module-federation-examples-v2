const _ = require('lodash');
const path = require('path');

module.exports = (appDir, webpackConfigs) => {
  // Defaults
  const proxiesHashMap = webpackConfigs.proxiesHashMap || [];
  const webpackConfigMixin = webpackConfigs.webpackConfigMixin || {};

  // Proxies
  const proxy = Object.entries(proxiesHashMap).map(([key, value]) => {
    return {
      changeOrigin: true,
      context: [key],
      cookieDomainRewrite: 'localhost',
      secure: false,
      target: value,
      ws: true,
    };
  });

  const defaultConfig = {
    devServer: {
      host: '0.0.0.0',
      hot: false,
      liveReload: false,
      proxy,
      static: {
        directory: path.join(appDir, 'dist'),
      },
    },
    entry: './package.json', // We don't want it to actually compile anything so just give it the package.json that ran the script
    mode: 'development',
  };

  // Merge configs
  const mergedConfig = _.merge({}, defaultConfig, webpackConfigMixin);

  return mergedConfig;
};
