// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

// Actions
import { inputChange, inputComplete } from '../../actions/checkoutActions'

class SelectInputGroup extends Component {
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

    const options = this.props.options.map((option) =>
      <option key={option.id} value={option.value}>
        {option.title}
      </option>
    )

    return (
      <div className={classNames('o-form__input-group', {'u-hidden': hidden})}>
        <label htmlFor={fieldName}>{fieldLabel}{required && ' *'}</label>
        <select id={fieldName} required={required} value={fieldValue} onChange={this.onInputChange} onBlur={this.onInputComplete}>
          { options }
        </select>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  }
}

export default connect(mapDispatchToProps)(SelectInputGroup)
