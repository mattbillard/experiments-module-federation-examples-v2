const path = require('path');

const webpackConfigMixin = {
  devServer: {
    devMiddleware: {
      writeToDisk: true, // NOTE: need to writeToDisk if we want to consume this package from dist
    },
    port: 1001,
  },
  externals: {
    /**
     * NOTE:
     * When building a React component to dist and then importing it into another package, you need to exclude react and react-dom or you will get errors about having multiple versions of React and violating the rule of hooks
     *
     * Also, does not work if you want to also export code as Module Federation
     */
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM',
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
};

module.exports = {
  webpackConfigMixin,
};
