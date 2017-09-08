// Libraries
import { Component } from 'react'

class SizeSelector extends Component {
  constructor (props) {
    super(props)
    this.renderOptions = this.renderOptions.bind(this)
  }

  renderOptions (variants) {
    return (
      variants && variants.map((variant, idx) =>
        <option role='option' key={idx} value={variant.sku} aria-setsize={variants.length} aria-posinset={idx + 1} data-price={variant.meta_data.eu.price}>
          { variant.meta_data.eu.size }
        </option>
      )
    )
  }

  render () {
    let {
      name,
      prompt,
      variants,
      ...otherProps
    } = this.props

    return (
      <select name={name} {...otherProps}>

        <option role='option' value='' aria-setsize={variants.length} aria-posinset='0' >{ prompt }</option>

        { this.renderOptions(variants) }

      </select>
    )
  }
}

export default SizeSelector
