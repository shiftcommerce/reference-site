const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')

const windows = process.env.WINDOWS || false

module.exports = withCSS(withSass({
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
  webpack (config, { dev }) {
    config.module.rules.push(
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
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
))
