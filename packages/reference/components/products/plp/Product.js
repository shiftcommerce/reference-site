// Libraries
import { Component } from 'react'
import { Highlight } from 'react-instantsearch/dom'
import classNames from 'classnames'
import Link from 'next/link'

// Objects
import Image from '../../../objects/Image'
import Button from '../../../objects/Button'

class Product extends Component {
  renderAssetFile (hit) {
    let asset = hit.product_assets[0]

    return (
      <div className='c-product__image-container'>
        <Image
          className={'c-product__image'}
          src={(asset && asset.url) || '/static/placeholder.png'}
          alt={(asset && asset.alt_text)}
          aria-label={(asset && asset.alt_text)}
        />
      </div>
    )
  }

  renderProductPrice (hit) {
    let metaData = hit.variant_meta_data
    let price = (((metaData && metaData.eu && metaData.eu.price) || 0) / 100).toFixed(2)

    return (
      <div className='c-product__price'>
        &pound;{ price }
      </div>
    )
  }

  renderRatingStars (hit) {
    let rating = (hit.product_rating || 0)

    return (
      [1, 2, 3, 4, 5].map((key, index) =>
        <span key={key} className={classNames({'c-product__rating--fill': key <= rating, 'c-product__rating--empty': key > rating})}>
          &#9733;
        </span>
      )
    )
  }

  render () {
    let {
      hit
    } = this.props

    let productID = hit.objectID.split('_')[0]

    return (
      <div className='c-product'>
        <Link href={`/products/product?id=${productID}`} as={hit.product_path}>
          <a>
            { this.renderAssetFile(hit) }

            <div className='c-product__title'>
              <Highlight attributeName='product_title' hit={hit} />
            </div>

            <div className='c-product__sku'>
              <Highlight attributeName='product_meta_data.eu.sku' hit={hit} />
            </div>

            { this.renderProductPrice(hit) }

            <div className='c-product__view-details'>
              <Button label='View' />
            </div>

            { this.renderRatingStars(hit) }
          </a>
        </Link>
      </div>
    )
  }
}

export default Product
