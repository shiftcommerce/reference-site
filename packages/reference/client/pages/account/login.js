// Libraries
import { connect } from 'react-redux'

import { algoliaReduxWrapper } from '@shiftcommerce/shift-next/src/lib/algolia-redux-wrapper'
import LoginPage from '@shiftcommerce/shift-next/src/pages/login'

const formOptions = {
  title: {
    visible: true,
    translation: 'Login'
  },
  loginButton: {
    visible: true,
    translation: 'CONTINUE SECURELY'
  },
  caption: {
    visible: true,
    translation: 'Please enter your details below'
  },
  caption2: {
    visible: true,
    translation: "don't have an account?"
  },
  registerButton: {
    visible: true,
    translation: 'create new account'
  },
  emailInputLabel: {
    visible: true,
    translation: 'Email *'
  },
  emailPlaceholder: 'Email',
  passwordInputLabel: {
    visible: true,
    translation: 'Password *'
  },
  passwordPlaceholder: 'Password',
  resetPasswordLink: {
    visible: true,
    translation: 'Reset Password?'
  }
}

const submitButtonClassName = 'c-login__button o-button--sml'

function mapStateToProps ({ login, account: { loggedIn } }) {
  return { login, loggedIn, formOptions, submitButtonClassName }
}

export default algoliaReduxWrapper(connect(mapStateToProps)(LoginPage), LoginPage)
