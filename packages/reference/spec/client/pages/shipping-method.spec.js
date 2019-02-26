// Libraries
import Router from 'next/router'

// Pages
import { CheckoutShippingMethodPage } from '../../../client/pages/checkout/shipping-method'

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {}
}))

test('componentDidMount() redirects to the shipping address page when one is not set', () => {
  const pushSpy = jest.spyOn(Router, 'push').mockImplementation(() => {})
  shallow(<CheckoutShippingMethodPage cart={{}} />)
  expect(pushSpy).toHaveBeenCalledWith('/checkout/shipping-address')
  pushSpy.mockRestore()
})

test('renders correct checkout components', () => {
  const wrapper = shallow(<CheckoutShippingMethodPage cart={{ shipping_address: {} }} />)

  expect(wrapper).toMatchSnapshot()
  expect(wrapper.find('AddressFormSummary').length).toEqual(1)
  expect(wrapper.find('ShippingMethods').length).toEqual(1)
})
