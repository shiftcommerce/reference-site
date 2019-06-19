// Libraries
import React, { Component } from 'react'

// Components
import { AccountOrders } from '@shiftcommerce/shift-react-components/src/components/account/orders'

// Actions
import { getCustomerOrders } from '../../actions/account-actions'

export class AccountOrdersPage extends Component {
  fetchOrders () {
    this.props.dispatch(getCustomerOrders())
  }

  render () {
    const { layout, orders } = this.props
    const Layout = layout.component

    return (
      <Layout {...layout.props}>
        <AccountOrders orders={orders} fetchOrders={this.fetchOrders.bind(this)} />
      </Layout>
    )
  }
}
