// Libraries
import React from 'react'
import format from 'date-fns/format'

// Components
import { OrderList } from '../../../src/components/orders/order-list'

// Libs
import { penceToPounds } from '../../../src/lib/pence-to-pounds'

// Fixtures
import orders from '../../fixtures/orders'
import page_1_orders from '../../fixtures/orders-with-page-1'
import page_2_orders from '../../fixtures/orders-with-page-2'

describe('Order List', () => {
  test('renders correctly', () => {
    // Arrange
    const pageNumber = '1'
    const pagePath = '/account/orders'
    const updateCurrentOrder = jest.fn()
    const order = orders.data[0]
    const orderTotal = penceToPounds(order.pricing.total_inc_tax)
    const orderDate = format(new Date(order.placed_at), 'D MMM YYYY')

    // Act
    const wrapper = shallow(
      <OrderList
        orders={orders}
        pageNumber={pageNumber}
        pagePath={pagePath}
        updateCurrentOrder={updateCurrentOrder}
      />
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
    const updateCurrentOrder = jest.fn()

    // Act
    const wrapper = mount(
      <OrderList
        orders={page_1_orders}
        pageNumber={pageNumber}
        pagePath={pagePath}
        updateCurrentOrder={updateCurrentOrder}
      />
    )

    // Assert
    expect(wrapper).toMatchSnapshot()
    expect(wrapper).toIncludeText('Next')
  })

  test('renders next and previous page link on second page', () => {
    // Arrange
    const pageNumber = 1
    const pagePath = '/account/orders'
    const updateCurrentOrder = jest.fn()

    // Act
    const wrapper = mount(
      <OrderList
        orders={page_2_orders}
        pageNumber={pageNumber}
        pagePath={pagePath}
        updateCurrentOrder={updateCurrentOrder}
      />
    )

    // Assert
    expect(wrapper).toMatchSnapshot()
    expect(wrapper).toIncludeText('Next')
    expect(wrapper).toIncludeText('Previous')
  })
})
