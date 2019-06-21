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
    const { currentOrderRef, updateCurrentOrder } = this.props

    if (orders.data.length === 0) {
      return (<p>No previous orders found.</p>)
    }

    if (currentOrderRef) {
      const currentOrder = orders.data.find((order) => {
        return order.reference === currentOrderRef
      })

      return (
        <OrderSingle
          order={currentOrder}
          updateCurrentOrder={updateCurrentOrder}
        />
      )
    }

    return (
      <Fragment>
        <div className='c-order-history__nav'>
          <h2>Order History</h2>
        </div>
        <OrderList
          orders={orders}
          updateCurrentOrder={updateCurrentOrder}
        />
      </Fragment>
    )
  }

  render () {
    const { orders, orders: { loading } } = this.props

    return (
      <div className='c-order-history'>
        { loading ? <Loading /> : this.renderOrdersList(orders) }
      </div>
    )
  }
}
