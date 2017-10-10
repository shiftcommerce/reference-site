// Components
import PaymentMethod from '../../../components/checkout/PaymentMethod'

test('Renders correct address summary when shippingAsBilling is true', () => {
  // arrange
  const checkout = {
    shippingAddress: {
      full_name: 'Test Name',
      line_1: 'Test Address 1',
      line_2: 'Test Address 2',
      city: 'Test City',
      zipcode: 'Test Postcode'
    },
    billingAddress: {},
    shippingAddressAsBillingAddress: true,
    paymentMethod: {
      collapsed: false
    }
  }
  const setShippingBillingAddress = () => {}

  // act
  const wrapper = mount(<PaymentMethod checkout={checkout} setShippingBillingAddress={setShippingBillingAddress} />)

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('Test Name')
  expect(wrapper).toIncludeText('Test Address 1')
  expect(wrapper).toIncludeText('Test Address 2')
  expect(wrapper).toIncludeText('Test City')
  expect(wrapper).toIncludeText('Test Postcode')
})

test('Does not render address summary when shippingAsBilling is false', () => {
  // arrange
  const checkout = {
    shippingAddress: {
      full_name: 'Test Name',
      line_1: 'Test Address 1',
      line_2: 'Test Address 2',
      city: 'Test City',
      zipcode: 'Test Postcode'
    },
    billingAddress: {},
    shippingAddressAsBillingAddress: false,
    paymentMethod: {
      collapsed: false
    }
  }
  const setShippingBillingAddress = () => {}

  // act
  const wrapper = mount(<PaymentMethod checkout={checkout} setShippingBillingAddress={setShippingBillingAddress} />)

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).not.toIncludeText('Test Name')
})
