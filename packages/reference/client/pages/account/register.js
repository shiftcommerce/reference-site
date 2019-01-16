// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import Head from 'next/head'

// Libs
import { setCookie } from '../../lib/set-cookie'
import { algoliaReduxWrapper } from '../../lib/algolia-redux-wrapper'
import { suffixWithStoreName } from '../../lib/suffix-with-store-name'

// Actions
import { createAccount } from '../../actions/register-actions'

// Components
import RegisterForm from '../../components/account/register-form'

export class RegisterPage extends Component {
  constructor () {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static async getInitialProps ({ reduxStore }) {
    // Redirect to myaccount if already logged in
    const { account, login } = reduxStore.getState()
    if (account.loggedIn || login.loggedIn) Router.push('/account/myaccount')
    return {}
  }

  componentDidUpdate () {
    const { account } = this.props

    // Redirect if account created
    if (account.loggedIn) {
      setCookie()
      Router.push('/account/myaccount')
    }
  }

  handleSubmit (values) {
    this.props.dispatch(createAccount(values))
  }

  render () {
    return (
      <>
        <Head>
          <title>{ suffixWithStoreName('Create Account') }</title>
        </Head>
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
      </>
    )
  }
}

function mapStateToProps (state) {
  const { registration, account } = state

  return { registration, account }
}

export default algoliaReduxWrapper(connect(mapStateToProps)(RegisterPage), RegisterPage)
