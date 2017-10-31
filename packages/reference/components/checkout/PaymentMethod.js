// Libraries
import { Component } from 'react'
import classNames from 'classnames'

// Components
import PaymentMethodSelector from './PaymentMethodSelector'
import StripePayment from './StripePayment'
import PayPalPayment from './PayPalPayment'

// Objects
import Button from '../../objects/Button'

export default class PaymentMethod extends Component {
  renderFormHeader () {
    const { checkout, formName, onToggleCollapsed } = this.props
    const collapsed = checkout.paymentMethod.collapsed
    return (
      <div className='o-form__header'>
        <div>
          <h2>Payment Method</h2>
        </div>

        <div>
          { collapsed &&
            <Button
              aria-label='Edit your payment method'
              label='Edit'
              size='lrg'
              onClick={() => onToggleCollapsed('edit', formName)}
            />
          }
        </div>
      </div>
    )
  }

  renderPaymentMethodSelector () {
    const { checkout, onPaymentMethodChanged } = this.props
    const collapsed = checkout.paymentMethod.collapsed
    const selectedMethod = checkout.paymentMethod.selectedMethod
    const display = !collapsed ? 'block' : 'none'
    return (
      <div style={{display: display}}>
        <PaymentMethodSelector
          currentMethod={selectedMethod}
          onPaymentMethodChanged={onPaymentMethodChanged}
        />

        {(() => {
          switch (selectedMethod) {
            case 'card':
              return <StripePayment {...this.props} />
            case 'paypal':
              return <PayPalPayment />
          }
        })()}
      </div>
    )
  }

  renderFormSummary () {
    const { checkout, order } = this.props
    const collapsed = checkout.paymentMethod.collapsed
    const billingAddress = checkout.billingAddress
    return (
      <div>
        { collapsed &&
          <div className={classNames('o-form__wrapper', {'o-form__error': order.paymentError !== ''})}>
            <span className='u-bold'>Billing Address: </span>
            <span className='u-bold'>{ billingAddress.first_name } { billingAddress.last_name } </span>
            <span>{ billingAddress.line_1 }, { billingAddress.city }, { billingAddress.zipcode }</span>
          </div>
        }
      </div>
    )
  }

  renderGiftCardSection () {
    return (
      <div aria-label='Use gift card or rewards code' className='o-form__wrapper'>
        <p>
          + Use a Gift Card / Rewards Code
        </p>
      </div>
    )
  }

  render () {
    const {
      checkout
    } = this.props

    return (
      <div aria-label='Payment method' className={classNames('o-form', { 'o-form__hidden': !checkout.shippingMethod.completed })}>
        { this.renderFormHeader() }
        { this.renderFormSummary() }
        { this.renderPaymentMethodSelector() }
        { this.renderGiftCardSection() }
      </div>
    )
  }
}
