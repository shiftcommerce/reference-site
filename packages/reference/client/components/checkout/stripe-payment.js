// Libraries
import { Component } from 'react'

// Components
import AddressBook from '../address-book'
import StripeWrapper from './stripe-wrapper'

// Objects
import { Button, Checkbox, CheckoutAddressForm } from 'shift-react-components'

class StripePayment extends Component {
  renderFormSubmitButton () {
    return (
      <div className='o-form__input-group'>
        <Button
          aria-label='Review Your Order'
          className='c-address-form__button o-button--sml'
          label='Review Your Order'
          status={(this.props.nextStepAvailable() ? 'positive' : 'disabled')}
          type='primary'
          disabled={!this.props.nextStepAvailable()}
          onClick={() => this.props.nextSection('complete')}
        />
      </div>
    )
  }

  render () {
    const {
      autoFillAddress,
      billingAddress,
      billingAsShipping,
      cardTokenRequested,
      changeBillingAsShipping,
      checkout,
      countries,
      currentAddress,
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
              cardTokenRequested={cardTokenRequested}
              onCardTokenReceived={onCardTokenReceived}
              setCardErrors={setCardErrors}
              checkout={checkout}
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
            { !this.props.addressBookEmpty() && <AddressBook
              formName='shippingAddress'
              currentAddressId={billingAddress.id}
              onNewAddress={this.props.onNewAddress}
              onBookAddressSelected={this.props.onBookAddressSelected}
              addressFormDisplayed={this.props.addressFormDisplayed()}
            /> }
            { this.props.addressFormDisplayed() && <CheckoutAddressForm
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
            /> }
          </>
        }
        { this.renderFormSubmitButton() }
      </>
    )
  }
}

export default StripePayment
