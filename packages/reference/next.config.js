const path = require('path')
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
const withTM = require('next-transpile-modules')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

module.exports = withBundleAnalyzer(withCSS(withSass(withTM({
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

  serverRuntimeConfig: {
    // Will only be available on the server side
    API_TENANT: process.env.API_TENANT,
    API_ACCESS_TOKEN: process.env.API_ACCESS_TOKEN,
    API_HOST: process.env.API_HOST,
    OMS_HOST: process.env.OMS_HOST,
    SESSION_SECRET: process.env.SESSION_SECRET,
    IMAGE_HOSTS: process.env.IMAGE_HOSTS,
    SCRIPT_HOSTS: process.env.SCRIPT_HOSTS,
    SECRET_STRIPE_API_KEY: process.env.SECRET_STRIPE_API_KEY,
    LOG_LEVEL: process.env.LOG_LEVEL
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    API_HOST_PROXY: process.env.API_HOST_PROXY,
    ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
    ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY,
    ALGOLIA_INDEX_NAME: process.env.ALGOLIA_INDEX_NAME,
    ALGOLIA_RESULTS_PER_PAGE: process.env.ALGOLIA_RESULTS_PER_PAGE,
    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    IMGIX_SOURCE: process.env.IMGIX_SOURCE,
    IMGIX_HOSTNAMES_TO_REPLACE: process.env.IMGIX_HOSTNAMES_TO_REPLACE,
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
    GOOGLE_TAG_MANAGER_ID: process.env.GOOGLE_TAG_MANAGER_ID
  },

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
      '@shiftcommerce/shift-next-routes': path.resolve('@shiftcommerce/shift-next-routes'),
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
}))))
