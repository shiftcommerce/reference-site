// Libraries
import { Component } from 'react'
import { StripeProvider, Elements } from 'react-stripe-elements'

// Next config
import getConfig from 'next/config'

// Components
import StripeCardFields from './stripe-card-fields'

const { publicRuntimeConfig: { STRIPE_API_KEY } } = getConfig()

class StripeWrapper extends Component {
  renderStripeForm () {
    const {
      cardTokenRequested,
      onCardTokenReceived,
      setCardErrors,
      checkout
    } = this.props

    return (
      <StripeProvider apiKey={STRIPE_API_KEY}>
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
    return (
      STRIPE_API_KEY ? this.renderStripeForm() : this.renderServiceUnavailableMessage()
    )
  }
}

export default StripeWrapper
