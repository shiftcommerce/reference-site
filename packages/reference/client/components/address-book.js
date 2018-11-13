// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'

// Action creators
import { deleteAddressBookEntry, setAddress } from '../actions/address-book-actions'

// Objects
import Button from '../objects/button'

class AddressBook extends Component {
  setAddress (e, address) {
    const { formName, dispatch, onClose } = this.props

    dispatch(setAddress(address, formName))
    onClose(e)
  }

  handleAddressDeleted (address) {
    return this.props.dispatch(deleteAddressBookEntry(address))
  }

  renderEntries () {
    const entries = this.props.addressBook

    return (
      <div className="c-address-book__entries">
        { entries.map(address => {
          return (
            <div className="c-address-book__entry" key={address.id}>
              <div className="c-address-book__address">
                { address.meta_attributes.label && <h1>{ address.meta_attributes.label.value }</h1> }
                <p>{ `${address.first_name} ${address.last_name}` }</p>
                { address.meta_attributes.company_name && <p>{ address.meta_attributes.company_name.value }</p> }
                <p>{ address.address_line_1 }</p>
                { address.address_line_2 && <p>{ address.address_line_2 }</p> }
                <p>{ address.postcode }</p>
                <p>{ address.city }</p>
                { address.state && <p>{ address.state }</p> }
                { address.meta_attributes.phone_number && <p>{ address.meta_attributes.phone_number.value }</p> }
                { address.meta_attributes.email && <p>{ address.meta_attributes.email.value }</p> }
                <p>{ address.country }</p>
              </div>
              <Button containerClassName='c-address-book__button' label='Use this address' status='primary' size='sml' onClick={(e) => { this.setAddress(e, address) }}/>
              <Button containerClassName='c-address-book__button' label='Delete' status='negative' size='sml' onClick={() => this.handleAddressDeleted(address)}/>
            </div>
          )
        }) }
      </div>
    )
  }

  render () {
    return (
      <>
        <div className="c-address-book">
          <div className="c-address-book__header">
            <h1>Select an address</h1>
            <div className="c-address-book__close" onClick={this.props.onClose}></div>
          </div>
          { this.renderEntries() }
        </div>
        <div className="c-address-book-overlay" onClick={this.props.onClose}>
        </div>
      </>
    )
  }
}

const mapStateToProps = ({ checkout: { addressBook } }) => {
  return { addressBook }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressBook)
