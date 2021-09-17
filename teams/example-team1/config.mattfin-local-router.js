/**
 * NOTE:
 * Enable each team to work on their code against the latest copy of other teams' code
 *
 * Proxy...
 * - Each team's code is served from localhost
 * - Optionally, other teams' code can also be served from localhost if one needs to work on multiple repos at once
 * - Anything not from localhost will be served from the mock dev environment (See /teams/devops-team/dev-mock)
 * - If dev is down, it would be easy to instead switch local development to proxy from QA
 */

// prettier-ignore
const proxiesHashMap = {
  // This team's code
  '/assets/example-team1__app1/':         'http://localhost:1101',
  '/assets/example-team1__app2/':         'http://localhost:1102',
  '/assets/example-team1__definitions/':  'http://localhost:1103',
  
  // Other team's code if you need to work on multiple repos at once
  // '/assets/core-team__site/':             'http://localhost:1002',
  // '/site-url':                            'http://localhost:1002',

  // Everything else comes from dev environment
  '/':                                    'http://localhost:2000', 
};

const webpackConfigMixin = {
  devServer: {
    port: 1100,
  },
};

module.exports = {
  proxiesHashMap,
  webpackConfigMixin,
};
