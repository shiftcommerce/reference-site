// Libraries
import { PureComponent } from 'react'
import { fixedPrice } from '../../../lib/fixed-price'

class ProductPrice extends PureComponent {
  // only add two decimal places if the price is not an integer
  // e.g. £25 but £26.50
  addDecimalsIfNeeded (price) {
    if (parseFloat(price) === parseInt(price)) {
      return price
    } else {
      return fixedPrice(price)
    }
  }

  renderPrice (minPrice, maxPrice) {
    if (minPrice !== maxPrice) {
      return (
        <span>
          &pound;{ this.addDecimalsIfNeeded(minPrice) } - &pound;{ this.addDecimalsIfNeeded(maxPrice) }
        </span>
      )
    } else {
      return (
        <span>
          &pound;{ this.addDecimalsIfNeeded(maxPrice) }
        </span>
      )
    }
  }

  render () {
    return (
      <div className='c-product-price'>
        { this.renderPrice(this.props.minPrice, this.props.maxPrice) }
      </div>
    )
  }
}

export default ProductPrice
