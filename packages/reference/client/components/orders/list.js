// Libraries
import { PureComponent } from 'react'
import dateFns from 'date-fns'
import t from 'typy'

// Components
import LineItems from './line-items'
import ShippingAddresses from './shipping-addresses'

// Lib
import { penceToPounds } from '../../lib/pence-to-pounds'

class OrderList extends PureComponent {
  renderShippingTotal (order) {
    const shippingTotal = order.shipping_methods.reduce(
      (accumulator, currentValue) => accumulator + currentValue.price, 0
    )

    return penceToPounds(shippingTotal)
  }

  renderOrderSummary (order, orderDate, total) {
    return (
      <div className='c-order-history__order-summary'>
        <div className='c-order-history__order-summary_params'>
          <p className='u-bold u-inline-block'>Date of Order: </p>
          <a className='u-inline-block'>{ orderDate }</a>
        </div>
        <div className='c-order-history__order-summary_params'>
          <p className='u-bold u-inline-block'>Items: </p>
          <a className='u-inline-block'>{ order.line_items.length }</a>
        </div>
        <div className='c-order-history__order-summary_params'>
          <p className='u-bold u-inline-block'>Order Number: </p>
          <a className='u-inline-block'>{ order.reference }</a>
        </div>
        <div className='c-order-history__order-summary_params'>
          <p className='u-bold u-inline-block'>Total: </p>
          <a className='u-inline-block'>&pound;{ total }</a>
        </div>
      </div>
    )
  }

  renderOrderDetails (order, orderDate, total) {
    return (
      <div className='c-order-history__details'>
        { this.renderOrderSummary(order, orderDate, total) }
        <LineItems items={order.line_items} />
        <div className='c-order-history__totals'>
          <p>Shipping: &pound;{ this.renderShippingTotal(order) } </p>
          <p className='u-bold'>Total: &pound;{ total }</p>
        </div>
        <h3>Shipping Details</h3>
        <ShippingAddresses addresses={order.shipping_addresses} />
      </div>
    )
  }

  renderOrderHeader (order, orderDate, total) {
    return (
      <>
        <h4>{ orderDate } - { order.line_items.length } - { order.reference } - &pound;{ total }</h4>
        <label htmlFor={order.reference} className='c-order-history__header-label' />
        <input type='checkbox' id={order.reference} />
        <span className='c-order-history__arrow' />
      </>
    )
  }

  render () {
    const { orders } = this.props

    return (
      <>
        { orders.data.map((order) => {
          const orderDate = dateFns.format(new Date(order.placed_at), 'MMM D, YYYY')
          const total = penceToPounds(t(order, 'pricing.total_inc_tax').safeObject)

          return (
            <div className='c-order-history__header' key={order.id}>
              { this.renderOrderHeader(order, orderDate, total) }
              { this.renderOrderDetails(order, orderDate, total) }
            </div>
          )
        }) }
      </>
    )
  }
}

export default OrderList
