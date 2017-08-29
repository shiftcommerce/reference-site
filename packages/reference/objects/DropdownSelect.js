// Libraries
import { Component } from 'react'

class DropdownSelect extends Component {
  constructor (props) {
    super(props)
    this.renderOptions = this.renderOptions.bind(this)
  }

  renderOptions (options) {
    return (
      options && options.map((option, idx) =>
        <option role='option' key={idx} value={option} aria-setsize={options.length} aria-posinset={idx + 1} >{ option }</option>
      )
    )
  }

  render () {
    let {
      name,
      prompt,
      options,
      ...otherProps
    } = this.props

    return (
      <select name={name} {...otherProps} role='listbox'>

        <option role='option' value='' aria-setsize={options.length} aria-posinset='0'>{ prompt }</option>

        { this.renderOptions(options) }

      </select>
    )
  }
}

export default DropdownSelect
