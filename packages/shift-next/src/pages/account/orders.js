// Libraries
import React, { Component } from 'react'

// Components
import { AccountOrders } from '@shiftcommerce/shift-react-components/src/components/account/orders'

// Actions
import { getCustomerOrders } from '../../actions/account-actions'

export class AccountOrdersPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentOrderRef: null
    }

    this.updateCurrentOrder = this.updateCurrentOrder.bind(this)
  }

  static buildAlgoliaStates () {
    return {}
  }

  updateCurrentOrder (event, currentOrderRef = null) {
    event.preventDefault()
    this.setState({ currentOrderRef })
  }

  fetchOrders () {
    this.props.dispatch(getCustomerOrders())
  }

  render () {
    const { layout, orders } = this.props
    const { currentOrderRef } = this.state
    const Layout = layout.component

    return (
      <Layout {...layout.props}>
        <AccountOrders
          currentOrderRef={currentOrderRef}
          fetchOrders={this.fetchOrders.bind(this)}
          orders={orders}
          updateCurrentOrder={this.updateCurrentOrder}
        />
      </Layout>
    )
  }
}
