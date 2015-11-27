/*eslint no-var:0 */
var path = require("path");
var webpack = require("webpack");
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var strip = require("strip-loader");
var transformStats = require("./transformStats");

var dist = path.resolve(__dirname, "../static/build");

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
      { test: /\.json$/, loader: "json-loader"},
      { test: /\.js$/, exclude: /node_modules/, loaders: [strip.loader("debug"), "babel"] },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract("style", "css!autoprefixer?browsers=last 2 version!sass") },
      { test: /\.(jpe?g|png|gif|svg)$/, loader: "file" },
      { test: /\.woff2$/, loader: "url?limit=10000&mimetype=application/font-woff2" },
      { test: /\.woff$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot)$/, loader: "file" }
    ]
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
