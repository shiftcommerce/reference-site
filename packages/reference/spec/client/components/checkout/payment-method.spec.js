// Components
import PaymentMethod from '../../../../client/components/checkout/payment-method'
import '../../../../client/components/checkout/stripe-payment'

import { PaymentMethodHeader } from 'shift-react-components'

// Mock Stripe payment
jest.mock('../../../../client/components/checkout/stripe-payment', () => (props) => <p>Stripe payment</p>)

test('renders the payment method header and stripe payment component', () => {
  const wrapper = mount(<PaymentMethod cart={{}} order={{}} />)

  expect(wrapper).toMatchSnapshot()
  expect(wrapper.find(PaymentMethodHeader).length).toEqual(1)
  expect(wrapper).toContainReact(<p>Stripe payment</p>)
})
