import React from 'react'
import App, { Container } from 'next/app'
import { Config } from 'shift-react-components'

// Objects
import NextLink from '../objects/next-link'

Config.set({
  Link: NextLink
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
