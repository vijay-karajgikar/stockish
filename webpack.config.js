const path = require("path");

module.exports = {
  
  entry: './client/src/app.js',
  output: {
    path: path.join(__dirname, 'client/public'),
    filename: 'bundle.js'
  },
  module: {
    rules:[{
      test: /\.js$/,
      loader: 'babel-loader'
    }]
  },
  devServer: {
    contentBase: path.join(__dirname, './client/public'),
    historyApiFallback: true
  }
}