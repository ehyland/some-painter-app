/*eslint no-var:0 */
var path = require("path");
var webpack = require("webpack");
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var strip = require("strip-loader");
var transformStats = require("./transformStats");

var commonLoaders = require("./common-loaders");
var dist = path.resolve(__dirname, "../static/build");

var srcPath = path.resolve(__dirname, "../src");

module.exports = {
  devtool: "source-map",
  context: path.resolve(__dirname, "../"),
  entry: ["./src/client.js"],
  output: {
    path: dist,
    filename: "[name]-[hash].js",
    chunkFilename: "[name]-[chunkhash].js",
    publicPath: "/static/build/"
  },
  module: {
    loaders: [

      // Javascript
      {
        test: /\.js$/,
        include: srcPath,
        loaders: [strip.loader("debug"), "babel"]
      },

      // Styles
      {
        test: /\.scss$/,
        include: srcPath,
        loader: ExtractTextPlugin.extract("style", "css!autoprefixer?browsers=last 2 version!sass")
      }
    ].concat(commonLoaders)
  },
  plugins: [
    new ExtractTextPlugin("[name]-[chunkhash].css"),
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),
    new webpack.DefinePlugin({
      "process.env": {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify("production")
      }
    }),

    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),

    // Write out stats.json file to build directory.
    new StatsWriterPlugin({transform: transformStats})
  ]
};
