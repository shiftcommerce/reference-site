import React from 'react'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import withReduxStore from '../lib/withReduxStore'

import ConnectedLayout from '../components/Layout'

// Stylesheet
import '../scss/main.scss'

class MyApp extends App {
  render () {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Container>
        <Provider store={reduxStore}>
          <ConnectedLayout>
            <Component {...pageProps} />
          </ConnectedLayout>
        </Provider>
      </Container>
    )
  }
}

export default withReduxStore(MyApp)
