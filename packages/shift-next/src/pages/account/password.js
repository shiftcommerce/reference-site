// Libraries
import React, { Component } from 'react'

// Components
import { AccountPassword } from '@shiftcommerce/shift-react-components'

import MyAccountLayout from '../../layouts/my-account'

class AccountPasswordPage extends Component {
  render () {
    const { menu } = this.props
    return (
      <MyAccountLayout menu={menu}>
        <AccountPassword />
      </MyAccountLayout>
    )
  }
}

export default AccountPasswordPage
