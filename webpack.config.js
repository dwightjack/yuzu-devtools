const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const base = require('./config/webpack.base');

module.exports = Object.assign({}, base, {
  entry: {
    devtools: './src/devtools.js',
    panel: './src/panel.js',
    background: './src/background.js',
    contentScript: './src/contentScript.js',
    initialize: './src/initialize.js',
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      {
        from: './src/*.html',
        to: base.output.path,
        flatten: true,
      },
      {
        from: './static/**/*',
        to: base.output.path,
        flatten: true,
      },
    ]),
  ],
});
