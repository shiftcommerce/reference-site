// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'

// Libs
import { algoliaReduxWrapper } from '../../lib/algolia-redux-wrapper'
import { setCookie } from '../../lib/set-cookie'
import { suffixWithStoreName } from '../../lib/suffix-with-store-name'

// Actions
import { createLogin } from '../../actions/login-actions'
import { clearErrors, fetchAccountDetails } from '../../actions/account-actions'

// Components
import { LoginForm } from 'shift-react-components'

export class LoginPage extends Component {
  constructor () {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    if (this.props.login.errors.length > 0) {
      this.props.dispatch(clearErrors())
    }
  }

  static async getInitialProps ({ reduxStore }) {
    // Redirect to myaccount if already logged in
    const { account, login } = reduxStore.getState()
    if (account.loggedIn || login.loggedIn) Router.push('/account/myaccount')
    return {}
  }

  componentDidUpdate () {
    const { login } = this.props

    // Redirect if logged in
    if (login.loggedIn === true) {
      setCookie()
      Router.push('/account/myaccount')
    }
  }

  handleSubmit (login) {
    this.props.dispatch(createLogin(login))
      .then(() => { this.props.dispatch(fetchAccountDetails()) })
  }

  render () {
    return (
      <>
        <Head>
          <title>{ suffixWithStoreName('Login') }</title>
        </Head>
        <div className='c-login'>
          <h1 className='c-login__title'>Login</h1>
          <p className='c-login__caption'>Please enter your details below.</p>
          <LoginForm {...this.props}
            title='Login'
            formName='loginForm'
            handleSubmit={this.handleSubmit}
          />
          <a href='/account/forgotpassword' className='c-login__anchor'>Reset Password?</a>
          <p className='c-login__caption'>Don't have an account?</p>
          <Link href='/account/register'>
            <a className='c-login__register-button'>create new account</a>
          </Link>
        </div>
      </>
    )
  }
}

function mapStateToProps (state) {
  const { login } = state

  return { login }
}

export default algoliaReduxWrapper(connect(mapStateToProps)(LoginPage), LoginPage)
