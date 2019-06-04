// Libraries
import React, { Component } from 'react'

// Components
import { AccountPassword } from '@shiftcommerce/shift-react-components'

class AccountPasswordPage extends Component {
  render () {
    const { account, layout } = this.props
    const Layout = layout.component
    return (
      <Layout {...layout.props}>
        <AccountPassword />
      </Layout>
    )
  }
}

export default AccountPasswordPage
