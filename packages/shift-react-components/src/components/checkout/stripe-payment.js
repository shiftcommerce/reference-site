// Libraries
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Lib
import { AddressBook } from './address-book'
import { AddressForm } from './address-form'
import { Button } from '../../objects/button'
import Checkbox from '../../objects/checkbox'
import StripeWrapper from './stripe-wrapper'

export default class StripePayment extends Component {
  constructor (props) {
    super(props)

    this.state = {
      stripeFormComplete: false
    }

    this.setStripeFormComplete = this.setStripeFormComplete.bind(this)
  }

  renderFormSubmitButton () {
    return (
      <div className='o-form__input-group'>
        <Button
          aria-label='Review Your Order'
          className='c-address-form__button o-button--sml'
          label='Review Your Order'
          status={(this.state.stripeFormComplete ? 'positive' : 'disabled')}
          type='primary'
          disabled={!this.state.stripeFormComplete}
          onClick={() => this.props.nextSection('complete')}
        />
      </div>
    )
  }

  setStripeFormComplete (value) {
    this.setState({
      stripeFormComplete: value
    })
  }

  render () {
    const {
      addressBook,
      autoFillAddress,
      billingAddress,
      billingAsShipping,
      cardTokenRequested,
      changeBillingAsShipping,
      checkout,
      countries,
      currentAddress,
      loggedIn,
      onAddressDeleted,
      onBlur,
      onChange,
      onShowField,
      onCardTokenReceived,
      setCardErrors,
      shippingAddress
    } = this.props

    return (
      <>
        <div className='o-form__background'>
          <div className='o-form__wrapper'>
            <StripeWrapper
              billingAddress={checkout.billingAddress}
              cardTokenRequested={cardTokenRequested}
              onCardTokenReceived={onCardTokenReceived}
              setCardErrors={setCardErrors}
              setStripeFormComplete={this.setStripeFormComplete}
            />

            <div className='o-form__input-group'>
              <label>Billing address *</label>
            </div>

            <Checkbox
              type='checkbox'
              label='Same as shipping address'
              name='shippingAddressAsBillingAddress'
              checked={billingAsShipping}
              onChange={changeBillingAsShipping}
            />

            { billingAsShipping &&
              <div aria-label='Shipping address to be used for billing' className='o-payment-method__address-summary  c-payment-method__address-summary'>
                <p className='u-bold'>{ `${shippingAddress.first_name} ${shippingAddress.last_name}` }</p>
                <p>{ shippingAddress.address_line_1 }</p>
                <p>{ shippingAddress.address_line_2 }</p>
                <p>{ shippingAddress.city }</p>
                <p>{ shippingAddress.postcode }</p>
              </div>
            }
          </div>
        </div>

        { !billingAsShipping &&
          <>
            { addressBook.length > 0 && <AddressBook
              addressBook={addressBook}
              formName='shippingAddress'
              currentAddressId={billingAddress.id}
              onAddressDeleted={onAddressDeleted}
              onNewAddress={this.props.onNewAddress}
              onBookAddressSelected={this.props.onBookAddressSelected}
              addressFormDisplayed={this.props.addressFormDisplayed()}
            /> }
            { this.props.addressFormDisplayed() && <AddressForm
              aria-label='Billing address form'
              autoFillAddress={autoFillAddress}
              checkout={checkout}
              countries={countries}
              currentAddress={currentAddress}
              title='Billing Address'
              formName='billingAddress'
              onChange={onChange}
              onBlur={onBlur}
              className='o-form__billing'
              onShowField={onShowField}
              loggedIn={loggedIn}
            /> }
          </>
        }
        { this.renderFormSubmitButton() }
      </>
    )
  }
}

StripePayment.propTypes = {
  addressBook: PropTypes.arrayOf(PropTypes.object),
  addressFormDisplayed: PropTypes.func,
  autoFillAddress: PropTypes.func,
  billingAddress: PropTypes.object,
  billingAsShipping: PropTypes.bool,
  cardTokenRequested: PropTypes.bool,
  changeBillingAsShipping: PropTypes.func,
  checkout: PropTypes.object,
  countries: PropTypes.arrayOf(PropTypes.object),
  currentAddress: PropTypes.object,
  loggedIn: PropTypes.bool,
  nextSection: PropTypes.func,
  nextStepAvailable: PropTypes.func,
  onAddressDeleted: PropTypes.func,
  onBookAddressSelected: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onNewAddress: PropTypes.func,
  onShowField: PropTypes.func,
  onCardTokenReceived: PropTypes.func,
  setCardErrors: PropTypes.func,
  shippingAddress: PropTypes.object
}
