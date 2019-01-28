// Libraries
import { Component } from 'react'

// Objects
import { Button, Image } from 'shift-react-components'

export default class PaymentMethodSelector extends Component {
  buttonClass (paymentType) {
    return `c-payment-method__button ${this.props.currentMethod === paymentType ? 'c-payment-method__button--active' : ''}`
  }

  renderPaymentMethodOption (label, ariaLabel, paymentMethod) {
    const { onPaymentMethodChanged } = this.props
    return (
      <Button
        aria-label={ariaLabel}
        className={this.buttonClass(paymentMethod)}
        onClick={() => onPaymentMethodChanged(paymentMethod)}
        label={label}
      />
    )
  }

  render () {
    return (
      <>
        <div className='o-form c-payment-method'>
          <div className='c-payment-method__button-group'>
            { this.renderPaymentMethodOption('Credit/Debit Card', 'Use credit or debit card', 'card') }
            { this.renderPaymentMethodOption('PayPal', 'Use paypal', 'paypal') }
          </div>
          <div className='c-payment-method__images'>
            <span className='c-payment-method__images-cardpayment'>
              <Image src='/static/payments/visa.svg' />
              <Image src='/static/payments/mastercard.svg' />
              <Image src='/static/payments/american-express.svg' />
              <Image src='/static/payments/maestro.svg' />
            </span>
            <span className='c-payment-method__images-paypal'>
              <Image src='/static/payments/pay-pal.svg' />
            </span>
          </div>
        </div>
      </>
    )
  }
}
