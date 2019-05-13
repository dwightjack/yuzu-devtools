const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Terser = require('terser');
const pkg = require('./package.json');
const base = require('./config/webpack.base');

module.exports = Object.assign({}, base, {
  entry: {
    panel: './src/panel.js',
    initialize: './src/initialize.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: './src/*.html',
        to: base.output.path,
        flatten: true,
      },
      {
        from: './src/{background,contentScript,detector,devtools,error}.js',
        to: base.output.path,
        flatten: true,
        transform(content) {
          return Terser.minify(content.toString()).code.toString();
        },
      },
      {
        from: './static/**/*',
        to: base.output.path,
        flatten: true,
        transform(content, path) {
          if (path.endsWith('manifest.json')) {
            try {
              const json = JSON.parse(content.toString());
              json.version = pkg.version;
              return JSON.stringify(json, null, 2);
            } catch (e) {
              console.error(e); // eslint-disable-line no-console
              return content;
            }
          }
          return content;
        },
      },
    ]),
  ],
});
