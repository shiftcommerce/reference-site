// Libraries
import { Component } from 'react'
import classNames from 'classnames'
import Link from 'next/link'

// Components
import Carousel from './Carousel'
import ProductNavBar from '../../navigation/ProductNavBar'
import ProductPrice from './ProductPrice'

// Objects
import Button from '../../../objects/Button'
import SizeSelector from '../../../objects/SizeSelector'

// Fixtures
import Images from '../../../spec/fixtures/dummyPDPimages.fixture'

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

  renderCarousel () {
    return <>
      <div className='c-product-display__gallery'>
        <div className='c-carousel'>
          <Carousel className='c-carousel-slider' product={this.props.product} />
        </div>
      </div>
    </>
  }

  renderButtons () {
    const { product, addToBag } = this.props

    return <>
      <div className='c-product-display__buttons'>
        <div className='c-product-display__buttons-section1'>
          <div className='c-product-display__buttons-title'>
            {product.title}
          </div>
          <div className='c-product-display__buttons-price'>
            <ProductPrice variants={product.variants} />
          </div>
        </div>
        <div className='c-product-display__buttons-section2'>
          <div className='c-product-display__buttons-basket'>
            <Button className='c-product-display__buttons-basket-icon' label='ADD TO BASKET' status='primary' size='lrg' aria-label='Add to Basket' onClick={addToBag} />
          </div>
          <div className='c-product-display__buttons-buy'>
            <Button className='c-product-display__buttons-buy-icon' label='BUY' status='secondary' size='lrg' aria-label='Buy' />
          </div>
        </div>
      </div>
    </>
  }

  renderDescription () {
    const { product } = this.props

    return <>
      <div className='c-product-display__description'>
        <h1 className='c-product-display__description-title'>Product Details</h1>
        <label htmlFor='description' className='c-product-dispay__label' />
        <input type='checkbox' id='description' />
        <span className='c-product-display__arrow' />
        <div className='c-product-display__description-text' dangerouslySetInnerHTML={{ __html: product.description }} />
      </div>
    </>
  }

  renderInfo () {
    const { product, changeSize, sku } = this.props
    const productColour = product.meta_attributes.master_colour.value

    return <>
      <div className='c-product-display__info'>
        <div className='c-product-display__info-title'>
          {product.title}
        </div>
        <div className='c-product-display__info-price'>
          <ProductPrice variants={product.variants} />
        </div>
        <div className='c-product-display__info-rating'>
          { this.renderRatingStars(product) }
        </div>
        <p className='c-product-display__info-reviews'>Read Reviews</p>
        <div className='c-product-display__info-colour'>
          <h1 className='c-product-display__info-colour-title'>Colour</h1>
          <input type='radio' id='colour' style={{ backgroundColor: productColour }} />
          <label htmlFor='colour'>{productColour}</label>
        </div>
        <p className='c-product-display__info-size-chart'>Find your recommended size</p>
        <div className='c-product-display__info-size'>
          <SizeSelector onChange={changeSize} value={sku} name='line_item[item_id]' prompt='Please Select' label='Size' variants={product.variants} aria-label='Size Selector' />
        </div>
      </div>
    </>
  }

  renderFit (meta) {
    if (meta.silhouette) {
      return <>
        <p className='c-product-display__size-text'>- {meta.silhouette.value}</p>
      </>
    }
  }

  renderFeature (meta) {
    if (meta.product_feature) {
      return (
        <p className='c-product-display__size-text'>- {meta.product_feature.value}</p>
      )
    }
  }

  renderSizeAndFit () {
    const { product: { meta_attributes } } = this.props

    if (meta_attributes.product_feature || meta_attributes.silhouette) {
      return <>
        <div className='c-product-display__size'>
          <h1 className='c-product-display__size-title'>Size & Fit</h1>
          <label htmlFor='size' className='c-product-dispay__label' />
          <input type='checkbox' id='size' />
          <span className='c-product-display__arrow' />
          { this.renderFeature(meta_attributes) }
          { this.renderFit(meta_attributes) }
        </div>
      </>
    }
  }

  renderDetailsAndCare () {
    const { product } = this.props
    const cleaning = product.meta_attributes.care_instructions.value
    const fabric = product.meta_attributes.fabric.value

    return <>
      <div className='c-product-display__care'>
        <h1 className='c-product-display__care-title'>Details & Care</h1>
        <label htmlFor='care' className='c-product-dispay__label' />
        <input type='checkbox' id='care' />
        <span className='c-product-display__arrow' />
        <p className='c-product-display__care-text'>- {fabric}</p>
        <p className='c-product-display__care-text'>- {cleaning}</p>
      </div>
    </>
  }

  // Currently using dummy data from fixture
  renderRelatedProducts () {
    return <>
      <div className='c-product-display__related'>
        <h1 className='c-product-display__related-title'><span>you may also like</span></h1>
        <div className='c-product-display__related-images'>
          { Images.asset_files.map((image, index) => {
            return (
              <Link href={image.link} key={index}>
                <div className='c-product-display__related-images-link'>
                  <img className='c-product-display__related-images-file' src={image.asset_file} />
                  <p className='c-product-display__related-images-text'>{image.text}</p>
                  <p className='c-product-display__related-images-price'>{image.price}</p>
                </div>
              </Link>
            )
          })
        }
        </div>
      </div>
    </>
  }

  render () {
    return <>
      <div className='c-product-display'>
        <ProductNavBar />
        <div className='c-product-display__body'>
          { this.renderCarousel() }
          { this.renderButtons() }
          { this.renderInfo() }
          { this.renderDescription() }
          { this.renderSizeAndFit() }
          { this.renderDetailsAndCare() }
          { this.renderRelatedProducts() }
        </div>
      </div>
    </>
  }
}

export default ProductDisplay
