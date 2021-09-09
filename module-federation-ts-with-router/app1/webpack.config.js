const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  mode: "development",
  devServer: {
    port: 3001,
    static: {
      directory: path.join(__dirname, "dist"),
    },
    devMiddleware: {
      writeToDisk: true,
    },
    proxy: [
      {
        changeOrigin: true,
        context: ['/app2'],
        cookieDomainRewrite: 'localhost',
        secure: false,
        target: 'http://localhost:3002',
        ws: true,
      }
    ],
  },
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
      name: "app1",
      remotes: {
        app2: "app2@/app2/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
