/**
 * Created by udit on 10/24/17.
 */

const path = require('path')
const webpack = require('webpack')
const ExtracTextPlugin = require('extract-text-webpack-plugin')

const extractPlugin = new ExtracTextPlugin({
  filename: 'style.css',
})

module.exports = {
  entry: './lib/public/src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './lib/public/dist'),
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),
    extractPlugin,
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss/,
        use: extractPlugin.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
}
