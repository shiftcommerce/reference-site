// Libraries
import React from 'react'

// Component
import { OrderAddresses } from '../../../src/components/orders/order-addresses'

// Fixtures
import orders from '../../fixtures/orders'

test('renders correctly', () => {
  // Arrange
  const shippingAddresses = orders.data[0].shipping_addresses

  // Act
  const wrapper = mount(
    <OrderAddresses addresses={shippingAddresses} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText(shippingAddresses[0].name)
  expect(wrapper).toIncludeText(shippingAddresses[0].company)
})
