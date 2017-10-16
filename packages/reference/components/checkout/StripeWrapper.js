// Libraries
import { StripeProvider, Elements } from 'react-stripe-elements'

// Components
import StripeCardFields from './StripeCardFields'

export default () => {
  const StripeApiKey = process.env.STRIPE_API_KEY

  return (
    <StripeProvider apiKey={StripeApiKey}>
      <Elements>
        <StripeCardFields />
      </Elements>
    </StripeProvider>
  )
}
