const path = require('path');
const base = require('./config/webpack.base');

module.exports = Object.assign({}, base, {
  entry: {
    standalone: './dev/standalone.js',
  },
  devServer: {
    publicPath: '/dist/',
    contentBase: [path.join(__dirname, 'dev')],
  },
});
