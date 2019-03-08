// Libraries
import React from 'react'

// Components
import ShippingMethods from '../../../src/components/checkout/shipping-methods'

import cartFixture from '../../fixtures/cart'
import shippingMethodsFixture from '../../fixtures/shipping-methods'

describe('ShippingMethods', () => {
  // Setup mock date for testing business days
  const RealDate = Date
  const mockDate = new Date('2019-01-01')

  beforeAll(() => {
    global.Date = class extends Date {
      constructor () {
        super()
        return mockDate
      }
    }
  })

  afterAll(() => {
    global.Date = RealDate
  })

  test('renders a nothing when shipping methods are loading', () => {
    const wrapper = shallow(<ShippingMethods />)

    expect(wrapper.equals(null)).toBe(true)
  })

  test('renders shipping methods when they are passed as props, and their handlers work as expected', () => {
    const mockClassName = 'mock-classname'
    const handleFormSubmit = jest.fn()
    const handleSetShippingMethod = jest.fn()

    const cartShippingMethod = cartFixture.shipping_method
    const cartLineItemsCount = cartFixture.line_items_count

    const wrapper = mount(<ShippingMethods
      cartShippingMethod={cartShippingMethod}
      cartLineItemsCount={cartLineItemsCount}
      className={mockClassName}
      handleFormSubmit={handleFormSubmit}
      handleSetShippingMethod={handleSetShippingMethod}
      shippingMethods={shippingMethodsFixture}
    />)

    // Basic checks for classnames and content
    expect(wrapper.find('div').first()).toHaveClassName(mockClassName)
    expect(wrapper).toIncludeText(shippingMethodsFixture[0].label)
    // Check for estimated delivery
    expect(wrapper).toIncludeText('Wednesday 9th January')

    // Get the last shipping method in the fixture
    const lastShippingMethodFixture = shippingMethodsFixture[shippingMethodsFixture.length - 1]
    // Select the last shipping method
    wrapper.find({ type: 'radio' }).last().prop('onChange')()
    // Check the handler has been called correctly
    expect(handleSetShippingMethod).toHaveBeenCalledWith(lastShippingMethodFixture)

    // Submit the form
    wrapper.find({ role: 'button' }).first().prop('onClick')()
    // Check the handler has been called correctly
    expect(handleFormSubmit).toHaveBeenCalled()
  })
})
