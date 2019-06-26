// Libraries
import React from 'react'

// Components
import { CartTableHeader } from '../../../src/components/cart/cart-table-header'

// Fixtures
import cart from '../../fixtures/cart'
import shippingMethod from '../../fixtures/shipping-method'

test('renders correct messages when cart has items', () => {
  const dateSpy = jest.spyOn(Date, 'now').mockImplementation(() => new Date('2018-12-04T06:00:00').getTime())

  const className = 'dummy-classname'

  // act
  const wrapper = mount(
    <CartTableHeader className={className} cart={cart} shippingMethod={shippingMethod} canCheckout={true} />
  )

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('Wednesday 5th December') // estimated delivery date
  expect(wrapper).toIncludeText('You have 2 items in your shopping basket')
  expect(wrapper.find('section')).toHaveClassName(className)

  dateSpy.mockRestore()
})

test('renders flash message when cart has invalid items', () => {
  // act
  const wrapper = mount(
    <CartTableHeader cart={cart} shippingMethod={shippingMethod} canCheckout={false} />
  )

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('The items highlighted in your basket are out of stock. Please reduce quantity or remove before proceeding.')
})

test('renders correct messages when cart is empty', () => {
  const dateSpy = jest.spyOn(Date, 'now').mockImplementation(() => new Date('2018-12-04T06:00:00').getTime())

  const emptyCart = {
    line_items: [],
    sub_total: 0,
    line_items_count: 0,
    discount_summaries: [],
    total: 0
  }

  // act
  const wrapper = mount(
    <CartTableHeader cart={emptyCart} shippingMethod={shippingMethod} canCheckout={true} />
  )

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('You have 0 items in your shopping basket')

  dateSpy.mockRestore()
})
