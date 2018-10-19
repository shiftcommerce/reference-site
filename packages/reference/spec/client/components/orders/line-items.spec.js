// Comnponent
import LineItems from '../../../../client/components/orders/line-items'

// Lib
import { penceToPounds } from '../../../../client/lib/pence-to-pounds'

// Fixtures
import orders from '../../../fixtures/orders'

test('renders correctly', () => {
  // arrange
  const lineItems = orders.data[0].line_items

  // act
  const wrapper = mount(
    <LineItems items={lineItems} />
  )

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText(lineItems[0].sku)
  expect(wrapper).toIncludeText(lineItems[0].quantity)
  expect(wrapper).toIncludeText(penceToPounds(lineItems[0].pricing.line_inc_tax))
  expect(wrapper).toIncludeText(lineItems[1].sku)
  expect(wrapper).toIncludeText(lineItems[1].quantity)
  expect(wrapper).toIncludeText(penceToPounds(lineItems[1].pricing.line_inc_tax))
})
