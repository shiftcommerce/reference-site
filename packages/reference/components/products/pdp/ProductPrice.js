// Libraries
import { Component } from 'react'

class ProductPrice extends Component {
  renderPrice (variants) {
    const priceList = variants.map((variant) => (variant.meta_data.eu.price))
    const minPrice = Number(Math.min(...priceList) / 100).toFixed(2)
    const maxPrice = Number(Math.max(...priceList) / 100).toFixed(2)

    if (minPrice !== maxPrice) {
      return (
        <span>
          &pound;{minPrice} - &pound;{maxPrice}
        </span>
      )
    } else {
      return (
        <span>
          &pound;{maxPrice}
        </span>
      )
    }
  }

  render () {
    return (
      <div className='c-product-price'>
        { this.renderPrice(this.props.variants) }
      </div>
    )
  }
}

export default ProductPrice
