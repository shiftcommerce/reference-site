// Libraries
import { Component } from 'react'
import classNames from 'classnames'

export default class Input extends Component {
  constructor () {
    super()

    this.triggerChange = this.triggerChange.bind(this)
    this.triggerBlur = this.triggerBlur.bind(this)
  }

  triggerChange (event) {
    const { formName, name, onChange } = this.props
    if (onChange) {
      onChange(event, formName, name)
    }
  }

  triggerBlur (event) {
    const { formName, name, onBlur } = this.props
    if (onBlur) {
      onBlur(event, formName, name)
    }
  }

  renderLabel () {
    const { name, label, required } = this.props
    return (
      <label htmlFor={name} className='o-form__label'>{label}{required && ' *'}</label>
    )
  }

  renderInputField () {
    const { inputId, value, name, required, placeholder, className } = this.props
    const type = this.props.type || 'text'
    const id = inputId || name
    let fieldValue = value || ''

    return (
      <input value={fieldValue}
        checked={fieldValue === true}
        className={classNames('o-form__input-field', className)}
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
    const hidden = this.props.hidden
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
      </div>
    )
  }
}
