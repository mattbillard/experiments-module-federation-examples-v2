/**
 * NOTE: see /teams/example-team1/config.mattfin-local-router.js for notes
 */

// prettier-ignore
const proxiesHashMap = {
  '/assets/core-team_site/':  'http://localhost:1002',
  '/site-url':                'http://localhost:1002',
  '/':                        'http://localhost:2000',
};

const webpackConfigMixin = {
  devServer: {
    port: 1000,
  },
};

module.exports = {
  proxiesHashMap,
  webpackConfigMixin,
};
