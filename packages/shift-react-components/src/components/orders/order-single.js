// Libraries
import React, { PureComponent, Fragment } from 'react'
import format from 'date-fns/format'

// Lib
import { penceToPounds } from '../../lib/pence-to-pounds'

// Components
import ShippingAddresses from './shipping-addresses'
import { LineItems } from '../cart/line-items'

import Link from '../../objects/link'

export class OrderSingle extends PureComponent {
  /**
   * Calculate the subtotal based on each line item price
   * @param  {Object} order
   * @return {Number}
   */
  calculateSubTotal (order) {
    return order.line_items.reduce(
      (accumulator, currentValue) => accumulator + currentValue.pricing.line_total_inc_tax, 0
    )
  }

  /**
   * Render the total shipping costs in the order list
   * @param  {Object} order
   * @return {string} - HTML markup for the component
   */
  calculateShippingTotal (order) {
    return order.shipping_methods.reduce(
      (accumulator, currentValue) => accumulator + currentValue.price, 0
    )
  }

  /**
   * Get the tax amount based on the totals
   * @param  {Object} order
   * @return {Number}
   */
  calculateTax (order) {
    return order.pricing.total_inc_tax - order.pricing.total_ex_tax
  }

  /**
   * Reformat the line items to they'll work with the <LineItems /> component
   * @param  {Array} lineItems
   * @return {Array}
   */
  formatLineItems (lineItems) {
    return lineItems.map((lineItem, lineItemIndex) => {
      return {
        id: lineItemIndex,
        item: {
          sku: lineItem.sku,
          title: 'item title',
          picture_url: lineItem.image_urls[0],
          product: {
            title: 'product title',
            slug: 'slug'
          }
        },
        unit_quantity: lineItem.quantity,
        total: (lineItem.pricing.line_total_inc_tax / 100),
        sub_total: (lineItem.pricing.line_total_inc_tax / 100)
      }
    })
  }

  /**
   * Render each part of the order items
   * @param  {String}                 options.header
   * @param  {String|Number|Element0} options.body
   * @return {String} - HTML markup for the component
   */
  renderItem ({ header, body }) {
    return (
      <Fragment>
        { header && <h5 className='c-order-single__header'>{ header }</h5> }
        { body && <div className='c-order-single__body'>{ body }</div> }
      </Fragment>
    )
  }

  render () {
    const { order } = this.props
    const lineItems = this.formatLineItems(order.line_items)

    const items = [{
      header: 'Order No.',
      body: order.reference
    }, {
      header: 'Order Date',
      body: format(new Date(order.placed_at), 'MMM D, YYYY')
    }, {
      header: 'Cost',
      body: `&pound;${penceToPounds(order.pricing.total_inc_tax)}`
    }, {
      header: 'Shipping Method',
      body: order.shipping_methods[0].label
    }, {
      header: 'Billing Address',
      body: <ShippingAddresses addresses={order.shipping_addresses} />
    }, {
      header: 'Shipping Address',
      body: <ShippingAddresses addresses={order.shipping_addresses} />
    }, {
      header: 'Currency',
      body: order.pricing.currency
    }]

    return (
      <Fragment>
        <div className='c-order-history__nav'>
          <h2>Order { order.reference }</h2>
        </div>
        <div className='c-order-single'>
          { items.map((item, itemIndex) => {
            return (
              <div key={itemIndex} className='c-order-single__item'>
                { this.renderItem(item) }
              </div>
            )
          }) }
          <div className='c-order-single__item c-order-single__item--full'>
            <h5 className='c-order-single__header'>Order Summary</h5>
            <div className='c-order-single__body'>
              <div className='o-grid-container'>
                <div className='o-col-1-7'>
                  <LineItems
                    lineItems={lineItems}
                    lineItemsCount={lineItems.length}
                  />
                </div>
                <div className='o-col-8-13'>
                  <div className='c-cart-summary'>
                    <dl aria-label='Subtotal'>
                      <dt> Subtotal: </dt>
                      <dd> &pound;{ penceToPounds(this.calculateSubTotal(order)) } </dd>
                    </dl>
                    <dl aria-label='Taxes'>
                      <dt> UK VAT 20% (Included in Price): </dt>
                      <dd> &pound;{ penceToPounds(this.calculateTax(order)) } </dd>
                    </dl>
                    <dl aria-label='Shipping'>
                      <dt> Shipping Total: </dt>
                      <dd> &pound;{ penceToPounds(this.calculateShippingTotal(order)) } </dd>
                    </dl>
                    <dl aria-label='Total' className='c-cart-summary__total'>
                      <dt> Total: </dt>
                      <dd> &pound;{ penceToPounds(order.pricing.total_inc_tax) } </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='c-order-single__item c-order-single__item--full'>
            <div className='c-order-single__body'>
              <Link href='/account/orders' className='o-button o-button--primary'>View all orders</Link>
            </div>
          </div>

        </div>
      </Fragment>
    )
  }
}
