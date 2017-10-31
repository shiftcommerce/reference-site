// Libraries
import { Component } from 'react'

export default class PaymentMethodSelector extends Component {
  buttonClass (paymentType) {
    return `c-payment-method-button ${this.props.currentMethod === paymentType ? 'c-payment-method-button__active' : ''}`
  }

  renderPaymentMethodOption (label, ariaLabel, paymentMethod) {
    const { onPaymentMethodChanged } = this.props
    return (
      <div aria-label={ariaLabel} className={this.buttonClass(paymentMethod)} onClick={() => onPaymentMethodChanged(paymentMethod)}>
        <span>{ label }</span>
      </div>
    )
  }

  render () {
    return (
      <div className='o-form'>
        { this.renderPaymentMethodOption('Credit/Debit Card', 'Use credit or debit card', 'card') }
        { this.renderPaymentMethodOption('PayPal', 'Use paypal', 'paypal') }
      </div>
    )
  }
}
