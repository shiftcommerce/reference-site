const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')

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
  plugins: [
    new CopyWebpackPlugin([
      { from: './src/scss/', to: 'scss/' }
    ]),
    new BundleAnalyzerPlugin({ analyzerMode: process.env.ANALYZE_BUNDLE ? 'server' : 'disabled' }),
    new DuplicatePackageCheckerPlugin()
  ]
}
