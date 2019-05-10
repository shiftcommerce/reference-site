const path = require('path')
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
const nextRuntimeDotenv = require('next-runtime-dotenv')
const withTM = require('next-transpile-modules')

const withConfig = nextRuntimeDotenv({
  public: [
    'API_HOST_PROXY',
    'ALGOLIA_APP_ID',
    'ALGOLIA_API_KEY',
    'ALGOLIA_INDEX_NAME',
    'ALGOLIA_RESULTS_PER_PAGE',
    'STRIPE_API_KEY',
    'PAYPAL_CLIENT_ID',
    'ENABLE_TEST_PAYPAL_BUTTON'
  ],
  server: [
    'API_TENANT',
    'API_ACCESS_TOKEN',
    'API_HOST',
    'OMS_HOST',
    'SESSION_SECRET',
    'IMAGE_HOSTS',
    'SCRIPT_HOSTS',
    'SECRET_STRIPE_API_KEY',
    'PAYPAL_CLIENT_SECRET',
    'ENABLE_PAYPAL_LIVE_ENVIRONMENT'
  ]
})

module.exports = withConfig(withCSS(withSass(withTM({
  sassLoaderOptions: {
    includePaths: [`${process.env.INIT_CWD}/node_modules`]
  },
  transpileModules: [
    '@shiftcommerce/shift-next',
    '@shiftcommerce/shift-react-components'
  ],
  poweredByHeader: false,
  assetPrefix: process.env.ASSET_HOST || '',
  webpack (config, { dev }) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@shiftcommerce/shift-next': require.resolve('@shiftcommerce/shift-next'),
      '@shiftcommerce/shift-react-components': require.resolve('@shiftcommerce/shift-react-components'),
    }

    config.node = {
      fs: 'empty'
    }

    config.module.rules.push(
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              query: {
                hash: 'sha512',
                digest: 'hex',
                name: '[hash].[ext]'
              }
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: { progressive: true, quality: 65 },
              optipng: { enabled: false },
              pngquant: { quality: '65-90', speed: 4 },
              gifsicle: { interlaced: false },
              webp: { quality: 75 }
            }
          }
        ]
      },
      {
        test: /\.(eot|woff|woff2|ttf|jpg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000, name: '[name].[ext]'
          }
        }
      }
    )

    return config
  }
}))))
