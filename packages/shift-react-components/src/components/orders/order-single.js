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

  calculateTax (order) {
    return order.pricing.total_inc_tax - order.pricing.total_ex_tax
  }

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

  render () {
    const { order } = this.props
    const lineItems = this.formatLineItems(order.line_items)

    return (
      <Fragment>
        <div className='c-order-history__nav'>
          <h2>Order { order.reference }</h2>
        </div>
        <div className='c-order-single'>
          <div className='c-order-single__item'>
            <h5 className='c-order-single__header'>Order No.</h5>
            <div className='c-order-single__body'>{ order.reference }</div>
          </div>
          <div className='c-order-single__item'>
            <h5 className='c-order-single__header'>Order Date</h5>
            <div className='c-order-single__body'>{ format(new Date(order.placed_at), 'MMM D, YYYY') }</div>
          </div>
          <div className='c-order-single__item'>
            <h5 className='c-order-single__header'>Cost</h5>
            <div className='c-order-single__body'>&pound;{ penceToPounds(order.pricing.total_inc_tax) }</div>
          </div>
          <div className='c-order-single__item'>
            <h5 className='c-order-single__header'>Shipping Method</h5>
            <div className='c-order-single__body'>{ order.shipping_methods[0].label }</div>
          </div>
          <div className='c-order-single__item'>
            <h5 className='c-order-single__header'>Billing Address</h5>
            <div className='c-order-single__body'>
              <ShippingAddresses addresses={order.shipping_addresses} />
            </div>
          </div>
          <div className='c-order-single__item'>
            <h5 className='c-order-single__header'>Shipping Address</h5>
            <div className='c-order-single__body'>
              <ShippingAddresses addresses={order.shipping_addresses} />
            </div>
          </div>
          <div className='c-order-single__item'>
            <h5 className='c-order-single__header'>Currency</h5>
            <div className='c-order-single__body'>
              { order.pricing.currency }
            </div>
          </div>
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
