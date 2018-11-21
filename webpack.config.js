const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    devtools: './src/devtools.js',
    panel: './src/panel.js',
    background: './src/background.js',
    contentScript: './src/contentScript.js',
    initialize: './src/initialize.js',
  },
  devtool: 'cheap-module-source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      {
        from: './src/*.html',
        to: path.resolve(__dirname, 'dist'),
        flatten: true,
      },
      {
        from: './static/**/*',
        to: path.resolve(__dirname, 'dist'),
        flatten: true,
      },
    ]),
  ],
};
