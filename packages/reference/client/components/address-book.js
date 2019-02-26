// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'

// Action creators
import { deleteAddressBookEntry } from '../actions/address-book-actions'

export class AddressBook extends Component {
  handleAddressDeleted (address) {
    return this.props.dispatch(deleteAddressBookEntry(address))
  }

  renderOptions (address) {
    const { currentAddressId, addressFormDisplayed, onBookAddressSelected } = this.props
    const addressLabel = typeof address.meta_attributes.label === 'undefined' ? 'Other' : address.meta_attributes.label.value
    const optionLabel = <a><b>{ addressLabel }</b> -&nbsp; { address.first_name } { address.last_name },&nbsp;
      { address.address_line_1 },&nbsp; { address.postcode },&nbsp; { address.city },&nbsp; { address.country }
    </a>

    return (
      <div className='c-address-book__radio-container'>
        <input type='radio' name='address-book-radio' className='c-address-book__radio' onChange={() => onBookAddressSelected(address.id)} checked={!addressFormDisplayed && address.id === currentAddressId} />
        <label htmlFor={address.id}>{ optionLabel }</label>
        <a className='c-address-book__delete-address' label='Delete' onClick={() => this.handleAddressDeleted(address)}>Delete</a>
      </div>
    )
  }

  renderEntries () {
    // Sort array of objects and return a new array
    // with the preferred address as the first object.
    // We always want to display the preferred-address as the first option
    const entries = this.props.addressBook.sort(function (a, b) {
      return b.preferred_shipping - a.preferred_shipping
    })

    return (
      <div className='c-address-book__entries'>
        { entries.map(address => {
          return (
            <div key={address.id}>
              { this.renderOptions(address) }
            </div>
          )
        }) }
      </div>
    )
  }

  render () {
    const { onNewAddress, addressFormDisplayed } = this.props

    return (
      <div className='c-address-book'>
        <h3>Your addresses</h3>
        { this.renderEntries() }
        { !addressFormDisplayed && <a className='c-address-book__new-address' onClick={onNewAddress}>+ Add a new address</a> }
      </div>
    )
  }
}

const mapStateToProps = ({ checkout: { addressBook } }) => {
  return { addressBook }
}

export default connect(mapStateToProps)(AddressBook)
