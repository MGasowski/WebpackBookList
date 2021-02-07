const Path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    'js/mdb': Path.resolve(__dirname, '../../src/js/index.js'),
    'css/mdb': Path.resolve(__dirname, '../../src/scss/index.scss'),
  },
  output: {
    library: 'mdb',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true,
    path: Path.join(__dirname, '../../dist'),
    filename: '[name].min.js',
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: Path.resolve(__dirname, '../../src/mdb/index.html') },
      { from: Path.resolve(__dirname, '../../src/img'), to: 'img' },
    ]),
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].min.css',
    }),
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../../src'),
      'mdb': Path.join(__dirname, '../../node_modules/mdb-ui-kit'),
    },
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      },
      {
        test: /\.s?css/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
};
