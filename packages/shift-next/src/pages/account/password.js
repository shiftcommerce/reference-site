// Libraries
import React, { Component } from 'react'

// Components
import { AccountPassword } from '@shiftcommerce/shift-react-components/src/components/account/password'

// Actions
import { updateCustomerPassword } from '../../actions/account-actions'
export class AccountPasswordPage extends Component {
  handleUpdatePasswordSubmit () {
    this.props.dispatch(updateCustomerPassword()).then(success => {

    })
  }

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
