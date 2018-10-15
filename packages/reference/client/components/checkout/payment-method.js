// Libraries
import { Component } from 'react'
import classNames from 'classnames'

// Components
import PaymentMethodSelector from './payment-method-selector'
import StripePayment from './stripe-payment'
import PayPalPayment from './paypal-payment'

// Objects
import Button from '../../objects/button'

export default class PaymentMethod extends Component {
  renderFormHeader () {
    const { formName, onToggleCollapsed } = this.props
    return (
      <Button
        aria-label='Edit your payment method'
        className='o-form__header-button'
        label='Edit'
        size='lrg'
        status='secondary'
        onClick={() => onToggleCollapsed('edit', formName)}
      />
    )
  }

  renderPaymentMethodSelector () {
    const { checkout, onPaymentMethodChanged } = this.props
    const collapsed = checkout.paymentMethod.collapsed
    const selectedMethod = checkout.paymentMethod.selectedMethod
    const display = !collapsed ? 'block' : 'none'
    return (
      <div style={{ display: display }}>
        <PaymentMethodSelector
          currentMethod={selectedMethod}
          onPaymentMethodChanged={onPaymentMethodChanged}
        />

        { (() => {
          switch (selectedMethod) {
            case 'card':
              return <StripePayment {...this.props} />
            case 'paypal':
              return <PayPalPayment />
          }
        })() }
      </div>
    )
  }

  renderFormSummary () {
    const { checkout, order } = this.props
    const billingAddress = checkout.billingAddress
    const paymentMode = checkout.paymentMethod.selectedMethod === 'card' ? 'Credit/Debit Card' : 'Paypal'

    return (
      <div className={classNames('c-payment-method__summary', { 'o-form__error': order.paymentError !== null })}>
        <p>
          <span className='u-bold'> Payment Mode: </span>
          <span> { paymentMode } </span>
        </p>
        <p>
          <span className='u-bold'>Billing Address: </span>
          <span className='u-bold'>{ billingAddress.first_name } { billingAddress.last_name } </span>
          <span>{ billingAddress.line_1 }, { billingAddress.city }, { billingAddress.zipcode }</span>
        </p>
      </div>
    )
  }

  render () {
    const { checkout } = this.props
    const { collapsed } = checkout.paymentMethod
    return (
      <div aria-label='Payment method' className={classNames('o-form  c-payment-method', { 'o-form__hidden': !checkout.shippingMethod.completed })}>
        <div className='o-form__header  c-payment-method__header'>
          <div>
            <h2>Payment Method</h2>
          </div>
          <div>
            { collapsed && this.renderFormHeader() }
          </div>
        </div>
        { collapsed && this.renderFormSummary() }
        { this.renderPaymentMethodSelector() }
      </div>
    )
  }
}
