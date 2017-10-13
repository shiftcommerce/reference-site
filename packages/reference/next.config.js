const path = require('path')
const glob = require('glob')
const windows = process.env.WINDOWS || false

module.exports = {
  assetPrefix: process.env.ASSET_HOST || '',

  webpackDevMiddleware: (config) => {
    if (windows) {
      config.watchOptions = {
        ignored: /node_modules/,
        poll: 500,
        aggregateTimeout: 300
      }
    }
    return config
  },

  webpack: (config, { dev }) => {
    config.module.rules.push(
      {
        test: /\.(css|scss)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: [ 'babel-loader', 'raw-loader' ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          'babel-loader', 'raw-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['scss', 'node_modules']
                .map((d) => path.join(__dirname, d))
                .map((g) => glob.sync(g))
                .reduce((a, c) => a.concat(c), [])
            }
          }
        ]
      }
    )

    // Perform customizations to config
    config.module.rules = config.module.rules.map(rule => {
      if (rule.loader === 'babel-loader') {
        rule.options.cacheDirectory = false
      }
      return rule
    })

    return config
  }
}
