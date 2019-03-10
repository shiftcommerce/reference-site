import React from 'react'
import App, { Container } from 'next/app'
import { Config } from 'shift-react-components'
import { shiftNextConfig } from 'shift-next'

// Objects
import NextHead from '../objects/next-head'
import NextLink from '../objects/next-link'

// Next config
import getConfig from 'next/config'

// Stylesheet
import '../scss/main.scss'

const {
  publicRuntimeConfig: {
    ALGOLIA_API_KEY,
    ALGOLIA_APP_ID,
    ALGOLIA_RESULTS_PER_PAGE,
    ALGOLIA_INDEX_NAME,
    API_HOST_PROXY,
    STRIPE_API_KEY
  }
} = getConfig()

Config.set({
  Head: NextHead,
  Link: NextLink,
  stripeApiKey: STRIPE_API_KEY
})

shiftNextConfig.set({
  algoliaApiKey: ALGOLIA_API_KEY,
  algoliaAppId: ALGOLIA_APP_ID,
  algoliaIndexName: ALGOLIA_INDEX_NAME,
  algoliaResultsPerPage: ALGOLIA_RESULTS_PER_PAGE,
  apiHostProxy: API_HOST_PROXY,
  storeName: 'ShopGo'
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
