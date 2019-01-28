// Libraries
import React from 'react'
import classNames from 'classnames'
import Link from 'next/link'

// Components
import ProductPrice from '../display/product-price'

// Objects
import { Rating, LazyLoad } from 'shift-react-components'

class ProductListingCard extends React.Component {
  renderImageAndTitle () {
    const {
      assetFileAltText,
      assetFileUrl,
      title,
      imageHeight,
      imageWidth
    } = this.props

    const DEFAULT_IMAGE_DIMENSION = 280

    // Needed so that the aspect ratio can be calculated
    // if it is undefined then lazyload div wont display correctly.
    // TODO: remove this when we specify height/width in Algolia.
    const plpImageHeight = imageHeight || DEFAULT_IMAGE_DIMENSION
    const plpImageWidth = imageWidth || DEFAULT_IMAGE_DIMENSION

    return (
      <>
        <div className='c-product-listing-card__gallery c-image'>
          <LazyLoad className='c-product-listing-card__image u-image-shadow'
            src={assetFileUrl}
            alt={assetFileAltText || title}
            aria-label={title}
            imageHeight={plpImageHeight}
            imageWidth={plpImageWidth}
          />
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
            <Rating rating={productRating} />
          </div>
        </div>
      </div>
    )
  }
}

export default ProductListingCard
