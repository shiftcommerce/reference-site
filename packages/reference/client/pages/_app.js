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
    API_HOST_PROXY,
    ALGOLIA_INDEX_NAME,
    STRIPE_API_KEY
  }
} = getConfig()

Config.set({
  Head: NextHead,
  Link: NextLink,
  stripeApiKey: STRIPE_API_KEY
})

shiftNextConfig.set({
  apiHostProxy: API_HOST_PROXY,
  storeName: 'ShopGo',
  algoliaIndexName: ALGOLIA_INDEX_NAME
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
