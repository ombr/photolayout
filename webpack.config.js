webpack = require('webpack');
module.exports = {
  entry: {
    photolayout: "./src/responsivelayout.coffee",
    "photolayout.min": "./src/responsivelayout.coffee",
    demo: "./src/demo.coffee"
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
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ include: /\.min\.js$/ })
  ]
};
