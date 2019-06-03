// Libraries
import { connect } from 'react-redux'

import { algoliaReduxWrapper } from '@shiftcommerce/shift-next/src/lib/algolia-redux-wrapper'
import LoginPage from '@shiftcommerce/shift-next/src/pages/login'

const formTranslations = {
  title: 'login',
  caption: 'Please enter your details below',
  loginButtonText: 'continue securely',
  registerButtonText: 'create new account',
  emailInputLabel: 'Email *',
  emailPlaceholder: 'Email',
  passwordInputLabel: 'Password *',
  passwordPlaceholder: 'Password',
  resetPasswordLink: 'Reset Password?'
}

function mapStateToProps ({ login, account: { loggedIn } }) {
  return { login, loggedIn, formTranslations }
}

export default algoliaReduxWrapper(connect(mapStateToProps)(LoginPage), LoginPage)
