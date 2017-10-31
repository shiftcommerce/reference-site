// Libraries
import { Component } from 'react'
import classNames from 'classnames'

// HOC
import { withValidationMessage } from './withValidationMessage'

class Input extends Component {
  constructor (props) {
    super(props)

    this.triggerChange = this.triggerChange.bind(this)
    this.triggerBlur = this.triggerBlur.bind(this)
  }

  triggerChange (event) {
    const { formName, name, onChange } = this.props
    const value = event.target.value

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

  renderLabel () {
    const { name, label, required } = this.props
    return (
      <label htmlFor={name} className='o-form__label'>{label}{required && ' *'}</label>
    )
  }

  renderInputField () {
    const { inputId, value, name, required, placeholder, className, validationMessage } = this.props
    const type = this.props.type || 'text'
    const id = inputId || name
    let fieldValue = value || ''
    let validationErrorPresent = (validationMessage !== undefined) && (validationMessage !== '')

    return (
      <input value={fieldValue}
        checked={fieldValue === true}
        className={classNames('o-form__input-field', className, { 'o-form__input-field__error': validationErrorPresent })}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        onChange={this.triggerChange}
        onBlur={this.triggerBlur}
      />
    )
  }

  render () {
    const { hidden, renderValidationMessage } = this.props
    const type = this.props.type || 'text'

    let inputFields = ''

    if (type === 'checkbox') {
      inputFields = <div>
        { this.renderInputField() }
        { this.renderLabel() }
      </div>
    } else {
      inputFields = <div>
        { this.renderLabel() }
        { this.renderInputField() }
      </div>
    }

    return (
      <div className={classNames('o-form__input-group', {'u-hidden': hidden})}>
        { inputFields }
        { renderValidationMessage() }
      </div>
    )
  }
}

export default withValidationMessage()(Input)
