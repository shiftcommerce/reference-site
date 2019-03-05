// Libraries
import { Component } from 'react'

// Components
import StripePayment from './stripe-payment'

import { PaymentMethodHeader } from 'shift-react-components'

export default class PaymentMethod extends Component {
  render () {
    const {
      addingNewAddress,
      addressBookEmpty,
      addressFormDisplayed,
      autoFillAddress,
      billingAsShipping,
      changeBillingAsShipping,
      cart,
      checkout,
      countries,
      currentAddress,
      loggedIn,
      nextStepAvailable,
      nextSection,
      onBookAddressSelected,
      onBlur,
      onChange,
      onNewAddress,
      onShowField,
      onCardTokenReceived,
      setCardErrors,
      order
    } = this.props
    return (
      <div aria-label='Payment method' className='o-form  c-payment-method'>
        <PaymentMethodHeader />
        <div className='c-payment-method__section' style={{ display: 'block' }}>
          <StripePayment
            addingNewAddress={addingNewAddress}
            addressBookEmpty={addressBookEmpty}
            addressFormDisplayed={addressFormDisplayed}
            autoFillAddress={autoFillAddress}
            billingAddress={cart.billing_address}
            billingAsShipping={billingAsShipping}
            cardTokenRequested={order.cardTokenRequested}
            changeBillingAsShipping={changeBillingAsShipping}
            checkout={checkout}
            currentAddress={currentAddress}
            countries={countries}
            loggedIn={loggedIn}
            nextStepAvailable={nextStepAvailable}
            nextSection={nextSection}
            onBookAddressSelected={onBookAddressSelected}
            onBlur={onBlur}
            onChange={onChange}
            onNewAddress={onNewAddress}
            onShowField={onShowField}
            onCardTokenReceived={onCardTokenReceived}
            setCardErrors={setCardErrors}
            shippingAddress={cart.shipping_address}
          />
        </div>
      </div>
    )
  }
}
