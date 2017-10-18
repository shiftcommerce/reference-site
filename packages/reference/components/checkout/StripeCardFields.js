// Libraries
import { Component } from 'react'
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement
} from 'react-stripe-elements'

import classNames from 'classnames'

class StripeCardFields extends Component {
  constructor () {
    super()

    this.state = {
      errors: {
        CardNumberElement: '',
        CardExpiryElement: '',
        CardCVCElement: ''
      }
    }
  }

  handleChange (fieldName, e) {
    let errorMessage = (e.error ? e.error.message : '')

    this.setState({
      errors: Object.assign(this.state.errors, { [fieldName]: errorMessage })
    })
  }

  renderValidationMessageFor (fieldName) {
    let errorMessage = this.state.errors[fieldName]

    return (
      errorMessage ? <div className='o-form__input-field__error'>{ errorMessage }</div> : null
    )
  }

  render () {
    let errors = this.state.errors

    return <div>
      <label>
        Credit / Debit Card Number *
        <CardNumberElement
          className={classNames('o-form__input-field', { 'o-form__input-field__error': (errors.CardNumberElement !== '') })}
          onChange={this.handleChange.bind(this, 'CardNumberElement')}
         />
      </label>

      { this.renderValidationMessageFor('CardNumberElement') }

      <div className='o-flex o-flex__space-between'>
        <div className='o-flex-full-width-s'>
          <label aria-label='Card expiry date'>
            Expiration *
            <CardExpiryElement
              className={classNames('o-form__input-field c-card-expiry-field', { 'o-form__input-field__error': (errors.CardExpiryElement !== '') })}
              onChange={this.handleChange.bind(this, 'CardExpiryElement')}
            />
          </label>

          { this.renderValidationMessageFor('CardExpiryElement') }
        </div>

        <div className='o-flex-full-width-s'>
          <label aria-label='CVV security code'>
            CVV *
            <CardCVCElement
              className={classNames('o-form__input-field c-cvv-field', { 'o-form__input-field__error': (errors.CardCVCElement !== '') })}
              onChange={this.handleChange.bind(this, 'CardCVCElement')}
            />
          </label>

          { this.renderValidationMessageFor('CardCVCElement') }
        </div>
      </div>
    </div>
  }
}

export default injectStripe(StripeCardFields)