const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  module: {
    rules: [{ test: /\.js$/, use: "babel-loader" }]
  },
  devServer: {
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./index.html" }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
