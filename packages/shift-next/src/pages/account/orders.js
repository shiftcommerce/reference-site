// Libraries
import React, { Component } from 'react'

// Components
import { AccountOrders } from '@shiftcommerce/shift-react-components'

class AccountOrdersPage extends Component {
  render () {
    const { layout } = this.props
    const Layout = layout.component
    return (
      <Layout {...layout.props}>
        <AccountOrders />
      </Layout>
    )
  }
}

export default AccountOrdersPage
