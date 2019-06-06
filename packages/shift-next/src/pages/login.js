// Libraries
import React, { Component, Fragment } from 'react'
import Router from 'next/router'

// Libs
import Config from '../lib/config'
import { setCookie } from '../lib/set-cookie'
import { suffixWithStoreName } from '../lib/suffix-with-store-name'

// Actions
import { createLogin } from '../actions/login-actions'
import { clearErrors, fetchAccountDetails } from '../actions/account-actions'

// Components
import { LoginForm } from '@shiftcommerce/shift-react-components/src/components/account/login-form'

class LoginPage extends Component {
  constructor () {
    super()

    this.Head = Config.get().Head
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    if (this.props.login.errors.length > 0) {
      this.props.dispatch(clearErrors())
    }
  }

  static async getInitialProps ({ reduxStore, pathname }) {
    const { account: { loggedIn } } = reduxStore.getState()
    // Determine where to redirect user if already logged in
    if (loggedIn && pathname === '/checkout/login') {
      Router.push('/checkout/payment-method')
    } else if (loggedIn) {
      Router.push('/account/details')
    }
    return {}
  }

  handleSubmit (login) {
    this.props.dispatch(createLogin(login))
      .then(success => {
        if (success) {
          this.props.dispatch(fetchAccountDetails()).then(() => {
            setCookie()
            // Determine where to redirect user after successful log in
            if (window.location.pathname === '/checkout/login') {
              Router.push('/checkout/payment-method')
            } else Router.push('/account/details')
          })
        }
      })
  }

  render () {
    return (
      <Fragment>
        <this.Head>
          <title>{ suffixWithStoreName('Login') }</title>
        </this.Head>
        <LoginForm {...this.props}
          handleSubmit={this.handleSubmit}
        />
      </Fragment>
    )
  }
}

export default LoginPage
