// Libraries
import React from 'react'
import classNames from 'classnames'
import Link from 'next/link'

// Components
import ProductPrice from '../display/product-price'

// Objects
import Image from '../../../objects/image'

class ProductListingCard extends React.Component {
  renderRatingStars (productRating) {
    const rating = (productRating || 0)

    return (
      [1, 2, 3, 4, 5].map((key, index) =>
        <span key={key} className={classNames({ 'c-product-listing-card__rating--fill': key <= rating, 'c-product-listing-card__rating--empty': key > rating })}>
          &#9733;
        </span>
      )
    )
  }

  renderImageAndTitle () {
    const {
      assetFileAltText,
      assetFileUrl,
      title
    } = this.props

    return (
      <>
        <div className='c-product-listing-card__gallery c-image'>
          <Image className='c-product-listing-card__image u-image-shadow'
            src={assetFileUrl}
            alt={assetFileAltText || title}
            aria-label={title} />
        </div>
        <div className='c-product-listing-card__title' >
          <p role='heading' aria-level='1'>
            { title }
          </p>
        </div>
      </>
    )
  }

  render () {
    const {
      className,
      maxPrice,
      minPrice,
      productPath,
      productRating
    } = this.props

    return (
      <div className={classNames('c-product-listing-card', className)}>
        <div className='c-product-listing-card__body'>
          <Link href={`/slug?slug=${productPath}`} as={productPath}>
            <a>
              { this.renderImageAndTitle() }
            </a>
          </Link>
          <div className='c-product-listing-card__price'>
            <ProductPrice minPrice={minPrice} maxPrice={maxPrice} />
          </div>
          <div className='c-product-listing-card__rating'>
            { this.renderRatingStars(productRating) }
          </div>
        </div>
      </div>
    )
  }
}

export default ProductListingCard
