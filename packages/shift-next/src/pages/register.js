// Libraries
import React, { Component, Fragment } from 'react'
import Router from 'next/router'

// Libs
import { setSignedInCookie } from '../lib/handle-cookies'
import { suffixWithStoreName } from '../lib/suffix-with-store-name'

// Actions
import { clearErrors } from '../actions/account-actions'
import { createAccount } from '../actions/register-actions'

// Components
import { RegisterForm } from '@shiftcommerce/shift-react-components/src/components/account/register-form'

// Config
import Config from '../lib/config'

class RegisterPage extends Component {
  constructor (props) {
    super(props)

    this.Head = Config.get().Head
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static buildAlgoliaStates () {
    return {}
  }

  componentDidMount () {
    if (this.props.registration.errors.length > 0) {
      this.props.dispatch(clearErrors())
    }
  }

  static async getInitialProps ({ reduxStore }) {
    // Redirect to myaccount if already logged in
    const { account: { loggedIn } } = reduxStore.getState()
    if (loggedIn) Router.push('/account/details')
    return {}
  }

  componentDidUpdate () {
    const { loggedIn } = this.props

    // Redirect if account created
    if (loggedIn) {
      setSignedInCookie()
      Router.push('/account/details')
    }
  }

  handleSubmit (values) {
    this.props.dispatch(createAccount(values))
  }

  renderLoaded () {
    return (
      <div className='c-register'>
        <div className='c-register__text'>
          <h1 className='c-register__text-title'>Create your account</h1>
          <p className='c-register__text-caption'>We are delighted to have you as part of the family. All we ask is that you fill in the missing details highlighted in the form below:</p>
        </div>
        <RegisterForm {...this.props}
          title='Create Account'
          formName='createAccountFields'
          onBlur={this.validateInput}
          onCreateAccount={this.onCreateAccount}
          handleSubmit={this.handleSubmit}
        />
        <a className='c-register__anchor'>Privacy Policy</a>
      </div>
    )
  }

  render () {
    return (
      <Fragment>
        <this.Head>
          <title>{ suffixWithStoreName('Create Account') }</title>
        </this.Head>
        { this.renderLoaded() }
      </Fragment>
    )
  }
}

export default RegisterPage
