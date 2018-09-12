// Libraries
import { Component } from 'react'

// Components
import DeliveryInformation from './DeliveryInformation'
import ProductPrice from './ProductPrice'
import CarouselComponent from './Carousel'

// Objects
import Button from '../../../objects/Button'
import DropdownSelect from '../../../objects/DropdownSelect'
import SizeSelector from '../../../objects/SizeSelector'

class ProductDisplay extends Component {
  render () {
    let {
      product,
      sku,
      quantity,
      changeQuantity,
      changeSize,
      addToBag
    } = this.props

    const quantityOptions = [ 1, 2, 3, 4, 5 ]

    function productDescription () {
      return { __html: product.description }
    }

    return (
      <div className='c-product-display'>
        <div className='c-product-display__body'>
          <div className='c-product-display__gallery'>
            <div className='c-carousel'>
              <CarouselComponent className='c-carousel-slider' product={product} />
            </div>
          </div>
          <div className='c-product-display__details'>
            <section className='c-product-display__section'>
              <h1 role='heading' aria-level='1'>
                { product.title }
              </h1>

              <div className='c-product-display__sku'>
                <span>{ sku }</span>
              </div>

              <div className='c-product-display__price'>
                <ProductPrice variants={product.variants} />
              </div>

              <div className='c-product-display__description' dangerouslySetInnerHTML={productDescription()} />

              <div className='c-product-display__colour'>
                <strong>Colour:</strong>
                <span> {product.meta_attributes.master_colour.value} </span>
              </div>

              <div className='c-product-display__size'>
                <SizeSelector onChange={changeSize} value={sku} name='line_item[item_id]' prompt='Select a Size' variants={product.variants} aria-label='Size Selector' />
              </div>

              <div className='c-product-display__quantity'>
                <DropdownSelect onChange={changeQuantity} value={quantity} name='line_item[unit_quantity]' prompt='Select a Quantity' options={quantityOptions} aria-label='Quantity Selector' />
              </div>

              <div className='c-product-display__add-button'>
                <Button label='ADD TO BAG' status='primary' size='lrg' aria-label='Add to Bag' onClick={addToBag} />
              </div>
            </section>

            <section className='c-product-display__section' aria-label='Delivery Information'>
              <DeliveryInformation />
            </section>

          </div>
        </div>
      </div>
    )
  }
}

export default ProductDisplay
