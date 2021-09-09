const path = require("path");

module.exports = (env = {}) => {
  return {
    mode: "development",
    devServer: {
      port: 3000,
      host: '0.0.0.0',
      historyApiFallback: {
        index: '/app1/index.html'
      },
      static: {
        directory: path.join(__dirname, "dist"),
      },
    },
  };
};
