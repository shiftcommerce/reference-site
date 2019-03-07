// Components
import PaymentMethod from '../../../../client/components/checkout/payment-method'

import { PaymentMethodHeader, StripePayment } from 'shift-react-components'

test('renders the payment method header and stripe payment component', () => {
  const wrapper = shallow(<PaymentMethod cart={{}} order={{}} />)

  expect(wrapper).toMatchSnapshot()
  expect(wrapper.find(PaymentMethodHeader).length).toEqual(1)
  expect(wrapper.find(StripePayment).length).toEqual(1)
})
