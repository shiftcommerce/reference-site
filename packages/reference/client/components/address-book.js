// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'

// Action creators
import { deleteAddressBookEntry, setAddress } from '../actions/address-book-actions'
import { editForm } from '../actions/checkout-actions'

class AddressBook extends Component {
  setAddress (address) {
    const { formName, dispatch } = this.props

    dispatch(setAddress(address, formName))
  }

  handleAddressDeleted (address) {
    return this.props.dispatch(deleteAddressBookEntry(address))
  }

  createNewAddress () {
    const { formName, dispatch, onToggleCollapsed } = this.props
    onToggleCollapsed('edit', formName)
    dispatch(editForm(formName))
  }

  renderOptions (address) {
    const { id } = this.props
    const optionLabel = <a><b>{ address.meta_attributes.label.value }</b> -&nbsp; { address.first_name } { address.last_name },&nbsp;
      { address.address_line_1 },&nbsp; { address.postcode },&nbsp; { address.city },&nbsp; { address.country }
    </a>

    return (
      <div className='c-address-book__radio-container'>
        <input type='radio' name='address-book-radio' className='c-address-book__radio' onChange={() => { this.setAddress(address) }} checked={address.id === id} />
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
    const { formName } = this.props

    return (
      <div className='c-address-book'>
        <h3>Your addresses</h3>
        { this.renderEntries() }
        <a className='c-address-book__new-address' onClick={() => this.createNewAddress(formName)}>+ Add a new address</a>
      </div>
    )
  }
}

const mapStateToProps = ({ checkout: { addressBook, shippingAddress: { id } } }) => {
  return { addressBook, id }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressBook)
