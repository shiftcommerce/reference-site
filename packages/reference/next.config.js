const path = require('path')
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
const nextRuntimeDotenv = require('next-runtime-dotenv')
const withTM = require('next-transpile-modules')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')

const withConfig = nextRuntimeDotenv({
  public: [
    'API_HOST_PROXY',
    'ALGOLIA_APP_ID',
    'ALGOLIA_API_KEY',
    'ALGOLIA_INDEX_NAME',
    'ALGOLIA_RESULTS_PER_PAGE',
    'STRIPE_API_KEY',
    'PAYPAL_CLIENT_ID',
    'ENABLE_TEST_PAYPAL_BUTTON',
    'CONNECT_HOSTS',
    'FRAME_HOSTS',
    'IMAGE_HOSTS',
    'SCRIPT_HOSTS',
    'STYLE_HOSTS'
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

module.exports = withConfig(withBundleAnalyzer(withCSS(withSass(withTM({
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html'
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html'
    }
  },
  sassLoaderOptions: {
    includePaths: [`${process.env.INIT_CWD}/node_modules`]
  },
  transpileModules: [
    '@shiftcommerce/shift-next',
    '@shiftcommerce/shift-next-routes',
    '@shiftcommerce/shift-react-components',
    '@shiftcommerce/shift-node-api'
  ],
  poweredByHeader: false,
  assetPrefix: process.env.ASSET_HOST || '',
  onDemandEntries: {
    maxInactiveAge: 1000 * 1000, // period (in ms) where the server will keep pages in the buffer
    pagesBufferLength: 50 // number of pages that should be kept simultaneously without being disposed
  },
  webpack (config, { dev }) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@shiftcommerce/shift-next': path.resolve('../../node_modules/@shiftcommerce/shift-next'),
      '@shiftcommerce/shift-next-routes': path.resolve('../../node_modules/@shiftcommerce/shift-next-routes'),
      '@shiftcommerce/shift-react-components': path.resolve('../../node_modules/@shiftcommerce/shift-react-components'),
      '@shiftcommerce/shift-node-api': path.resolve('../../node_modules/@shiftcommerce/shift-node-api')
    }

    config.node = {
      fs: 'empty'
    }

    config.module.rules.push(
      {
        test: /\.(svg|jpg)$/,
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
})))))
