const path = require('path');

module.exports = {
  devtool: 'cheap-module-source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
    ],
  },
};
