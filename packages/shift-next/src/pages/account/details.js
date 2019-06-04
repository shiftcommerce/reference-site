// Libraries
import React, { Component } from 'react'

// Components
import { AccountDetails } from '@shiftcommerce/shift-react-components'

// Actions
import { updateCustomerAccount } from '../../actions/account-actions'

class AccountDetailsPage extends Component {
  handleUpdateDetailsSubmit (details, { setStatus, setSubmitting }) {
    this.props.dispatch(updateCustomerAccount(details)).then(success => {
      // Display a relevant flash message
      setStatus(success ? 'success' : 'error')
      setTimeout(() => {
        // Clear flash message after 3 seconds
        setStatus(null)
        // Re-enable the submit button
        setSubmitting(false)
      }, 3000)
    })
  }

  render () {
    const { account, layout } = this.props
    const Layout = layout.component

    return (
      <Layout { ...layout.props } >
        <AccountDetails
          {...account}
          handleSubmit={this.handleUpdateDetailsSubmit.bind(this)}
        />
      </Layout>
    )
  }
}

export default AccountDetailsPage
