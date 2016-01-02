/*eslint no-var:0 */

var path = require("path");

var srcPath = path.resolve(__dirname, "../src");
var assetsSrcPath = path.resolve(__dirname, "../src/assets");
var stylesSrcPath = path.resolve(__dirname, "../src/styles");
var fontsSrcPath = path.resolve(__dirname, "../src/styles/fonts");

var svgoConfig = JSON.stringify({
  plugins: [
    {removeTitle: true},
    {convertColors: {shorthex: false}},
    {convertPathData: false}
  ]
});

module.exports = [

  // JSON
  {
    test: /\.json$/,
    loader: "json"
  },

  // Fonts
  {
    test: /\.woff2(\?v=[0-9].[0-9].[0-9])?$/,
    // include: fontsSrcPath,
    loader: "url?limit=10000&mimetype=application/font-woff2"
  },{
    test: /\.woff(\?v=[0-9].[0-9].[0-9])?$/,
    // include: fontsSrcPath,
    loader: "url?limit=10000&mimetype=application/font-woff"
  },{
    test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/,
    // include: fontsSrcPath,
    loader: "file"
  },

  // Images
  {
    test: /\.(jpe?g|png|gif)$/,
    // include: assetsSrcPath,
    loader: "file"
  },{
    test: /\.svg$/,
    // include: assetsSrcPath,
    loaders: ["file","svgo?" + svgoConfig]
  }

];
