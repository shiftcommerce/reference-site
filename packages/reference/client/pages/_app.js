import React from 'react'
import App, { Container } from 'next/app'
import { Config } from 'shift-react-components'
import { shiftNextConfig } from 'shift-next'

// Objects
import NextLink from '../objects/next-link'

Config.set({
  Link: NextLink
})

shiftNextConfig.set({
  apiHostProxy: process.env.API_HOST_PROXY,
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
