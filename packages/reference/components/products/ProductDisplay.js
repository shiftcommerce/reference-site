// Libraries
import { Component } from 'react'

// Components
import RelatedProducts from './RelatedProducts'
import DeliveryInformation from './DeliveryInformation'

// Objects
import ContentImage from '../../objects/ContentImage'
import Button from '../../objects/Button'
import DropdownSelect from '../../objects/DropdownSelect'
import SizeSelector from '../../objects/SizeSelector'

class ProductDisplay extends Component {
  render () {
    let {
      product
    } = this.props

    const quantityOptions = [ 1, 2, 3, 4, 5 ]

    return (
      <div className='c-product-display'>
        <div className='c-product-display__body'>
          <div className='c-product-display__gallery'>
            <div>
              <ContentImage src={product.asset_files[0] && product.asset_files[0].url} alt={product.title} height='705' width='503' aria-label={product.title} />
            </div>
          </div>

          <div className='c-product-display__details'>
            <section className='c-product-display__section'>
              <h1 role='heading' aria-level='1'>
                { product.title }
              </h1>

              <div className='c-product-display__sku'>
                <span>{ product.sku }</span>
              </div>

              <div className='c-product-display__price'>
                { product.price }
              </div>

              <div className='c-product-display__colour'>
                <strong>Colour:</strong>
                <span> { product.meta.colour } </span>
              </div>

              <div className='c-product-display__size'>
                <SizeSelector name='line_item[item_id]' prompt='Select a Size' variants={product.variants} aria-label='Size Selector' />
              </div>

              <div className='c-product-display__quantity'>
                <DropdownSelect name='line_item[unit_quantity]' prompt='Select a Quantity' options={quantityOptions} aria-label='Quantity Selector' />
              </div>

              <div className='c-product-display__add-button'>
                <Button label='ADD TO BAG' status='positive' aria-label='Add to Bag' />
              </div>
            </section>

            <section className='c-product-display__section' aria-label='Product Information'>
              <h3>Product Information</h3>
              { product.description }
            </section>

            <section className='c-product-display__section' aria-label='Delivery Information'>
              <DeliveryInformation />
            </section>

            <section className='c-product-display__section' aria-label='Related Products'>
              <RelatedProducts bundles={product.bundles} />
            </section>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductDisplay
