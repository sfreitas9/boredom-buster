const path = require('path');
const webpack = require('webpack');
//const result = require('dotenv').config().parsed;
const result = require('dotenv').config({ silent: process.env.NODE_ENV === 'production' }).parsed;
console.log('result=', result, "result.error=", result.error);
// reduce it to a nice object
const envKeys = Object.keys(result).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(result[next]);
  return prev;
}, {});

module.exports = {
  plugins: [
    new webpack.DefinePlugin(envKeys)
  ],

  context: path.join(__dirname, '/src'),

  entry: {
    javascript: './index'
  },

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/dist'),
  },

  resolve: {
    alias: {
      react: path.join(__dirname, 'node_modules', 'react')
    },
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]',
      },
    ],
  },
};
