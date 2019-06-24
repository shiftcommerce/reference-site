// Libraries
import React from 'react'
import format from 'date-fns/format'

// Component
import { OrderSingle } from '../../../src/components/orders/order-single'

// Lib
import { penceToPounds } from '../../../src/lib/pence-to-pounds'

// Fixtures
import orders from '../../fixtures/orders'

test('renders correctly', () => {
  // Act
  const wrapper = mount(
    <OrderSingle order={orders.data[0]} />
  )

  const instance = wrapper.instance()

  const order = orders.data[0]
  const shippingTotal = penceToPounds(instance.calculateShippingTotal(order))
  const orderSubTotal = penceToPounds(instance.calculateSubTotal(order))
  const orderTotal = penceToPounds(order.pricing.total_inc_tax)
  const orderDate = format(new Date(order.placed_at), 'MMM D, YYYY')

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText(shippingTotal)
  expect(wrapper).toIncludeText(orderSubTotal)
  expect(wrapper).toIncludeText(orderTotal)
  expect(wrapper).toIncludeText(orderDate)
})
