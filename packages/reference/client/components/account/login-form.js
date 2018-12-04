// Libraries
import { Component } from 'react'
import classNames from 'classnames'
import t from 'typy'

// lib
import AccountFormErrors from '../../lib/form-errors'

// Objects
import Button from '../../objects/button'
import Input from '../../objects/input'
import Checkbox from '../../objects/checkbox'

class LoginForm extends Component {
  requiredFields () {
    return [ 'email', 'password' ]
  }

  formValid () {
    const { login } = this.props

    let requiredFieldsPresent = (this.requiredFields().every((key) => login[key] !== '' && login[key] !== null) === true)
    let noFormErrorsPresent = (Object.values(login.errors).filter(String).length === 0)
    return (requiredFieldsPresent && noFormErrorsPresent)
  }

  renderInputField (fieldOption) {
    const { login, formName, onBlur } = this.props

    return (
      <Input
        label={fieldOption.label}
        className={fieldOption.className}
        labelClassName={fieldOption.labelClassName}
        inputId={fieldOption.id}
        name={fieldOption.name}
        type={fieldOption.type}
        value={fieldOption.value}
        required={t(fieldOption, 'rules.requiredButIgnoreEmpty').safeObject}
        validationMessage={login.errors[fieldOption.name]}
        rules={fieldOption.rules}
        formName={formName}
        onBlur={onBlur}
      />
    )
  }

  renderEmailInputField () {
    const fieldOptions = [
      { className: 'o-form__input-block', type: 'email', label: 'Email', name: 'email', rules: { requiredButIgnoreEmpty: true, maxLength: 50, email: true } }
    ]

    return (
      <div className='o-flex o-flex__space-between'>
        { fieldOptions.map((fieldOption, index) => {
          return (
            <div className='o-flex-full-width-s' key={index}>
              { this.renderInputField(fieldOption) }
            </div>
          )
        }) }
      </div>
    )
  }

  renderPasswordInputField () {
    const fieldOptions = [
      { className: 'o-form__input-block', type: 'password', label: 'Password', name: 'password', rules: { requiredButIgnoreEmpty: true, maxLength: 50 } }
    ]

    return (
      <div className='o-flex o-flex__space-between'>
        { fieldOptions.map((fieldOption, index) => {
          return (
            <div className='o-flex-full-width-s' key={index}>
              { this.renderInputField(fieldOption) }
            </div>
          )
        }) }
      </div>
    )
  }

  renderFormSubmitButton () {
    const { login } = this.props
    const isValidForm = this.formValid(login)

    return (
      <Button
        className='c-login__button o-button--sml'
        aria-label='Continue Securely'
        label='CONTINUE SECURELY'
        status={(isValidForm ? 'positive' : 'disabled')}
        type='submit'
        disabled={!isValidForm}
      />
    )
  }

  render () {
    const {
      className,
      handleSubmit,
      login
    } = this.props

    return (
      <div className={classNames('o-form', className)}>
        <form onSubmit={handleSubmit}>
          <AccountFormErrors errors={login.validationErrors} />
          { this.renderEmailInputField() }
          { this.renderPasswordInputField() }
          <Checkbox label='Remember me' />
          { this.renderFormSubmitButton() }
        </form>
      </div>
    )
  }
}

export default LoginForm
