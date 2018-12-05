// Libraries
import { Component } from 'react'
import classNames from 'classnames'
import zxcvbn from 'zxcvbn'

// HOC
import { withValidationMessage } from './with-validation-message'

class Input extends Component {
  constructor (props) {
    super(props)

    this.triggerChange = this.triggerChange.bind(this)
    this.triggerBlur = this.triggerBlur.bind(this)
    this.showHide = this.showHide.bind(this)
    this.passwordStrength = this.passwordStrength.bind(this)
    this.state = {
      type: props.type,
      score: null
    }

    // Set callback ref to allow us to refer to this input later
    // This ref is assigned when rendering the <input> tag below
    this.passwordInput = null
    this.setPasswordInputRef = (element) => {
      this.passwordInput = element
    }
  }

  triggerChange (event) {
    const { formName, name, onChange, labelClassName } = this.props
    const value = event.target.value

    if (labelClassName === 'password') {
      this.passwordStrength(event)
    }

    if (onChange) {
      onChange(event, formName, name, value)
    }
  }

  triggerBlur (event) {
    const { formName, name, rules, onBlur } = this.props
    const value = event.target.value

    if (onBlur) {
      onBlur(event, formName, name, value, rules)
    }
  }

  showHide (e) {
    e.preventDefault()
    e.stopPropagation()
    this.setState({
      type: this.state.type === 'input' ? 'password' : 'input'
    })

    // Focus input back into the password input
    // TODO: Use refs in future once we've upgraded Next:
    // https://reactjs.org/docs/refs-and-the-dom.html
    this.passwordInput.focus()
  }

  passwordStrength (e) {
    if (e.target.value === '') {
      this.setState({
        score: 'null'
      })
    } else {
      const pw = zxcvbn(e.target.value)
      this.setState({
        score: pw.score
      })
    }
  }

  validateForm () {
    this.setState({ formValid: this.state.emailValid && this.state.passwordValid && this.state.firstNameValid && this.state.lastNameValid && this.state.confirmEmailValid && this.state.confirmPasswordValid })
  }

  errorClass (error) {
    return (error.length === 0 ? '' : 'has-error')
  }

  renderLabel () {
    const { name, label, required, type, labelClassName } = this.props
    return (
      <label htmlFor={name} className={`o-form__label ${labelClassName}`}>
        <b>{ label } { required && ' *' }</b>
        { this.renderInputField() }
        { type === 'password' && <>
          <span className='password__show' onClick={this.showHide}>
            { this.state.type === 'input' ? 'Hide' : 'Show' }
          </span>
          <span className='password__strength' data-score={this.state.score} />
        </> }
      </label>
    )
  }

  renderInputField () {
    const { inputId, value, name, required, placeholder, className, validationMessage, readOnly } = this.props
    const id = inputId || name
    let fieldValue = value || null
    let validationErrorPresent = (validationMessage !== undefined) && (validationMessage !== '')

    return (
      <input
        checked={fieldValue === true}
        className={classNames('o-form__input-field', className, { 'o-form__input-field__error': validationErrorPresent })}
        type={this.state.type}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        onChange={this.triggerChange}
        onBlur={this.triggerBlur}
        value={value}
        ref={this.setPasswordInputRef}
        readOnly={readOnly}
      />
    )
  }

  render () {
    const { hidden, renderValidationMessage } = this.props
    const type = this.state.type || 'text'

    let inputFields = ''

    if (type === 'checkbox') {
      inputFields = <>
        { this.renderInputField() }
        { this.renderLabel() }
      </>
    } else {
      inputFields = <>
        { this.renderLabel() }
      </>
    }

    return (
      <div className={classNames('o-form__input-group', { 'u-hidden': hidden })}>
        { inputFields }
        { renderValidationMessage() }
      </div>
    )
  }
}

export default withValidationMessage()(Input)
