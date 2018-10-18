// Libraries
import { Component } from 'react'
import { StripeProvider, Elements } from 'react-stripe-elements'

// Components
import StripeCardFields from './stripe-card-fields'

class StripeWrapper extends Component {
  renderStripeForm (StripeApiKey) {
    const {
      cardTokenRequested,
      onCardTokenReceived,
      setCardErrors,
      checkout
    } = this.props

    return (
      <StripeProvider apiKey={StripeApiKey}>
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
    const StripeApiKey = process.env.STRIPE_API_KEY

    return (
      StripeApiKey ? this.renderStripeForm(StripeApiKey) : this.renderServiceUnavailableMessage()
    )
  }
}

export default StripeWrapper
