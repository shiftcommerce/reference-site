// Libraries
import React, { Component } from 'react'
import Sticky from 'react-stickyfill'

// Lib
import { decimalPrice } from '../../lib/decimal-price'
import Config from '../../lib/config'

// Objects
import link from '../../objects/link'
import { Image } from '../../objects/image'

const Link = Config.get().Link || link

export class OrderSummary extends Component {
  /**
  * Render line item image for the order summary
  * @param  {Object} lineItem
  * @return {string} - HTML markup for the component
  */
  renderLineItemImage (lineItem) {
    if (lineItem.imageUrl) {
      return (
        <Link href={`/slug?slug=${lineItem.slug}`} as={`${lineItem.canonical_path}`} >
          <Image src={lineItem.imageUrl} alt={lineItem.title} aria-label={lineItem.title} />
        </Link>
      )
    } else {
      return (
        <Image src='/static/placeholder.png' alt={lineItem.title} aria-label={lineItem.title} />
      )
    }
  }

  /**
  * Render the line item title for the order summary
  * @param  {Object} lineItem
  * @return {string} - HTML markup for the component
  */
  renderLineItemTitle (lineItem) {
    return (
      <>
        <p className='c-order__summary-line-item-details-title u-bold'>
          { lineItem.title }
        </p>
        <p className='c-order__summary-line-item-details-sku'>
          { lineItem.sku }
        </p>
      </>
    )
  }

  /**
  * Render the line-item meta-data for the order summary
  * @param  {Object} _lineItem
  * @return {string} - HTML markup for the component
  */
  renderLineItemParams (_lineItem) {
    // @TODO: to update this with actual metadata
    const metaData = { colour: 'Grey', size: 'L', quantity: 1 }
    return (
      Object.keys(metaData).map((key, index) =>
        <div className='c-order__summary-line-item-details-param' key={key}>
          <div className='c-order__summary-line-item-details-param-key'>
            <p>{ key }:</p>
          </div>
          <div className='c-order__summary-line-item-details-param-value'>
            <p>{ metaData[key] }</p>
          </div>
        </div>
      )
    )
  }

  /**
  * Render the line items for the order summary
  * @param  {Object} order
  * @return {string} - HTML markup for the component
  */
  renderLineItems (order) {
    return (
      order.line_items.map((lineItem) =>
        <div className='c-order__summary-line-item' key={lineItem.sku}>
          <div className='c-order__summary-line-item-image'>
            { this.renderLineItemImage(lineItem) }
          </div>

          <div className='c-order__summary-line-item-details'>
            { this.renderLineItemTitle(lineItem) }
            { this.renderLineItemParams(lineItem) }
          </div>
        </div>
      )
    )
  }

  /**
  * Render the total prices for the order summary
  * @param  {Object} order
  * @return {string} - HTML markup for the component
  */
  renderOrderTotals (order) {
    return (
      <Sticky>
        <div aria-label='Order total summary' className='u-sticky'>
          <div>
            <dl aria-label='Order subtotal'>
              <dt>Total products:</dt>
              <dd>&pound;{ decimalPrice(order.total_inc_tax - order.shipping_total) }</dd>
            </dl>
            <dl aria-label='Order shipping costs'>
              <dt>Shipping costs:</dt>
              <dd>&pound;{ order.shipping_total }</dd>
            </dl>
            <dl aria-label='Order total' className='u-bold'>
              <dt>TOTAL:</dt>
              <dd>&pound;{ decimalPrice(order.total_inc_tax) }</dd>
            </dl>
            <dl>
              <dt>* Including VAT</dt>
            </dl>
          </div>
        </div>
      </Sticky>
    )
  }

  render () {
    const { order } = this.props

    return (
      <div className='c-order__summary'>
        <div className='c-order__summary-header'>
          <div className='c-order__summary-header-title'>
            <h2>Your Order</h2>
          </div>

          <div className='c-order__summary-header-total'>
            <h2>&pound;{ decimalPrice(order.total_inc_tax) }</h2>
          </div>
        </div>

        { this.renderLineItems(order) }

        <div className='c-order__summary-totals'>
          { this.renderOrderTotals(order) }
        </div>
      </div>
    )
  }
}
