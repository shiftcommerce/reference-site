// Components
import PaymentMethod from '../../../../client/components/checkout/payment-method'
// Libraries
import { Provider } from 'react-redux'
import { createStore } from 'redux'

// Fixtures
import order from '../../../fixtures/order'
import checkoutData from '../../../fixtures/checkout'

// Reducers
import rootReducer from '../../../../client/reducers/root-reducer'

// Mock Stripe checkout
jest.mock('../../../../client/components/checkout/stripe-wrapper', () => (props) => <p>Mocked Card Fields</p>)

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

  const store = createStore(rootReducer)

  // act
  const wrapper = mount(
    <Provider store={store}>
      <PaymentMethod
        checkout={checkout}
        setShippingBillingAddress={setShippingBillingAddress}
        order={order}
      />
    </Provider>
  )

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

  const store = createStore(rootReducer)

  // act
  const wrapper = mount(
    <Provider store={store}>
      <PaymentMethod
        checkout={checkout}
        setShippingBillingAddress={setShippingBillingAddress}
        order={order}
      />
    </Provider>
  )

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).not.toIncludeText('Test First Name')
  expect(wrapper).not.toIncludeText('Test Last Name')
})

test('renders payment summary on collapsing', () => {
  // Arrange
  const setShippingBillingAddress = () => {}
  const checkout = Object.assign({}, checkoutData, {
    paymentMethod: {
      ...checkoutData.paymentMethod,
      collapsed: true,
      selectedMethod: 'card'
    }
  })
  const cart = {
    billing_address: {
      first_name: 'Leon',
      last_name: 'The Professional',
      address_line_1: '1 Queen Street',
      city: 'Leeds',
      postcode: 'LS27EY'
    }
  }

  const store = createStore(rootReducer)

  // Act
  const wrapper = mount(
    <Provider store={store}>
      <PaymentMethod cart={cart} checkout={checkout} setShippingBillingAddress={setShippingBillingAddress} order={order} />
    </Provider>
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('Payment Mode:')
  expect(wrapper).toIncludeText('Credit/Debit Card')
})
