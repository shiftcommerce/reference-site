// Libraries
import { Component } from 'react'

class VariantSelector extends Component {
  constructor (props) {
    super(props)
    this.renderOptions = this.renderOptions.bind(this)
  }

  renderOptions (variants) {
    return (
      // TODO: Do not use data attributes but instead use redux
      variants && variants.map((variant, idx) =>
        <option role='option' key={idx} value={variant.sku} aria-setsize={variants.length} aria-posinset={idx + 1} data-stock-available-level={variant.stock_available_level} data-price={variant.price}>
          { variant.title }
        </option>
      )
    )
  }

  render () {
    const {
      name,
      prompt,
      variants,
      ...otherProps
    } = this.props

    return (
      <div className='o-variant-selector'>
        <select name={name} {...otherProps}>
          <option role='option' value='' aria-setsize={variants.length} aria-posinset='0'>{ prompt }</option>
          { this.renderOptions(variants) }
        </select>
      </div>
    )
  }
}

export default VariantSelector
