// Libraries
import React, { Component } from 'react'

// Components
import { AccountPassword } from '@shiftcommerce/shift-react-components/src/components/account/password'

export class AccountPasswordPage extends Component {
  render () {
    const { layout } = this.props
    const Layout = layout.component
    return (
      <Layout {...layout.props}>
        <AccountPassword />
      </Layout>
    )
  }
}
