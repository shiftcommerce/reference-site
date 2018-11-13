import React from 'react'
import Cookies from 'js-cookie'
import { initializeStore } from '../utils/configure-store'
import { readMenu } from '../actions/menu-actions'
import { fetchAccountDetails } from '../actions/account-actions'
import { setLoggedInFromCookies } from '../actions/login-actions'

const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

function getOrCreateStore (initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState)
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState)
  }
  return window[__NEXT_REDUX_STORE__]
}

export default (App) => {
  return class AppWithRedux extends React.Component {
    static async getInitialProps (appContext) {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      const reduxStore = getOrCreateStore()
      await reduxStore.dispatch(readMenu())
      // Provide the store to getInitialProps of pages
      appContext.ctx.reduxStore = reduxStore

      let appProps = {}
      /*eslint-disable */
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps.call(App, appContext)
      }
      /* eslint-enable */

      return {
        ...appProps,
        initialReduxState: reduxStore.getState()
      }
    }

    constructor (props) {
      super(props)
      this.reduxStore = getOrCreateStore(props.initialReduxState)
    }

    componentDidMount () {
      if (Cookies.get('signedIn')) {
        this.reduxStore.dispatch(setLoggedInFromCookies())
        this.reduxStore.dispatch(fetchAccountDetails())
      }
    }

    render () {
      return <App {...this.props} reduxStore={this.reduxStore} />
    }
  }
}
