// Libraries
import { Component } from 'react'
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement
} from 'react-stripe-elements'

class StripeCardFields extends Component {
  render () {
    return <div>
      <label>
        Credit / Debit Card Number *
        <CardNumberElement className='o-form__input-field' />
      </label>
      <div className='o-flex o-flex__space-between'>
        <div className='o-flex-full-width-s'>
          <label aria-label='Card expiry date'>
            Expiration *
            <CardExpiryElement className='o-form__input-field c-card-expiry-field' />
          </label>
        </div>
        <div className='o-flex-full-width-s'>
          <label aria-label='CVV security code'>
            CVV *
            <CardCVCElement className='o-form__input-field c-cvv-field' />
          </label>
        </div>
      </div>
    </div>
  }
}

export default injectStripe(StripeCardFields)
