import React from 'react'
import App, { Container } from 'next/app'
import { Config } from 'shift-react-components'
import { shiftNextConfig } from 'shift-next'

// Objects
import NextLink from '../objects/next-link'

// Next config
import getConfig from 'next/config'

const { publicRuntimeConfig: { API_HOST_PROXY, ALGOLIA_INDEX_NAME } } = getConfig()

Config.set({
  Link: NextLink
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
