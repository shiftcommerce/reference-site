// Libraries
import React, { PureComponent, Fragment } from 'react'
import format from 'date-fns/format'
import t from 'typy'

// Lib
import { fulfillmentStatus } from '../../lib/fulfillment-status'
import { penceToPounds } from '../../lib/pence-to-pounds'

export class OrderList extends PureComponent {
  constructor (props) {
    super(props)

    this.headers = props.headers || ['Order No.', 'Order Date', 'Cost', 'Shipping Status', '']
  }

  /**
  * Render the order details
  * @param  {Object} order
  * @param  {Object} orderDate
  * @param  {Object} total
  * @return {string} - HTML markup for the component
  */
  renderOrderDetails (order) {
    const { updateCurrentOrder } = this.props

    const orderDate = format(new Date(order.placed_at), 'D MMM YYYY')
    const orderTotal = penceToPounds(t(order, 'pricing.total_inc_tax').safeObject)

    return [
      {
        label: this.headers[0],
        value: order.reference
      },
      {
        label: this.headers[1],
        value: orderDate
      },
      {
        label: this.headers[2],
        value: `${order.pricing.currency}${orderTotal}`
      },
      {
        label: this.headers[3],
        value: fulfillmentStatus(order.fulfillment_status)
      },
      {
        label: this.headers[4],
        value: <a href={`/account/orders/${order.reference}`} className='o-button o-button--primary' onClick={(event) => updateCurrentOrder(event, order.reference)}>View Details</a>
      }
    ].map((column, columnIndex) => {
      return (
        <div
          key={columnIndex}
          className='c-order-history-table__col'
        >
          { column.label && <span className='c-order-history-table__label'>{ column.label }</span> }
          { column.value }
        </div>
      )
    })
  }

  /**
  * Render the header for the order list
  * @param  {Object} order
  * @param  {Object} orderDate
  * @param  {Object} total
  * @return {string} - HTML markup for the component
  */
  renderOrderHeader (order, orderDate, total) {
    return (
      <Fragment>
        <h4>{ orderDate } - { order.reference } - £{ total }</h4>
        <label htmlFor={order.reference} className='c-order-history__header-label' />
        <input type='checkbox' id={order.reference} />
        <span className='c-order-history__arrow' />
      </Fragment>
    )
  }

  renderTableHeader () {
    return this.headers.map((column, columnIndex) => {
      return (
        <div
          key={columnIndex}
          className='c-order-history-table__col c-order-history-table__col--header'
        >
          { column }
        </div>
      )
    })
  }

  render () {
    const { orders } = this.props

    return (
      <div className='c-order-history-table'>
        <div className='c-order-history-table__row c-order-history-table__row--header'>
          { this.renderTableHeader() }
        </div>
        { orders.data.map((order) => {
          return (
            <div
              key={order.id}
              className='c-order-history-table__row c-order-history-table__row--body'
            >
              { this.renderOrderDetails(order) }
            </div>
          )
        }) }
      </div>
    )
  }
}
