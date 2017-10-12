// Libraries
import { Component } from 'react'
import classNames from 'classnames'

export default class DropdownSelect extends Component {
  constructor (props) {
    super(props)

    this.renderOptions = this.renderOptions.bind(this)
    this.triggerChange = this.triggerChange.bind(this)
    this.triggerBlur = this.triggerBlur.bind(this)
  }

  renderOptions (options) {
    return (
      options && options.map((option, idx) =>
        <option role='option' key={idx} value={option} aria-setsize={options.length} aria-posinset={idx + 1} >{ option.title || option }</option>
      )
    )
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
    const { label, name, required } = this.props

    if (label) {
      return (
        <label htmlFor={name} className='o-form__label'>{label}{required && ' *'}</label>
      )
    }
  }

  render () {
    let {
      name,
      prompt,
      options,
      required,
      value
    } = this.props

    return (
      <div className={classNames('o-form__input-group')}>
        { this.renderLabel() }
        <select
          className='o-form__input-block o-form__input-field'
          id={name}
          required={required}
          value={value}
          name={name}
          role='listbox'
          onChange={this.triggerChange}
          onBlur={this.triggerBlur}
          >

          <option role='option' aria-setsize={options.length} aria-posinset='0'>{ prompt }</option>

          { this.renderOptions(options) }

        </select>
      </div>
    )
  }
}
