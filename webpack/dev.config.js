import path from "path";
import webpack from "webpack";
import WebpackErrorNotificationPlugin from "webpack-error-notification";

import commonLoaders from "./common-loaders";

const host = process.env.HOST || "0.0.0.0";
const port = (process.env.PORT + 1) || 3001;
const dist = path.resolve(__dirname, "../static/build");

const srcPath = path.resolve(__dirname, "../src");

const config = {
  devtool: "source-map",
  context: path.resolve(__dirname, "../"),
  entry: [
    "webpack-dev-server/client?http://" + host + ":" + port,
    "webpack/hot/only-dev-server",
    "./src/client.js"
  ],
  output: {
    path: dist,
    filename: "bundle.js",
    chunkFilename: "[name].bundle.js",
    publicPath: "http://" + host + ":" + port + "/"// + "/static/build/"
  },
  module: {
    loaders: [

      // Javascript
      {
        test: /\.js$/,
        include: srcPath,
        loaders: ["react-hot", "babel?cacheDirectory"]
      },

      // Styles
      {
        test: /\.scss$/,
        include: srcPath,
        loaders: ["style", "css", "autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true"]
      }
    ].concat(commonLoaders)
  },
  plugins: [

    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
        BROWSER: JSON.stringify(true)
      }
    }),
    new WebpackErrorNotificationPlugin()

  ]

};

export default config;
