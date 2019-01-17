import CartSummary from '../../../../client/components/cart/cart-summary'

import cartFixture from '../../../fixtures/cart'

test('renders correct values when line items are available', () => {
  // arrange
  const cart = {
    lineItems: [],
    sub_total: 0,
    discount_summaries: [],
    shipping_total: 0
  }

  // act
  const wrapper = mount(
    <CartSummary cart={cart} />
  )

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('Total Price:£0')
  expect(wrapper).toIncludeText('Estimating shipping cost...')
  expect(wrapper).toIncludeText('Total Price:£0.00')
})

test('renders correct values when line items and discounts are available', () => {
  // act
  const wrapper = mount(
    <CartSummary cart={cartFixture} />
  )

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('Total Price:£6.77')
  expect(wrapper).toIncludeText('£1.50 off all orders')
  expect(wrapper).toIncludeText('TOTAL:£5.27')
})

test('displays placeholder text, fetches shipping methods and sets the estimated cost to the cheapest one', async () => {
  cartFixture.shipping_method = undefined
  const fetchShippingSpy = jest.spyOn(CartSummary, 'fetchShippingMethods').mockImplementation(() => Promise.resolve({
    data: [{
      id: 1,
      sku: 'STA_SHIP',
      label: 'Standard shipping',
      total: 3.75,
      meta_attributes: {
        working_days: {
          value: 2
        }
      }
    }, {
      id: 2,
      sku: 'NEX_SHIP',
      label: 'Next day delivery',
      total: 6.25,
      meta_attributes: {
        working_days: {
          value: 1
        }
      }
    }]
  }))

  const wrapper = mount(
    <CartSummary cart={cartFixture} />
  )

  expect(wrapper).toIncludeText('Estimating shipping cost...')

  await wrapper.instance().componentDidMount()
  wrapper.update()

  expect(wrapper).toIncludeText('Shipping from: £3.75')

  fetchShippingSpy.mockRestore()
})
