import { PureComponent } from 'react'
import Link from 'next/link'
import t from 'typy'

// Lib
import { penceToPounds } from '../../lib/pence-to-pounds'

// Objects
import Image from '../../objects/image'

class LineItems extends PureComponent {
  renderTotal (lineItem) {
    const total = t(lineItem, 'pricing.line_inc_tax').safeObject

    return (
      <div className='c-order-history__line-items_grid_item4'>
        <div className='c-order-history__line-items_total-wrapper'>
          <a className='c-order-history__line-items_total'>&pound;{ penceToPounds(total) }</a>
        </div>
      </div>
    )
  }

  renderImage (lineItem) {
    if (lineItem.imageUrl) {
      return (
        <Link href={`/slug?slug=${lineItem.slug}`} as={`${lineItem.canonical_path}`} key={lineItem.slug}>
          <Image className='c-order-history__line-items_image' src={lineItem.imageUrl} alt={lineItem.title} key={lineItem.slug} aria-label={lineItem.title} />
        </Link>
      )
    } else {
      return (
        <Image className='c-order-history__line-items_image' src='/static/placeholder.png' alt={lineItem.title} key={lineItem.slug} aria-label={lineItem.title} />
      )
    }
  }

  renderTitle (lineItem) {
    return (
      <div className='c-order-history__line-items_grid_item2'>
        <div className='c-order-history__line-items_details'>
          <h5 className='c-order-history__line-items_details_title u-bold'>
            { lineItem.sku }
          </h5>
          <div className='c-order-history__line-items_details_sku'>
            <span>
              { lineItem.sku }
            </span>
          </div>
        </div>
      </div>
    )
  }

  renderParams (lineItem) {
    const deliveryMethod = t(lineItem, 'shipping_method.label').safeObject
    const customerName = t(lineItem, 'shipping_address.name').safeObject

    return (
      <>
        <div className='c-order-history__line-items_grid_item3'>
          <div className='c-order-history__line-items_params u-bold'>
            <span>Quantity: </span>
          </div>
          <div className='c-order-history__line-items_params u-bold'>
            <span>Delivery: </span>
          </div>
          <div className='c-order-history__line-items_params u-bold'>
            <span>Address: </span>
          </div>
        </div>
        <div className='c-order-history__line-items_grid_item3'>
          <span className='c-order-history__line-items_space'>{ lineItem.quantity }</span>
          <span className='c-order-history__line-items_space'>{ deliveryMethod }</span>
          <span className='c-order-history__line-items_space'>{ customerName }</span>
        </div>
      </>
    )
  }

  renderLineItems () {
    const { items } = this.props

    return (
      items.map((lineItem, index) =>
        <div className='c-order-history__line-items_grid' key={lineItem.sku}>
          <div className='c-order-history__line-items_grid_item1'>
            { this.renderImage(lineItem) }
          </div>
          { this.renderTitle(lineItem) }
          { this.renderParams(lineItem) }
          { this.renderTotal(lineItem) }
        </div>
      )
    )
  }

  render () {
    return (
      <div className='c-order-history__line-items'>
        <h3 className='c-order-history__line-items_title'>Products</h3>
        { this.renderLineItems() }
      </div>
    )
  }
}

export default LineItems
