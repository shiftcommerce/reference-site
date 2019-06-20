// Libraries
import React, { Component, Fragment } from 'react'

// Lib
import Config from '../../lib/config'
import { Loading } from '../../objects/loading'
import { OrderList } from '../../components/orders/order-list'
import { OrderSingle } from '../../components/orders/order-single'

export class AccountOrders extends Component {
  constructor (props) {
    super(props)

    this.Link = Config.get().Link
  }

  componentDidMount () {
    this.props.fetchOrders()
  }

  renderOrdersList (orders) {
    if (orders.data.length === 0) {
      return (<p>No previous orders found.</p>)
    }

    return (
      <Fragment>
        <OrderList orders={orders} />
        { orders.data.map((order) => {
          return (
            <OrderSingle
              key={order.id}
              order={order}
            />
          )
        })}
      </Fragment>
    )
  }

  renderAccountBanner () {
    return (
      <div className='c-order-history__nav'>
        <h2>Order History</h2>
      </div>
    )
  }

  render () {
    const { orders, orders: { loading } } = this.props

    return (
      <div className='c-order-history'>
        { this.renderAccountBanner() }
        { loading ? <Loading /> : this.renderOrdersList(orders) }
      </div>
    )
  }
}
