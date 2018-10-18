// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import Link from 'next/link'

// Libs
import InputFieldValidator from '../../lib/input-field-validator'
import { setCookie } from '../../lib/set-cookie'
// Actions
import { inputChange,
  setValidationMessage,
  createLogin
} from '../../actions/login-actions'

// Components
import LoginForm from '../../components/account/login-form'

// Objects
import Button from '../../objects/button'

export class Login extends Component {
  constructor () {
    super()

    this.validateInput = this.validateInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidUpdate () {
    const { login } = this.props

    // Redirect if logged in
    if (login.loggedIn === true) {
      setCookie()
      Router.push('/account/myaccount')
    }
  }

  validateInput (event, formName, fieldName, fieldValue, rules) {
    const { login } = this.props

    let validationMessage = new InputFieldValidator(fieldName, fieldValue, rules).validate(login)
    this.props.dispatch(inputChange(fieldName, fieldValue))
    this.props.dispatch(setValidationMessage(fieldName, validationMessage))
  }

  handleSubmit (event) {
    event.preventDefault()
    const { login } = this.props

    this.props.dispatch(createLogin(login))
  }

  renderErrors (login) {
    if (login.validationErrors.length > 0) {
      return (
        login.validationErrors.map((error, index) => {
          return <h1 key={index} className='c-register__errors'>
            { error.detail }
          </h1>
        })
      )
    }
  }

  render () {
    const { login } = this.props

    return (
      <div className='c-login'>
        <h1 className='c-login__title'>Login</h1>
        <p className='c-login__caption'>Please enter your details below.</p>
        <LoginForm {...this.props}
          title='Login'
          formName='loginForm'
          onBlur={this.validateInput}
          handleSubmit={this.handleSubmit}
        />
        <a href={'/account/forgotpassword'} className='c-login__anchor'>Reset Password?</a>
        { this.renderErrors(login) }
        <p className='c-login__caption'>{ "Don't have an account?" }</p>
        <Link href='/account/register'>
          <Button className='c-login__button-icon o-button--sml' label='CREATE NEW ACCOUNT' status='primary' aria-label='Create New Account' />
        </Link>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { login } = state

  return { login }
}

export default connect(mapStateToProps)(Login)
