// Libraries
import dateFns from 'date-fns'

// Component
import OrderList from '../../../../client/components/orders/list'

// Lib
import { penceToPounds } from '../../../../client/lib/pence-to-pounds'

// Fixtures
import orders from '../../../fixtures/orders'

test('renders correctly', () => {
  // Act
  const wrapper = mount(
    <OrderList orders={orders} />
  )

  const instance = wrapper.instance()

  const order = orders.data[0]
  const shippingTotal = instance.renderShippingTotal(order)
  const orderTotal = penceToPounds(order.pricing.total_inc_tax)
  const orderDate = dateFns.format(new Date(order.placed_at), 'MMM D, YYYY')

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText(shippingTotal)
  expect(wrapper).toIncludeText(orderTotal)
  expect(wrapper).toIncludeText(orderDate)
})
