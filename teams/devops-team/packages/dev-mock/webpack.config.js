const path = require('path');

/**
 * NOTE:
 * We are using http://localhost:2000 as a mock dev environment
 *
 * If you wanted make the URL slightly more realistic and use http://dev.localhost:2000, make the following changes
 *
 * Set this below
 *   `host: 'dev.localhost'`
 *
 * Also, run
 *   `sudo nano /etc/hosts`
 * and add
 *   `127.0.0.1 dev.localhost`
 */

module.exports = (env = {}) => {
  return {
    mode: 'development',
    devServer: {
      port: 2000,
      host: '0.0.0.0',
      hot: false,
      historyApiFallback: {
        index: '/assets/core-team__site/index.html',
      },
      liveReload: false,
      static: {
        directory: path.join(__dirname, 'dist'),
      },
    },
  };
};
