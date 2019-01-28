// Comnponent
import OrderSummary from '../../../../client/components/orders/order-summary'

// Lib
import { decimalPrice } from '../../../../client/lib/decimal-price'

// Fixtures
import order from '../../../fixtures/confirmation-order'

test('renders correctly', () => {
  // arrange
  const lineItems = order.line_items

  // act
  const wrapper = mount(
    <OrderSummary order={order} />
  )

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText(lineItems[0].title)
  expect(wrapper).toIncludeText(lineItems[0].sku)
  expect(wrapper).toIncludeText(decimalPrice(order.sub_total))
  expect(wrapper).toIncludeText(decimalPrice(order.shipping_total))
  expect(wrapper).toIncludeText(decimalPrice(order.total))
})
