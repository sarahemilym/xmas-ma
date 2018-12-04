const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
  const devMode = env.NODE_ENV !== 'production';

  console.log('DEV MODE', env.NODE_ENV);

  return {
    entry: {
      app: './src/js/index.js'
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
      filename: '[name].[chunkhash].js'
    },
    devServer: {
      contentBase: './build'
    },
    module: {
      rules: [
        {
          test: /\.twig$/,
          loader: 'twig-loader',
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use:  [
            !devMode ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'postcss-loader',
          ],
        },
        {
          use: {
            loader: 'babel-loader'
          },
          test: /\.js$/,
          exclude: /node_modules/
        },
        {
          test: /\.svg$/,
          loader: 'svg-inline-loader'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        name: 'index.html',
        template: './src/index.twig.js',
      }),
      new HtmlWebpackPlugin({
        filename: 'browse.html',
        template: './src/browse.twig',
      }),
      new MiniCssExtractPlugin({
        filename: devMode ? 'style.css' : 'style.[hash].css'
      }),
      new CleanWebpackPlugin(['build']),
    ],
    devtool: devMode ? 'source-map' : '',
  }
}