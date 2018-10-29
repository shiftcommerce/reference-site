// Libraries
import { Component } from 'react'
import classNames from 'classnames'

// Components
import ProductPrice from './product-price'

// Objects
import Image from '../../../objects/image'
import Button from '../../../objects/button'
import VariantSelector from '../../../objects/variant-selector'

class ProductDisplay extends Component {
  renderRatingStars (product) {
    const rating = (product.rating || 0)

    return (
      [1, 2, 3, 4, 5].map((key) =>
        <span key={key} className={classNames({ 'c-product-display__info-rating--fill': key <= rating, 'c-product-display__info-rating--empty': key > rating })}>
          &#9733;
        </span>
      )
    )
  }

  renderImage () {
    const { product } = this.props
    const imageUrls = product.asset_files.map(a => a.s3_url)

    return (
      <div className='c-product-display__gallery'>
        { imageUrls.map(imageUrl => {
          return <Image src={imageUrl} key={imageUrl} className='c-product-display__gallery-image'/>
        }) }
      </div>
    )
  }

  renderButtons () {
    const { product, addToBag } = this.props
    const minPrice = product.min_current_price
    const maxPrice = product.max_current_price

    return (
      <div className='c-product-display__buttons'>
        <div className='c-product-display__buttons-section1'>
          <div className='c-product-display__buttons-title'>
            { product.title }
          </div>
          <div className='c-product-display__buttons-price'>
            <ProductPrice minPrice={minPrice} maxPrice={maxPrice} />
          </div>
        </div>
        <div className='c-product-display__buttons-section2'>
          <div className='c-product-display__buttons-basket'>
            <Button className='c-product-display__buttons-basket-icon o-button--sml' label='ADD TO BASKET' status='positive' aria-label='Add to Basket' onClick={addToBag} />
          </div>
        </div>
      </div>
    )
  }

  renderDescription () {
    const { product } = this.props

    if (product.description) {
      return (
        <div className='c-product-display__description'>
          <h1 className='c-product-display__description-title'>Product Details</h1>
          <label htmlFor='description' className='c-product-dispay__label' />
          <input type='checkbox' id='description' />
          <span className='c-product-display__arrow' />
          <div className='c-product-display__description-text' dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>
      )
    }
  }

  renderColourSelector (meta) {
    if (meta.master_colour) {
      const { product } = this.props
      const productColour = product.meta_attributes.master_colour.value

      return (
        <div className='c-product-display__info-colour'>
          <h1 className='c-product-display__info-colour-title'>Colour</h1>
          <input type='radio' id='colour' style={{ backgroundColor: productColour }} />
          <label htmlFor='colour'>{ productColour }</label>
        </div>
      )
    }
  }

  renderInfo () {
    const { product, changeVariant, sku, product: { meta_attributes } } = this.props
    const minPrice = product.min_current_price
    const maxPrice = product.max_current_price

    return (
      <div className='c-product-display__info'>
        <div className='c-product-display__info-title'>
          { product.title }
        </div>
        <div className='c-product-display__info-price'>
          <ProductPrice minPrice={minPrice} maxPrice={maxPrice} />
        </div>
        <div className='c-product-display__info-rating'>
          { this.renderRatingStars(product) }
          <p className='c-product-display__info-reviews'> Read Reviews</p>
        </div>
        { this.renderColourSelector(meta_attributes) }
        <div className='c-product-display__info-size'>
          <VariantSelector
            onChange={changeVariant}
            value={sku}
            name='line_item[item_id]'
            prompt='Select a Product'
            variants={product.variants}
            aria-label='Size Selector' />
        </div>
      </div>
    )
  }

  renderFit (meta) {
    if (meta.silhouette) {
      return (
        <p className='c-product-display__size-text'>- { meta.silhouette.value }</p>
      )
    }
  }

  renderFeature (meta) {
    if (meta.product_feature) {
      return (
        <p className='c-product-display__size-text'>- { meta.product_feature.value }</p>
      )
    }
  }

  renderSizeAndFit () {
    const { product: { meta_attributes } } = this.props

    if (meta_attributes.product_feature || meta_attributes.silhouette) {
      return (
        <div className='c-product-display__size'>
          <h1 className='c-product-display__size-title'>Size & Fit</h1>
          <label htmlFor='size' className='c-product-dispay__label' />
          <input type='checkbox' id='size' />
          <span className='c-product-display__arrow' />
          { this.renderFeature(meta_attributes) }
          { this.renderFit(meta_attributes) }
        </div>
      )
    }
  }

  renderCleaning (meta) {
    if (meta.care_instructions) {
      return (
        <p className='c-product-display__care-text'>- { meta.care_instructions.value }</p>
      )
    }
  }

  renderFabric (meta) {
    if (meta.fabric) {
      return (
        <p className='c-product-display__care-text'>- { meta.fabric.value }</p>
      )
    }
  }

  renderDetailsAndCare () {
    const { product: { meta_attributes } } = this.props

    if (meta_attributes.fabric || meta_attributes.care_instructions) {
      return (
        <div className='c-product-display__care'>
          <h1 className='c-product-display__care-title'>Details & Care</h1>
          <label htmlFor='care' className='c-product-dispay__label' />
          <input type='checkbox' id='care' />
          <span className='c-product-display__arrow' />
          { this.renderCleaning(meta_attributes) }
          { this.renderFabric(meta_attributes) }
        </div>
      )
    }
  }

  render () {
    return (
      <div className='c-product-display'>
        <div className='c-product-display__body'>
          <div className='c-product-display__content-image'>
            { this.renderImage() }
          </div>
          <div className='c-product-display__content-details'>
            { this.renderButtons() }
            { this.renderInfo() }
            <div className='c-product-display__body-dropdowns'>
              { this.renderDescription() }
              { this.renderSizeAndFit() }
              { this.renderDetailsAndCare() }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductDisplay
