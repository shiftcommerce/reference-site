// Libraries
import React from 'react'

// Component
import { OrderLineItems } from '../../../src/components/orders/order-line-items'

// Lib
import { penceToPounds } from '../../../src/lib/pence-to-pounds'

// Fixtures
import orders from '../../fixtures/orders'

test('renders correctly', () => {
  // Arrange
  const lineItems = orders.data[0].line_items

  // Act
  const wrapper = mount(
    <OrderLineItems items={lineItems} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText(lineItems[0].sku)
  expect(wrapper).toIncludeText(lineItems[0].quantity)
  expect(wrapper).toIncludeText(penceToPounds(lineItems[0].pricing.line_total_inc_tax))
})
