// Libraries
import { Component } from 'react'

// Components
import PaymentMethodSelector from './PaymentMethodSelector'
import StripePayment from './StripePayment'
import PayPalPayment from './PayPalPayment'

export default class PaymentMethod extends Component {
  render () {
    const { checkout,
            onPaymentMethodChanged } = this.props
    const paymentMethod = checkout.paymentMethod
    const collapsed = paymentMethod.collapsed

    return <div aria-label='Payment method' className='o-form'>
      <h3>Payment Method</h3>

      {!collapsed &&
        <div>
          <PaymentMethodSelector
            currentMethod={this.props.checkout.paymentMethod.selectedMethod}
            onPaymentMethodChanged={onPaymentMethodChanged}
          />

          {(() => {
            switch (checkout.paymentMethod.selectedMethod) {
              case 'card':
                return <StripePayment {...this.props} />
              case 'paypal':
                return <PayPalPayment />
            }
          })()}
        </div>
      }

      <div aria-label='Use gift card or rewards code' className='o-form__wrapper'>
        <p>
          + Use a Gift Card / Rewards Code
        </p>
      </div>
    </div>
  }
}
