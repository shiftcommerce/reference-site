// Libraries
import React, { Component } from 'react'

// Components
import { AccountPassword } from '@shiftcommerce/shift-react-components/src/components/account/password'

// Actions
import { createLogin } from '../../actions/login-actions'
import { updateCustomerAccount } from '../../actions/account-actions'
export class AccountPasswordPage extends Component {
  handleUpdatePasswordSubmit (account, { setStatus, setSubmitting }) {
    const loginBody = {
      firstName: this.props.account.firstName,
      lastName: this.props.account.lastName,
      mobilePhone: this.props.account.mobilePhone,
      email: this.props.account.email,
      password: account.oldPassword
    }
    console.log('loginBody', loginBody)

    this.props.dispatch(createLogin(loginBody)).then(success => {
      console.log(success)
    }).catch(error => { console.log('error', error) }).then(success => {
      this.props.dispatch(updateCustomerAccount({ ...this.props.account, password: account.newPassword }))
    }).catch(error => { console.log('error', error) })
      // // Display a relevant flash message
      // setStatus(success ? 'success' : 'error')
      // setTimeout(() => {
      //   // Clear flash message after 3 seconds
      //   setStatus(null)
      //   // Re-enable the submit button
      //   setSubmitting(false)
      // }, 3000)
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
