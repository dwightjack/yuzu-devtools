const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const base = require('./config/webpack.base');

module.exports = Object.assign({}, base, {
  entry: {
    panel: './src/panel.js',
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
        from: './src/{background,contentScript,detector,devtools}.js',
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
