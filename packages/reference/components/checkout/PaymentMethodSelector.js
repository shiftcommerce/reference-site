// Libraries
import { Component } from 'react'

export default class PaymentMethodSelector extends Component {
  buttonClass (paymentType) {
    return `c-payment-method-button ${this.props.currentMethod === paymentType ? 'c-payment-method-button__active' : ''}`
  }

  render () {
    const { onPaymentMethodChanged } = this.props

    return (
      <div className='o-form'>
        <div aria-label='Use credit or debit card' className={this.buttonClass('card')} onClick={() => onPaymentMethodChanged('card')}>
          <span>Credit/Debit Card</span>
        </div>
        <div aria-label='Use paypal' className={this.buttonClass('paypal')} onClick={() => this.props.onPaymentMethodChanged('paypal')}>
          <span>PayPal</span>
        </div>
      </div>
    )
  }
}
