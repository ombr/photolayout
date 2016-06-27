var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: {
    photolayout: "./src/photolayout.coffee",
    "photolayout.min": "./src/photolayout.coffee",
    "demo": "./src/demo.coffee",
    "demo.min": "./src/demo.coffee"
  },
  output: {
    path: __dirname,
    filename: "dist/[name].js",
    libraryTarget: "umd",
    library: '[name]'
  },
  module: {
    loaders: [
    { test: /\.coffee$/, loaders: ["babel?presets[]=es2015", "coffee-loader" ] },
    { test: /\.sass$/, loader: ExtractTextPlugin.extract("style-loader", "css!sass") },
    { test: /\.jade$/, loader: "jade"}
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ include: /\.min\.js$/ }),
    new HtmlWebpackPlugin({ template: './src/index.jade', inject: false }),
    new ExtractTextPlugin("dist/[name].css")
  ]
};
