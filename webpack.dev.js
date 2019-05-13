const path = require('path');
const base = require('./config/webpack.base');

module.exports = Object.assign({}, base, {
  entry: {
    panel: './dev/standalone.js',
  },
  devServer: {
    publicPath: '/',
    contentBase: [path.join(__dirname, 'src'), path.join(__dirname, 'dev')],
    open: true,
    openPage: 'panel.html',
  },
});
