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
    ENABLE_TEST_PAYPAL_BUTTON,
    ORDER_HISTORY_PAGE_LIMIT,
    PAYPAL_CLIENT_ID,
    STRIPE_API_KEY,
    SEARCH_DEBOUNCE_MS
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
  enableTestPayPalButton: ENABLE_TEST_PAYPAL_BUTTON,
  Head: NextHead,
  menuRequest: menuRequest,
  orderHistoryPageLimit: ORDER_HISTORY_PAGE_LIMIT,
  payPalClientID: PAYPAL_CLIENT_ID,
  storeName: 'ShopGo',
  searchDebounceMillisecs: SEARCH_DEBOUNCE_MS
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
