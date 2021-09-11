const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  mode: "development",

  // // NOTE: if you wanted to run this app independently on its own port you could uncomment the following and change the start script back to "webpack-cli serve"
  // devServer: {
  //   port: 3001,
  //   static: {
  //     directory: path.join(__dirname, "dist"),
  //   },
  //   devMiddleware: {
  //     writeToDisk: true,
  //   },
  //   proxy: [
  //     {
  //       changeOrigin: true,
  //       context: ['/app2'],
  //       cookieDomainRewrite: 'localhost',
  //       secure: false,
  //       target: 'http://localhost:3002', // NOTE: requests at /app2/ are proxied to localhost:3002
  //       ws: true,
  //     }
  //   ],
  // },

  devtool: 'source-map',
  entry: "./src/index",
  output: {
    publicPath: "/app1/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app1",
      remotes: {
        app2: "app2@/app2/remoteEntry.js", // NOTE: find app2 at /app2/ instead of localhost:3002
      },
      shared: ["react", "react-dom"],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
