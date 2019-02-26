// Components
import PaymentMethod from '../../../../client/components/checkout/payment-method'
import PaymentMethodHeader from '../../../../client/components/checkout/payment-method-header'
import PaymentMethodSelector from '../../../../client/components/checkout/payment-method-selector'
import PayPalPayment from '../../../../client/components/checkout/paypal-payment'
import '../../../../client/components/checkout/stripe-payment'

// Mock Stripe payment
jest.mock('../../../../client/components/checkout/stripe-payment', () => (props) => <p>Stripe payment</p>)

test('renders the payment method header and selector', () => {
  const wrapper = shallow(<PaymentMethod />)

  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toContainReact(<PaymentMethodHeader />)
  expect(wrapper).toContainReact(<PaymentMethodSelector />)
})

test('renders StripePayment when card payment is selected', () => {
  const wrapper = mount(<PaymentMethod selectedPaymentMethod={'card'} cart={{}} order={{}} />)

  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toContainReact(<p>Stripe payment</p>)
})

test('renders PayPalPayment when card payment is selected', () => {
  const wrapper = mount(<PaymentMethod selectedPaymentMethod={'paypal'} cart={{}} order={{}} />)

  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toContainReact(<PayPalPayment />)
})
