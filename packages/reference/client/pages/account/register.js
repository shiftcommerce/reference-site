// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'

// Libs
import InputFieldValidator from '../../lib/InputFieldValidator'
import { setCookie } from '../../lib/setCookie'

// Actions
import { inputChange,
  setValidationMessage,
  createAccount
} from '../../actions/registerActions'

// Components
import RegisterForm from '../../components/account/RegisterForm'

export class Register extends Component {
  constructor () {
    super()

    this.validateInput = this.validateInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  validateInput (event, formName, fieldName, fieldValue, rules) {
    const { account } = this.props
    let validationMessage = new InputFieldValidator(fieldName, fieldValue, rules).validate(account)
    this.props.dispatch(setValidationMessage(formName, fieldName, validationMessage))
    this.props.dispatch(inputChange(formName, fieldName, fieldValue))
  }

  componentDidUpdate () {
    const { account } = this.props

    // Redirect if account created
    if (account.loggedIn === true) {
      setCookie()
      Router.push('/account/myaccount')
    }
  }

  renderErrors (account) {
    if (account.validationErrors.length > 0) {
      return (
        account.validationErrors.map((error, index) => {
          return <h1 key={index} className='c-register__errors'>
            { error.detail }
          </h1>
        })
      )
    }
  }

  handleSubmit (event) {
    event.preventDefault()
    const { account } = this.props

    this.props.dispatch(createAccount(account))
  }

  render () {
    const { account } = this.props

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
        { this.renderErrors(account) }
        <a className='c-register__anchor'>Privacy Policy</a>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { account } = state

  return { account }
}

export default connect(mapStateToProps)(Register)
