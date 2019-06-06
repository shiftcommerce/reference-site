// Libraries
import React, { Component } from 'react'

// Components
import { AccountAddresses } from '@shiftcommerce/shift-react-components/src/components/account/addresses'
// Actions
import { deleteAddressBookEntry, fetchAddressBook, saveToAddressBook, updateAddress } from '../../actions/address-book-actions'

// Json
import countries from '../../static/countries.json'

export class AccountAddressesPage extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.props.dispatch(fetchAddressBook())
  }

  onBookAddressSelected (id) {
    this.setState({
      addingNewAddress: false,
      currentAddressId: id
    })
  }

  onNewAddress () {
    this.setState({
      addingNewAddress: true,
      currentAddressId: null
    })
  }

  parseFormAddress (form) {
    return {
      first_name: form.firstName,
      last_name: form.lastName,
      line_1: form.addressLine1,
      line_2: form.addressLine2,
      city: form.city,
      state: form.county,
      country_code: form.countryCode,
      zipcode: form.postcode,
      preferred_billing: form.preferredBilling || false,
      preferred_shipping: form.preferredShipping || false,
      label: form.label,
      companyName: form.company,
      primary_phone: form.phone,
      email: form.email
    }
  }

  onAddressCreated (form, { setStatus, setSubmitting }) {
    return this.props.dispatch(saveToAddressBook(this.parseFormAddress(form))).then(success => {
      if (success) {
        this.props.dispatch(fetchAddressBook())
        this.setState({
          addingNewAddress: false
        })
      }
      window.scrollTo(0, 0)
      setStatus(success ? 'success-created' : 'error')
      setTimeout(() => {
        // Clear flash message after 3 seconds
        setStatus(null)
        // Re-enable the submit button
        setSubmitting(false)
      }, 3000)
    })
  }

  onAddressUpdated (form, { setStatus, setSubmitting }) {
    return this.props.dispatch(updateAddress(this.state.currentAddressId, this.parseFormAddress(form))).then(success => {
      if (success) {
        this.props.dispatch(fetchAddressBook()).then(() => {
          setStatus('success-updated')
        })
      } else {
        setStatus('error')
      }
      window.scrollTo(0, 0)
      setTimeout(() => {
        // Clear flash message after 3 seconds
        setStatus(null)
        // Re-enable the submit button
        setSubmitting(false)
      }, 3000)
    })
  }

  onAddressDeleted (address) {
    this.props.dispatch(deleteAddressBookEntry(address))
  }

  render () {
    const { layout, addressBook } = this.props
    const { addingNewAddress, currentAddressId } = this.state
    const Layout = layout.component

    return (
      <Layout {...layout.props}>
        <AccountAddresses
          addingNewAddress={addingNewAddress}
          addressBook={addressBook}
          countries={countries}
          currentAddress={currentAddressId && addressBook.find(a => a.id === currentAddressId)}
          onBookAddressSelected={this.onBookAddressSelected.bind(this)}
          onNewAddress={this.onNewAddress.bind(this)}
          onAddressCreated={this.onAddressCreated.bind(this)}
          onAddressDeleted={this.onAddressDeleted.bind(this)}
          onAddressUpdated={this.onAddressUpdated.bind(this)} />
      </Layout>
    )
  }
}
