// Libraries
import { Component } from 'react'
import classNames from 'classnames'

// Actions
import { inputChange, inputComplete } from '../../actions/checkoutActions'

export default class InputGroup extends Component {
  constructor () {
    super()
    this.onInputChange   = this.onInputChange.bind(this)
    this.onInputComplete = this.onInputComplete.bind(this)
  }

  onInputChange (event) {
    return (
      this.props.dispatch(inputChange(this.props.formName, this.props.fieldName, event.target.value))
    )
  }

  onInputComplete (event) {
    return (
      this.props.dispatch(inputComplete())
    )
  }

  render () {
    const fieldValue = this.props.fieldValue
    const fieldLabel = this.props.fieldLabel
    const fieldName  = this.props.fieldName
    const required   = this.props.required
    const hidden     = this.props.hidden

    return (
      <div className={classNames('o-form__input-group', {'u-hidden': hidden})}>
        <label htmlFor={fieldName}>{fieldLabel}{required && ' *'}</label>
        <input value={fieldValue} type='text' id={fieldName} required={required} onChange={this.onInputChange} onBlur={this.onInputComplete} />
      </div>
    )
  }
}
