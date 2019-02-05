// Libraries
import React from 'react'

// Components
import CartTableHeader from '../../../src/components/cart/cart-table-header'

// Fixtures
import cart from '../../fixtures/cart'
import shippingMethods from '../../fixtures/shipping-methods'

test('renders correct messages when cart has items', () => {
  const className = 'dummy-classname'

  // act
  const wrapper = mount(
    <CartTableHeader className={className} cart={cart} shippingMethods={shippingMethods} />
  )

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('Wednesday 5th December') // estimated delivery date
  expect(wrapper).toIncludeText('You have 2 items in your shopping basket')
  expect(wrapper).toIncludeText('£5.27') // cart total price
  expect(wrapper.find('section')).toHaveClassName(className)
})

test('renders correct messages when cart is empty', () => {
  const emptyCart = {
    line_items: [],
    sub_total: 0,
    line_items_count: 0,
    discount_summaries: [],
    total: 0
  }

  // act
  const wrapper = mount(
    <CartTableHeader cart={emptyCart} shippingMethods={shippingMethods} />
  )

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('You have 0 items in your shopping basket')
  expect(wrapper).toIncludeText('£0.00')
})
