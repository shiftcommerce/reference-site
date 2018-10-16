// Libraries
import React from 'react'
import classNames from 'classnames'
import Link from 'next/link'

// Components
import ProductPrice from '../display/product-price'

// Objects
import Image from '../../../objects/image'

class ProductListingCard extends React.Component {
  renderRatingStars (product) {
    const rating = (product.rating || 0)

    return (
      [1, 2, 3, 4, 5].map((key, index) =>
        <span key={key} className={classNames({ 'c-product-listing-card__rating--fill': key <= rating, 'c-product-listing-card__rating--empty': key > rating })}>
          &#9733;
        </span>
      )
    )
  }

  render () {
    const {
      product,
      className
    } = this.props

    const assetFile = product.asset_files && product.asset_files[0]
    const pictureUrl = product.picture_url

    return (
      <div className={classNames('c-product-listing-card', className)}>
        <div className='c-product-listing-card__body'>
          <div className='c-product-listing-card__gallery c-image'>
            <Link href={`/slug?slug=${product.canonical_path}`} as={product.canonical_path}>
              <Image className='c-product-listing-card__image'
                src={(assetFile && assetFile.s3_url) || pictureUrl}
                alt={(assetFile && assetFile.alt_text) || product.title}
                aria-label={product.title} />
            </Link>
          </div>
          <div className='c-product-listing-card__title' >
            <p role='heading' aria-level='1'>
              { product.title }
            </p>
          </div>
          <div className='c-product-listing-card__price'>
            <ProductPrice product={product} />
          </div>
          <div className='c-product-listing-card__rating'>
            { this.renderRatingStars(product) }
          </div>
        </div>
      </div>
    )
  }
}

export default ProductListingCard
