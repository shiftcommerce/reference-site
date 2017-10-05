// Components
import PaymentMethod from '../../../components/checkout/PaymentMethod'

test('Renders correct address summary when shippingAsBilling is true', () => {
  // arrange
  const checkout = {
    shippingAddress: {
      fullName: 'Test Name',
      address1: 'Test Address 1',
      address2: 'Test Address 2',
      city: 'Test City',
      postCode: 'Test Postcode'
    },
    billingAddress: {},
    paymentMethod: {
      shippingAddressAsBillingAddress: 'true'
    }
  }

  // act
  const wrapper = mount(<PaymentMethod checkout={checkout} />)

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('Test Name')
  expect(wrapper).toIncludeText('Test Address 1')
  expect(wrapper).toIncludeText('Test Address 2')
  expect(wrapper).toIncludeText('Test City')
  expect(wrapper).toIncludeText('Test Postcode')
})

test('Does not render address summary when shippingAsBilling is true', () => {
  // arrange
  const checkout = {
    shippingAddress: {
      fullName: 'Test Name',
      address1: 'Test Address 1',
      address2: 'Test Address 2',
      city: 'Test City',
      postCode: 'Test Postcode'
    },
    billingAddress: {},
    paymentMethod: {
      shippingAddressAsBillingAddress: false
    }
  }

  // act
  const wrapper = mount(<PaymentMethod checkout={checkout} />)

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).not.toIncludeText('Test Name')
})
