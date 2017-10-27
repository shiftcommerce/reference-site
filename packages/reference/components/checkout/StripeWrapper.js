// Libraries
import { Component } from 'react'
import { StripeProvider, Elements } from 'react-stripe-elements'

// Components
import StripeCardFields from './StripeCardFields'

// Constants
import paymentConfig from '../../constants/paymentConfig'

class StripeWrapper extends Component {
  renderStripeForm (StripeApiKey) {
    return (
      <StripeProvider apiKey={StripeApiKey}>
        <Elements>
          <StripeCardFields
            cardTokenRequested={this.props.cardTokenRequested}
            onCardTokenReceived={this.props.onCardTokenReceived}
            billingAddress = {this.props.checkout.billingAddress}
          />
        </Elements>
      </StripeProvider>
    )
  }

  renderServiceUnavailableMessage () {
    return (
      <div className='u-bold u-text-color--red'>
        * PAYMENT THROUGH STRIPE IS CURRENTLY NOT AVAILABLE *
      </div>
    )
  }

  render () {
    let StripeApiKey = paymentConfig.StripeApiKey

    return (
      StripeApiKey ? this.renderStripeForm(StripeApiKey) : this.renderServiceUnavailableMessage()
    )
  }
}

export default StripeWrapper
