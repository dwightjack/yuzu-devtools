const path = require('path');

module.exports = {
  entry: {
    standalone: './dev/standalone.js',
  },
  devtool: 'cheap-module-source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [],
  devServer: {
    publicPath: '/dist/',
    contentBase: [path.join(__dirname, 'dev')],
  },
};
