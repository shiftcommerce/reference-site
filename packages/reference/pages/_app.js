import React from 'react'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import withRedux from 'next-redux-wrapper'
import ConnectedLayout from '../components/Layout'
import { makeStore } from '../utils/configureStore'
import { readMenu } from '../actions/menuActions'

export default withRedux(makeStore, {debug: false})(class MyApp extends App {
  static async getInitialProps ({Component, ctx}) {
    await ctx.store.dispatch(readMenu(ctx.store))

    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
        // Some custom thing for all pages
        menu: ctx.menu
      }
    }
  }

  render () {
    const {Component, pageProps, store} = this.props
    return (
      <Container>
        <Provider store={store}>
          <ConnectedLayout>
            <Component {...pageProps} />
          </ConnectedLayout>
        </Provider>
      </Container>
    )
  }
})
