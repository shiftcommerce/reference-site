// Libraries
import { Component } from 'react'
import classNames from 'classnames'

// Objects
import Button from '../../objects/Button'
import Input from '../../objects/Input'
import Checkbox from '../../objects/Checkbox'

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
      <>
        <Input
          label={fieldOption.label}
          className={fieldOption.className}
          labelClassName={fieldOption.labelClassName}
          inputId={fieldOption.id}
          name={fieldOption.name}
          type={fieldOption.type}
          value={fieldOption.value}
          required={(fieldOption.rules && fieldOption.rules.required)}
          validationMessage={login.errors[fieldOption.name]}
          rules={fieldOption.rules}
          formName={formName}
          onBlur={onBlur}
        />
      </>
    )
  }

  renderEmailInputField () {
    const fieldOptions = [
      { className: 'o-form__input-block', type: 'email', label: 'Email', name: 'email', rules: { required: true, maxLength: 50, email: true } }
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
      { className: 'o-form__input-block', type: 'password', label: 'Password', labelClassName: 'password', name: 'password', rules: { required: true, maxLength: 50, minLength: 6 } }
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
      <div className='o-form__input-group'>
        <Button
          className='c-login__button-icon'
          aria-label='Continue Securely'
          label='CONTINUE SECURELY'
          size='lrg'
          status={(isValidForm ? 'primary' : 'disabled')}
          type='submit'
          disabled={!isValidForm}
        />
      </div>
    )
  }

  render () {
    const {
      className,
      handleSubmit
    } = this.props

    return (
      <div className={classNames('o-form', className)}>
        <form onSubmit={handleSubmit}>
          { this.renderEmailInputField() }
          { this.renderPasswordInputField() }
          <Checkbox label='Remember me' />
          <div className='c-login__button'>
            { this.renderFormSubmitButton() }
          </div>
        </form>
      </div>
    )
  }
}

export default LoginForm
