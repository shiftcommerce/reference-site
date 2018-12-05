// Libraries
import { Component } from 'react'
import { fixedPrice } from '../lib/fixed-price'

class VariantSelector extends Component {
  constructor (props) {
    super(props)
    this.renderOptions = this.renderOptions.bind(this)
  }

  renderOptions (variants) {
    return (
      // @TODO: Add variant data to algolia
      variants && variants.map((variant, idx) =>
        <option role='option' key={idx} value={variant.sku} aria-setsize={variants.length} aria-posinset={idx + 1} data-stock-available-level={variant.stock_available_level} data-price={variant.price} data-variant-id={variant.id}>
          { variant.title } - &pound;{ fixedPrice(variant.price) } { this.stockMessage(variant) }
        </option>
      )
    )
  }

  stockMessage (variant) {
    if (variant.stock_available_level <= 0 && variant.ewis_eligible) {
      return '- Email When in Stock'
    } else if (variant.stock_available_level <= 0) {
      return '- Out of Stock'
    } else {
      return ''
    }
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
