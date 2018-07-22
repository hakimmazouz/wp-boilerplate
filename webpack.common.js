const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/scripts/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: [
              ['transform-class-properties'],
              ['transform-object-rest-spread'],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: loader => [
                  require('precss'),
                  require('autoprefixer'),
                  require('cssnano'),
                ],
              },
            },
          ],
        }),
      },
      {
        test: /\.(png|jpg|gif|eot|svg|ttf|woff|woff2|json|mp4|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './assets/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css',
    }),
    new CopyWebpackPlugin(
      [
        {
          from: './src',
          to: './',
          force: true,
        },
      ],
      {
        ignore: [
          '*.js',
          '*.css',
          '*.jpg',
          '*.png',
          '*.gif',
          '*.eot',
          '*.svg',
          '*.ttf',
          '*.woff',
          '*.woff2',
          '*.json',
          '*.mp4',
          '*.ico',
          '.DS_Store',
        ],
      },
    ),
  ],
}
