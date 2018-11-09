const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/panel.js',
  output: {
    filename: 'panel.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      {
        from: './src/devtools.*',
        to: path.resolve(__dirname, 'dist'),
        flatten: true,
      },
      {
        from: './src/panel.html',
        to: path.resolve(__dirname, 'dist'),
      },
    ]),
  ],
};
