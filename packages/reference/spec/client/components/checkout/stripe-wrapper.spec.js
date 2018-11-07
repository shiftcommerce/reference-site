// Component
import StripeWrapper from '../../../../client/components/checkout/stripe-wrapper'

jest.mock('next/config', () => () => (
  { publicRuntimeConfig: { STRIPE_API_KEY: '' } }
))

describe('StripeWrapper', () => {
  it('renders the payment method is not available if api key is not present', () => {
    // Act
    const wrapper = shallow(
      <StripeWrapper />
    )

    // Assert
    expect(wrapper).toMatchSnapshot()
    expect(wrapper).toIncludeText('* PAYMENT THROUGH STRIPE IS CURRENTLY NOT AVAILABLE *')
  })

  it('renders StripeProvider component if the api key is present', () => {
    // Act
    const wrapper = shallow(
      <StripeWrapper
        stripeApiKey={'TEST_API_KEY'}
        setCardErrors={jest.fn()}
        checkout={{ billingAddress: { first_name: 'a' } }}
      />
    )

    // Assert
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.props().apiKey).toBe('TEST_API_KEY')
  })
})
