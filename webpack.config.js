const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')

const phaserModule = path.join(__dirname, '/node_modules/phaser-ce/')

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  styles: path.join(__dirname, 'assets/styles'),
  phaser: path.join(phaserModule, 'build/custom/phaser-split.js'),
  pixi: path.join(phaserModule, 'build/custom/pixi.js'),
  p2: path.join(phaserModule, 'build/custom/p2.js')
}

const extractTextPlugin = new ExtractTextPlugin({
  filename: './styles/[hash].css',
})

const commonConfig = {
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(PATHS.src, 'main.js')
    ],
    vendor: ['pixi', 'p2', 'phaser', 'webfontloader']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'/* chunkName= */,
      filename: 'vendor.bundle.js'/* filename= */
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(PATHS.src, 'index.html'),
    }),
  ],
  module: {
    rules: [
      { test: /\.js$/, use: ['babel-loader'], include: PATHS.src },
      { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
      { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
      { test: /p2\.js/, use: ['expose-loader?p2'] },
      { test: /\.html$/, use: ['html-loader'] },
      { test: /\.(jpg|png|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: './images/[hash].[ext]',
          },
        }
      },
    ]
  },
  resolve: {
    alias: {
      'phaser': PATHS.phaser,
      'pixi': PATHS.pixi,
      'p2': PATHS.p2
    }
  }
}

const devConfig = {
  devServer: {
    historyApiFallback: true,
    stats: 'errors-only',
    host: process.env.HOST, // Defaults to `localhost`
    port: process.env.PORT, // Defaults to 8080
  },
  devtool: 'cheap-source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: PATHS.styles,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
    }),
  ],
}

const prodConfig = {
  output: {
    path: PATHS.dist,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: PATHS.styles,
        use: extractTextPlugin.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader',
        }),
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.UglifyJsPlugin({
      drop_console: true,
      minimize: true,
      output: {
        comments: false
      }
    }),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false'))
    }),
    extractTextPlugin,
  ],
}

module.exports = env => {
  if (env === 'production') {
    return merge(commonConfig, prodConfig);
  }

  return merge(commonConfig, devConfig);
}
