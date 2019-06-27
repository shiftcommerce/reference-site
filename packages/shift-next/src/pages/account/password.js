// Libraries
import React, { Component } from 'react'
import Router from 'next/router'

// Components
import { AccountPassword } from '@shiftcommerce/shift-react-components/src/components/account/password'

// Actions
import { updateCustomerPassword } from '../../actions/account-actions'
export class AccountPasswordPage extends Component {

  handleUpdatePasswordSubmit (account, { setStatus, setSubmitting }) {
    const updatePasswordBody = {
      ...this.props.account,
      password: account.oldPassword,
      newPassword: account.newPassword,
      newPasswordConfirmation: account.newPasswordConfirmation
    }
    console.log('updatePasswordBody', updatePasswordBody)

    this.props.dispatch(updateCustomerPassword(updatePasswordBody))

    // this.props.dispatch(createLogin(loginBody)).then(success => {
    //   console.log(success)
    //   if (success) {
    //     return this.updateCustomerPassword({ ...this.props.account, password: account.newPassword }, { setStatus, setSubmitting })
    //   } else {
    //     // Display an error flash message
    //     setStatus('error')
    //     setTimeout(() => {
    //       // Clear flash message after 3 seconds
    //       setStatus(null)
    //       // Re-enable the submit button
    //       setSubmitting(false)
    //     }, 3000)
    //   }
    // })
  }

  render () {
    const { account, layout } = this.props
    const Layout = layout.component
    return (
      <Layout {...layout.props}>
        <AccountPassword
          {...account}
          handleSubmit={this.handleUpdatePasswordSubmit.bind(this)}
        />
      </Layout>
    )
  }
}
