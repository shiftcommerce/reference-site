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
    ALGOLIA_DISTINCT_VARIANTS,
    API_HOST_PROXY,
    CUSTOMER_ORDERS_PAGE_LIMIT,
    CUSTOMER_ORDERS_PAGE_OFFSET,
    ENABLE_TEST_PAYPAL_BUTTON,
    PAYPAL_CLIENT_ID,
    STRIPE_API_KEY
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
  algoliaDistinctVariants: ALGOLIA_DISTINCT_VARIANTS,
  apiHostProxy: API_HOST_PROXY,
  customerOrdersPageLimit: CUSTOMER_ORDERS_PAGE_LIMIT,
  customerOrdersPageOffset: CUSTOMER_ORDERS_PAGE_OFFSET,
  payPalClientID: PAYPAL_CLIENT_ID,
  storeName: 'ShopGo',
  enableTestPayPalButton: ENABLE_TEST_PAYPAL_BUTTON,
  Head: NextHead,
  menuRequest: menuRequest
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
