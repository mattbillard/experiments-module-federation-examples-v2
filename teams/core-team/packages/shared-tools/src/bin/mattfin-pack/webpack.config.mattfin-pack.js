const _ = require('lodash');
const fs = require('fs');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = (appDir, mode = 'development', webpackConfigs) => {
  // Defaults
  const modFedPluginConfig = webpackConfigs.modFedPluginConfig || undefined;
  const webpackConfigMixin = webpackConfigs.webpackConfigMixin || {};

  // prettier-ignore
  const defaultConfig = {
    devServer: {
      hot: false,
      liveReload: false,
      static: {
        directory: path.join(__dirname, 'dist'),
      },
    },
    devtool: 'source-map',
    entry: './src/index',
    mode,
    module: {
      rules: [
        // Images, fonts, etc
        {
          test: /\.(gif|jpeg|jpg|png|svg|eot|otf|ttf|woff|woff2)$/i,
          type: 'asset/resource',
        },

        // Traditional/untyped CSS
        {
          test: /\.(css|scss)$/,
          exclude: /\.module\.(css|scss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ],
        },
        
        // Typed CSS
        {
          test: /\.(css|scss)$/,
          include: /\.module\.(css|scss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'dts-css-modules-loader',                       // Create types for CSS 
              options: { namedExport: true },                         // Makes more legible .css.d.ts files 
            },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  mode: 'pure',                                       // Prevents global CSS. Options: local|global|pure
                  exportLocalsConvention: 'camelCaseOnly',
                  localIdentName: "[name]__[local]__[hash:base64:5]", // Uglify CSS classes' names
                },
              }
            },
            'sass-loader'
          ],
        },

        // TypeScript
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/, // NOTE: commenting this out would allow you to import from a node_module's src
        },
      ],
    },
    output: {
      libraryTarget: 'umd',
      // filename: '[name].js',
    },
    plugins: [
      new MiniCssExtractPlugin(),

      // CopyPlugin (if public exists)
      fs.existsSync(path.join(appDir, 'public')) && 
        new CopyPlugin({
          patterns: [{ from: 'public', to: '' }],
        }),

      // HtmlWebpackPlugin (if index.html exists)
      fs.existsSync(path.join(appDir, 'src/index.html')) && 
        new HtmlWebpackPlugin({
          template: './src/index.html',
        }),

      // ModuleFederationPlugin (if modFedPluginConfig)
      modFedPluginConfig && 
        new ModuleFederationPlugin(modFedPluginConfig),
    
      ].filter(plugin => plugin),

    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
  };

  // Merge configs
  const mergedConfig = _.merge({}, defaultConfig, webpackConfigMixin);

  return mergedConfig;
};
