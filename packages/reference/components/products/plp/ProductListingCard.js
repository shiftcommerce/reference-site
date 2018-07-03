// Libraries
import React from 'react'
import classNames from 'classnames'
import Link from 'next/link'

// Components
import ProductPrice from '../pdp/ProductPrice'

// Objects
import Button from '../../../objects/Button'
import Image from '../../../objects/Image'

class ProductListingCard extends React.Component {
  renderRatingStars (product) {
    let rating = (product.rating || 0)

    return (
      [1, 2, 3, 4, 5].map((key, index) =>
        <span key={key} className={classNames({ 'c-product-listing-card__rating--fill': key <= rating, 'c-product-listing-card__rating--empty': key > rating })}>
          &#9733;
        </span>
      )
    )
  }

  render () {
    let {
      product
    } = this.props

    const assetFile = product.asset_files[0]

    return (
      <div className='c-product-listing-card'>
        <div className='c-product-listing-card__body'>
          <div className='c-product-listing-card__gallery  c-image'>
            <Image className='c-product-listing-card__image'
              src={assetFile && assetFile.s3_url}
              alt={(assetFile && assetFile.alt_text) || product.title}
              aria-label={product.title} />
          </div>
          <div className='c-product-listing-card__title' >
            <p role='heading' aria-level='1'>
              {product.title}
            </p>
          </div>

          <div className='c-product-listing-card__price'>
            <ProductPrice variants={product.variants} />
          </div>

          <div className='c-product-listing-card__view-details'>
            <Link href={`/slug?slug=${product.canonical_path}`} as={product.canonical_path}>
              <Button label='View' status='primary' size='lrg' aria-label='View' />
            </Link>
          </div>

          <div className='c-product-listing-card__rating'>
            {this.renderRatingStars(product)}
          </div>
        </div>
      </div>
    )
  }
}

export default ProductListingCard
