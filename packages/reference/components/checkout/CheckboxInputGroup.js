// Libraries
import { Component } from 'react'

// Actions
import { inputChange, inputComplete } from '../../actions/checkoutActions'

export default class CheckboxInputGroup extends Component {
  constructor () {
    super()
    this.onInputChange   = this.onInputChange.bind(this)
    this.onInputComplete = this.onInputComplete.bind(this)
  }

  onInputChange (event) {
    return (
      this.props.dispatch(inputChange(this.props.formName, this.props.fieldName, event.target.checked))
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

    return (
      <div className='o-form__input-group'>
        <input checked={fieldValue} type='checkbox' id={fieldName} onChange={this.onInputChange} onBlur={this.onInputComplete} />
        <label htmlFor={fieldName}>{fieldLabel}</label>
      </div>
    )
  }
}
