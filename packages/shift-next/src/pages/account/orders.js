// Libraries
import React, { Component } from 'react'

// Components
import { AccountOrders } from '@shiftcommerce/shift-react-components'
// Actions
import { getCustomerOrders } from '../../actions/account-actions'

class AccountOrdersPage extends Component {
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

export default AccountOrdersPage
