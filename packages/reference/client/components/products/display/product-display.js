// Libraries
import { Component } from 'react'
import {
  Button,
  Carousel,
  EwisForm,
  ProductPrice,
  Rating,
  VariantSelector
} from 'shift-react-components'

class ProductDisplay extends Component {
  renderCarousel (product) {
    return (
      <div className='c-product-display__carousel'>
        <Carousel assetFiles={product.asset_files} />
      </div>
    )
  }

  renderButtons () {
    const { addToBag, selectedVariant } = this.props

    if (selectedVariant && selectedVariant.ewis_eligible && selectedVariant.stock_available_level <= 0) {
      return (
        <div className='c-product-display__buttons'>
          <EwisForm />
        </div>
      )
    } else {
      const buttonStatus = selectedVariant && selectedVariant.stock_available_level > 0 ? 'positive' : 'disabled'
      const onClick = selectedVariant && selectedVariant.stock_available_level > 0 ? addToBag : null

      return (
        <div className='c-product-display__buttons'>
          <Button className='c-product-display__buttons-basket o-button--sml' label='add to basket' status={buttonStatus} aria-label='Add to Basket' onClick={onClick} />
        </div>
      )
    }
  }

  renderDescription (product, selectedVariant) {
    const description = selectedVariant ? selectedVariant.description : product.description

    if (description) {
      return (
        <div className='c-product-display__description'>
          <h1 className='c-product-display__description-title'>Product Details</h1>
          <label htmlFor='description' className='c-product-dispay__label' />
          <input type='checkbox' id='description' />
          <span className='c-product-display__arrow' />
          <div className='c-product-display__description-text' dangerouslySetInnerHTML={{ __html: description }} />
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

  renderSku (selectedVariant) {
    if (selectedVariant) {
      return (
        <div className='c-product-display__info-sku'>
          { selectedVariant.sku }
        </div>
      )
    }
  }

  renderTitle (product, selectedVariant) {
    let title = product.title

    if (selectedVariant) {
      title = `${product.title} - ${selectedVariant.title}`
    }

    return (
      <div className='c-product-display__info-title'>
        { title }
      </div>
    )
  }

  renderPrice (product, selectedVariant) {
    let minPrice = product.min_current_price
    let maxPrice = product.max_current_price

    if (selectedVariant) {
      minPrice = selectedVariant.price
      maxPrice = selectedVariant.price
    }

    return (
      <div className='c-product-display__info-price'>
        <ProductPrice minPrice={minPrice} maxPrice={maxPrice} />
      </div>
    )
  }

  renderInfo (product, selectedVariant) {
    const metaAttributes = product.meta_attributes
    const { changeVariant, sku } = this.props

    return (
      <div className='c-product-display__info'>
        { this.renderTitle(product, selectedVariant) }
        { this.renderSku(selectedVariant) }
        { this.renderPrice(product, selectedVariant) }
        <div className='c-product-display__info-rating'>
          <Rating
            rating={product.rating}
            className='o-rating__star--has-spacing o-rating__star--fs-small'
          />
          <p className='c-product-display__info-reviews'>Read Reviews</p>
        </div>
        { this.renderColourSelector(metaAttributes) }
        <div className='c-product-display__info-variant'>
          <VariantSelector
            onClick={changeVariant}
            value={sku}
            name='line_item[item_id]'
            prompt='Select a Product'
            variants={product.variants}
            aria-label='Variant Selector' />
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
    const { product, selectedVariant } = this.props

    return (
      <div className='c-product-display'>
        <div className='c-product-display__body'>
          <div className='c-product-display__content-image'>
            { this.renderCarousel(product) }
          </div>
          <div className='c-product-display__content-details'>
            { this.renderInfo(product, selectedVariant) }
            { this.renderButtons() }
            <div className='c-product-display__body-dropdowns'>
              { this.renderDescription(product, selectedVariant) }
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
