// Libraries
import React from 'react'
import format from 'date-fns/format'

// Components
import OrderList from '../../../src/components/orders/order-list'

// Libs
import { penceToPounds } from '../../../src/lib/pence-to-pounds'

// Fixtures
import orders from '../../fixtures/orders'
import orders_with_next_page from '../../fixtures/orders-with-page-1'
import orders_with_previous_page from '../../fixtures/orders-with-page-2'

describe('Order List', () => {
  test('renders correctly', () => {
    // Arrange
    const order = orders.data[0]
    const orderTotal = penceToPounds(order.pricing.total_inc_tax)
    const orderDate = format(new Date(order.placed_at), 'D MMM YYYY')

    // Act
    const wrapper = shallow(
      <OrderList orders={orders} />
    )

    // Assert
    expect(wrapper).toMatchSnapshot()
    expect(wrapper).toIncludeText(orderTotal)
    expect(wrapper).toIncludeText(orderDate)
  })

  test('renders next page link', () => {
    // Arrange
    const pageNumber = 1
    const pagePath = '/account/orders'
    const fetchOrders = jest.fn()

    // Act
    const wrapper = shallow(
      <OrderList
        orders={orders_with_next_page}
        pageNumber={pageNumber}
        pagePath={pagePath}
        fetchOrders={fetchOrders}
      />
    )

    // Assert
    expect(wrapper).toMatchSnapshot()
    expect(wrapper).toIncludeText('Next')
  })

  test('renders previous page link', () => {
    // Arrange
    const pageNumber = 1
    const pagePath = '/account/orders'
    const fetchOrders = jest.fn()

    // Act
    const wrapper = shallow(
      <OrderList
        orders={orders_with_previous_page}
        pageNumber={pageNumber}
        pagePath={pagePath}
        fetchOrders={fetchOrders}
      />
    )

    // Assert
    expect(wrapper).toMatchSnapshot()
    expect(wrapper).toIncludeText('Previous')
  })
})
