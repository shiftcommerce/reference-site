// Libraries
import { Component } from 'react'
import classNames from 'classnames'

// Objects
import Button from '../../objects/Button'
import Input from '../../objects/Input'

class RegisterForm extends Component {
  requiredFields () {
    return [ 'first_name', 'last_name', 'email', 'confirm_email', 'password', 'confirm_password' ]
  }

  formValid () {
    const { account } = this.props

    let requiredFieldsPresent = (this.requiredFields().every((key) => account[key] !== '' && account[key] !== null) === true)
    let noFormErrorsPresent = (Object.values(account.errors).filter(String).length === 0)
    return (requiredFieldsPresent && noFormErrorsPresent)
  }

  renderInputField (fieldOption) {
    const { account, formName, onBlur } = this.props

    return (
      <>
        <Input
          label={fieldOption.label}
          className={fieldOption.className}
          labelClassName={fieldOption.labelClassName}
          name={fieldOption.name}
          type={fieldOption.type}
          value={fieldOption.value}
          required={(fieldOption.rules && fieldOption.rules.required)}
          validationMessage={account.errors[fieldOption.name]}
          rules={fieldOption.rules}
          idInput={fieldOption.idInput}
          formName={formName}
          onBlur={onBlur}
        />
      </>
    )
  }

  renderPasswordInputFields () {
    const fieldOptions = [
      { className: 'o-form__input-block', type: 'password', label: 'Password', labelClassName: 'password', name: 'password', inputId: 'password', rules: { required: true, maxLength: 50, minLength: 8 } },
      { className: 'o-form__input-block', type: 'password', label: 'Confirm Password', labelClassName: 'password', name: 'confirm_password', inputId: 'passwordConfirmation', rules: { required: true, maxLength: 50, minLength: 8, compareField: 'password' } }
    ]

    return (
      <div className='o-flex o-flex__space-between'>
        { fieldOptions.map((fieldOption, index) => {
          return (
            <div className='o-flex-full-width-s' key={index}>
              { this.renderInputField(fieldOption) }
            </div>
          )
        })}
      </div>
    )
  }

  renderEmailInputFields () {
    const fieldOptions = [
      { className: 'o-form__input-block', label: 'Email', name: 'email', rules: { required: true, maxLength: 50, email: true }, inputId: 'email' },
      { className: 'o-form__input-block', label: 'Confirm Email', name: 'confirm_email', rules: { required: true, maxLength: 50, email: true, compareField: 'email' }, inputId: 'emailConfirmation' }
    ]

    return (
      <div className='o-flex o-flex__space-between'>
        { fieldOptions.map((fieldOption, index) => {
          return (
            <div className='o-flex-full-width-s' key={index}>
              { this.renderInputField(fieldOption) }
            </div>
          )
        })}
      </div>
    )
  }

  renderNameInputFields (formName) {
    const fieldOptions = [
      { className: 'o-form__input-block', label: 'First Name', name: 'first_name', rules: { required: true, maxLength: 50 } },
      { className: 'o-form__input-block', label: 'Last Name', name: 'last_name', rules: { required: true, maxLength: 50 } }
    ]
    return (
      <div className='o-flex o-flex__space-between'>
        { fieldOptions.map((fieldOption, index) => {
          return (
            <div className='o-flex-full-width-s' key={index}>
              { this.renderInputField(fieldOption) }
            </div>
          )
        })}
      </div>
    )
  }

  renderFormSubmitButton () {
    const { account } = this.props
    const isValidForm = this.formValid(account)

    return (
      <div className='o-form__input-group'>
        <Button
          className='c-password__button-icon'
          aria-label='Create Account'
          label='Create Account'
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
          {this.renderNameInputFields()}
          {this.renderEmailInputFields()}
          {this.renderPasswordInputFields()}
          <p>* Denotes required fields</p>
          {this.renderFormSubmitButton()}
        </form>
      </div>
    )
  }
}

export default RegisterForm
