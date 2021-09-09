const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  mode: "development",

  // // NOTE: if you wanted to run this app independently on its own port you could uncomment the following and change the start script back to "webpack-cli serve"
  // devServer: {
  //   port: 3002,
  //   static: {
  //     directory: path.join(__dirname, "dist"),
  //   },
  //   devMiddleware: {
  //     writeToDisk: true,
  //   },
  // },

  entry: "./src/index",
  output: {
    publicPath: "/app2/",
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
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react", "@babel/preset-typescript"],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app2",
      filename: "remoteEntry.js",
      exposes: {
        "./button": "./src/components/button/button",
      },
      shared: ["react", "react-dom"],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
