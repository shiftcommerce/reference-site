const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(jpe?g|png|svg|gif|ico|webp)$/,
        loader: 'url-loader',
        options: {
          limit: Infinity // everything
        }
      }
    ]
  },
  externals: {
    'react': 'commonjs react',
    'react-dom': 'commonjs react-dom'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    contentBase: './dist'
  },
  stats: {
    colors: {
      // yellow on a white terminal doesn't work, so change to magenta
      yellow: '\u001b[1m\u001b[35m'
    }
  },
  optimization: {
    // disable uglify
    minimize: false
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './src/scss/', to: 'scss/' }
    ]),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.ANALYZE_BUNDLE ? 'server' : 'disabled'
    }),
    new DuplicatePackageCheckerPlugin(),
    new StyleLintPlugin({
      syntax: 'scss'
    })
  ]
}
