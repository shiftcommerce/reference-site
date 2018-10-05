// Libraries
import { Component } from 'react'

// Objects
import Image from '../../objects/Image'

export default class PaymentMethodSelector extends Component {
  buttonClass (paymentType) {
    return `c-payment-method__button ${this.props.currentMethod === paymentType ? 'c-payment-method__button--active' : ''}`
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
    return <>
      <div className='o-form c-payment-method'>
        { this.renderPaymentMethodOption('Credit/Debit Card', 'Use credit or debit card', 'card') }
        { this.renderPaymentMethodOption('PayPal', 'Use paypal', 'paypal') }
      </div>
      <div className='c-payment-method__images'>
        <span className='c-payment-method__images-cardpayment'>
          <Image src='/static/payments/VISA.svg' />
          <Image src='/static/payments/Mastercard.svg' />
          <Image src='/static/payments/american-express.svg' />
          <Image src='/static/payments/maestro.svg' />
        </span>
        <span className='c-payment-method__images-paypal'>
          <Image src='/static/payments/PayPal.svg' />
        </span>
      </div>
    </>
  }
}
