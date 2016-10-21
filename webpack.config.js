// Imports
var path = require('path');
var webpack = require('webpack');

// Getting static server bind from environment
var staticServer = process.env.STATIC_SERVER || 'localhost:8000';
var [bind, port] = staticServer.split(':');
var staticUrl = `http://${staticServer}`;
var publicPath = staticUrl + '/static/';

// Check production status
// Production is used when building
var DEBUG = process.env.NODE_ENV !== 'production';

// Exporting setting for webpack
module.exports = {
  // Not really sure but seems the fast way
  devtool: DEBUG ? 'eval' : 'cheap-module-source-map',

  // Application entry points
  entry: (DEBUG ? [    // These defines hooks for hot reloading
      'react-hot-loader/patch',
      'webpack-dev-server/client?' + staticUrl,
      'webpack/hot/only-dev-server',
    ] : []).concat([
    // This is the entry point
    './reactest/frontend/src/index'
  ]),

  // Defines the output file for the html script tag
  output: {
    path: path.join(__dirname, 'reactest/frontend/static'),
    filename: 'bundle.js',
    publicPath: publicPath
  },

  // Entry points list, allow to load a file with transforms
  module: {
    loaders: [
      {
        // js files are loaded through babel (see .babelrc)
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel'],
        include: path.join(__dirname, 'reactest', 'frontend', 'src')
      }, {
        test: /\.sass$/i,
        loaders: ['style', 'css?sourceMap', 'sass?indentedSyntax&sourceMap']
      }
    ]
  },

  // Options for the webpack-dev-server
  devServer: {
    publicPath: publicPath,
    hot: true,
    historyApiFallback: true,
    bind: bind,
    port: port,
    stats: {colors: true}
  },

  // Webpack plugin list
  plugins: [
    // Allow hot module replacement
    new webpack.HotModuleReplacementPlugin()
  ]
};
