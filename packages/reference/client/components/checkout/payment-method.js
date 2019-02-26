// Libraries
import { Component } from 'react'

// Components
import PaymentMethodSelector from './payment-method-selector'
import StripePayment from './stripe-payment'
import PaymentMethodHeader from './payment-method-header'
import PayPalPayment from './paypal-payment'

export default class PaymentMethod extends Component {
  renderPaymentMethodSelector () {
    const { onPaymentMethodChanged, selectedPaymentMethod } = this.props

    return (
      <div className='c-payment-method__section' style={{ display: 'block' }}>
        <PaymentMethodSelector
          currentMethod={selectedPaymentMethod}
          onPaymentMethodChanged={onPaymentMethodChanged}
        />
        { (() => {
          switch (selectedPaymentMethod) {
            case 'card':
              const {
                addingNewAddress,
                addressBookEmpty,
                addressFormDisplayed,
                billingAsShipping,
                changeBillingAsShipping,
                cart,
                checkout,
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
              return <StripePayment
                addingNewAddress={addingNewAddress}
                addressBookEmpty={addressBookEmpty}
                addressFormDisplayed={addressFormDisplayed}
                billingAddress={cart.billing_address}
                billingAsShipping={billingAsShipping}
                cardTokenRequested={order.cardTokenRequested}
                changeBillingAsShipping={changeBillingAsShipping}
                checkout={checkout}
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
            case 'paypal':
              return <PayPalPayment />
          }
        })() }
      </div>
    )
  }

  render () {
    return (
      <div aria-label='Payment method' className='o-form  c-payment-method'>
        <PaymentMethodHeader />
        { this.renderPaymentMethodSelector() }
      </div>
    )
  }
}
