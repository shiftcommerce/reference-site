// Libraries
import { Component } from 'react'
import { StripeProvider, Elements } from 'react-stripe-elements'

// Next config
import getConfig from 'next/config'

// Components
import StripeCardFields from './stripe-card-fields'

const { publicRuntimeConfig: { STRIPE_API_KEY } } = getConfig()

class StripeWrapper extends Component {
  renderStripeForm (stripeApiKey) {
    const {
      cardTokenRequested,
      onCardTokenReceived,
      setCardErrors,
      checkout
    } = this.props

    return (
      <StripeProvider apiKey={stripeApiKey}>
        <Elements>
          <StripeCardFields
            cardTokenRequested={cardTokenRequested}
            onCardTokenReceived={onCardTokenReceived}
            setCardErrors={setCardErrors}
            billingAddress={checkout.billingAddress}
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
    const { stripeApiKey = STRIPE_API_KEY } = this.props

    return (
      stripeApiKey ? this.renderStripeForm(stripeApiKey) : this.renderServiceUnavailableMessage()
    )
  }
}

export default StripeWrapper
