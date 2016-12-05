var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var srcPath = path.join(__dirname, 'src');
//var buildPath = path.join(__dirname, 'dist');
var buildPath = path.join(__dirname, '../docs/app');

module.exports = {
  context: srcPath,
  entry: path.join(srcPath, 'js', 'client.js'),
  output: {
      path: buildPath,
      filename: "bundle.js"
  },
  plugins: [
      new HtmlWebpackPlugin({
          title: 'AOTY Visualizations',
          template: 'index.ejs'
      })
  ],
  module: {
      loaders: [
          {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
              presets: ['react', 'es2015']
            }
          }
      ]
  }
};