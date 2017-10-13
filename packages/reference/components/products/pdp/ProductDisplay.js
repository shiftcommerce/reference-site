// Libraries
import { Component } from 'react'

// Components
import RelatedProducts from './RelatedProducts'
import DeliveryInformation from './DeliveryInformation'
import ProductPrice from './ProductPrice'

// Objects
import Image from '../../../objects/Image'
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

    const assetFile = product.asset_files[0]

    const quantityOptions = [ 1, 2, 3, 4, 5 ]

    return (
      <div className='c-product-display'>
        <div className='c-product-display__body'>
          <div className='c-product-display__gallery'>
            <Image
              src={assetFile && assetFile.url}
              alt={(assetFile && assetFile.alt_text) || product.title}
              height={705}
              width={503}
              aria-label={product.title} />
          </div>

          <div className='c-product-display__details'>
            <section className='c-product-display__section'>
              <h1 role='heading' aria-level='1'>
                { product.title }
              </h1>

              <div className='c-product-display__sku'>
                <span>{ product.meta_data.eu.sku }</span>
              </div>

              <div className='c-product-display__price'>
                <ProductPrice variants={product.variants} />
              </div>

              <div className='c-product-display__colour'>
                <strong>Colour:</strong>
                <span> { product.meta_data.eu.colour } </span>
              </div>

              <div className='c-product-display__size'>
                <SizeSelector onChange={changeSize} value={sku} name='line_item[item_id]' prompt='Select a Size' variants={product.variants} aria-label='Size Selector' />
              </div>

              <div className='c-product-display__quantity'>
                <DropdownSelect onChange={changeQuantity} value={quantity} name='line_item[unit_quantity]' prompt='Select a Quantity' options={quantityOptions} aria-label='Quantity Selector' />
              </div>

              <div className='c-product-display__add-button'>
                <Button label='ADD TO BAG' status='positive' aria-label='Add to Bag' onClick={addToBag} />
              </div>
            </section>

            <section className='c-product-display__section' aria-label='Product Information'>
              <h3>Product Information</h3>
              { product.meta_data.eu.description }
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
