import React from 'react'
import App, { Container } from 'next/app'
import Config from '@shiftcommerce/shift-react-components/src/lib/config'
import shiftNextConfig from '@shiftcommerce/shift-next/src/lib/config'

// Objects
import NextLink from '../objects/next-link'
import NextHead from '../objects/next-head'

// Next config
import getConfig from 'next/config'

// Requests
import { menuRequest } from '../requests/menu-request'

// Stylesheet
import '../scss/main.scss'

const {
  publicRuntimeConfig: {
    ALGOLIA_API_KEY,
    ALGOLIA_APP_ID,
    ALGOLIA_RESULTS_PER_PAGE,
    ALGOLIA_INDEX_NAME,
    API_HOST_PROXY,
    STRIPE_API_KEY,
    PAYPAL_CLIENT_ID,
    ENABLE_TEST_PAYPAL_BUTTON,
    CONNECT_HOSTS,
    FRAME_HOSTS,
    IMAGE_HOSTS,
    SCRIPT_HOSTS,
    STYLE_HOSTS
  }
} = getConfig()

Config.set({
  Link: NextLink,
  stripeApiKey: STRIPE_API_KEY
})

shiftNextConfig.set({
  algoliaApiKey: ALGOLIA_API_KEY,
  algoliaAppId: ALGOLIA_APP_ID,
  algoliaIndexName: ALGOLIA_INDEX_NAME,
  algoliaResultsPerPage: ALGOLIA_RESULTS_PER_PAGE,
  apiHostProxy: API_HOST_PROXY,
  payPalClientID: PAYPAL_CLIENT_ID,
  storeName: 'ShopGo',
  enableTestPayPalButton: ENABLE_TEST_PAYPAL_BUTTON,
  Head: NextHead,
  menuRequest: menuRequest,
  connectHosts: CONNECT_HOSTS,
  frameHosts: FRAME_HOSTS,
  imageHosts: IMAGE_HOSTS,
  scriptHosts: SCRIPT_HOSTS,
  styleHosts: STYLE_HOSTS
})

class MyApp extends App {
  render () {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    )
  }
}

export default MyApp
