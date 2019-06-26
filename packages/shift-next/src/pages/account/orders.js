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

    this.fetchOrders = this.fetchOrders.bind(this)
    this.updateCurrentOrder = this.updateCurrentOrder.bind(this)
  }

  static async getInitialProps (appContext) {
    // extracts page number from query or set default
    return {
      pageNumber: (appContext.query.page || 1)
    }
  }

  updateCurrentOrder (event, currentOrderRef = null) {
    event.preventDefault()
    this.setState({ currentOrderRef })
  }

  /*
   * Retrieves customer orders
   * @return {Object} - orders response
   */
  fetchOrders () {
    this.props.dispatch(getCustomerOrders(this.props.pageNumber))
  }

  render () {
    const { layout, orders, pageNumber } = this.props
    const { currentOrderRef } = this.state
    const Layout = layout.component

    return (
      <Layout {...layout.props}>
        <AccountOrders
          currentOrderRef={currentOrderRef}
          fetchOrders={this.fetchOrders}
          orders={orders}
          pageNumber={pageNumber}
          pagePath={'/account/orders'}
          updateCurrentOrder={this.updateCurrentOrder}
        />
      </Layout>
    )
  }
}
