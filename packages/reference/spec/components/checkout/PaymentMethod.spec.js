// Components
import PaymentMethod from '../../../components/checkout/PaymentMethod'

// Mock Stripe checkout
jest.mock('../../../components/checkout/StripeWrapper', () => (props) => <p>Mocked Card Fields</p>)

test('Renders correct address summary when shippingAsBilling is true', () => {
  // arrange
  const checkout = {
    shippingAddress: {
      first_name: 'Test First Name',
      last_name: 'Test Last Name',
      line_1: 'Test Address 1',
      line_2: 'Test Address 2',
      city: 'Test City',
      zipcode: 'Test Postcode',
      collapsed: true,
      completed: true,
      errors: {}
    },
    billingAddress: {},
    shippingAddressAsBillingAddress: true,
    shippingMethod: {
      collapsed: true,
      completed: true
    },
    paymentMethod: {
      collapsed: false,
      completed: false,
      selectedMethod: 'card'
    }
  }
  const setShippingBillingAddress = () => {}
  const order = {
    cardTokenRequested: false
  }

  // act
  const wrapper = mount(<PaymentMethod
    checkout={checkout}
    setShippingBillingAddress={setShippingBillingAddress}
    order={order}
  />)

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('Test First Name')
  expect(wrapper).toIncludeText('Test Last Name')
  expect(wrapper).toIncludeText('Test Address 1')
  expect(wrapper).toIncludeText('Test Address 2')
  expect(wrapper).toIncludeText('Test City')
  expect(wrapper).toIncludeText('Test Postcode')
})

test('Does not render address summary when shippingAsBilling is false', () => {
  // arrange
  const checkout = {
    shippingAddress: {
      first_name: 'Test First Name',
      last_name: 'Test Last Name',
      line_1: 'Test Address 1',
      line_2: 'Test Address 2',
      city: 'Test City',
      zipcode: 'Test Postcode',
      collapsed: true,
      completed: true,
      errors: {}
    },
    billingAddress: {
      collapsed: false,
      completed: false,
      errors: {}
    },
    shippingMethod: {
      collapsed: true,
      completed: true
    },
    shippingAddressAsBillingAddress: false,
    paymentMethod: {
      collapsed: false,
      completed: false,
      selectedMethod: 'card'
    }
  }
  const setShippingBillingAddress = () => {}
  const order = {
    cardTokenRequested: false
  }

  // act
  const wrapper = mount(<PaymentMethod
    checkout={checkout}
    setShippingBillingAddress={setShippingBillingAddress}
    order={order}
  />)

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).not.toIncludeText('Test First Name')
  expect(wrapper).not.toIncludeText('Test Last Name')
})
