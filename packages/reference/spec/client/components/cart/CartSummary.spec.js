import CartSummary from '../../../../client/components/cart/CartSummary'

import { fixedPrice } from '../../../../client/lib/fixedPrice'

test('renders correct values when no line items are available', () => {
  // arrange
  const cart = {
    lineItems: []
  }

  // act
  const wrapper = mount(
    <CartSummary cart={cart} />
  )

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('Total Price:£0')
  expect(wrapper).toIncludeText('Estimated shipping cost: £3.45')
  expect(wrapper).toIncludeText('TOTAL:£0')
})

test('renders correct values when line items are available', () => {
  // arrange
  const cart = {
    lineItems: [
      {
        title: 'test',
        price: fixedPrice(10.0),
        discount: fixedPrice(2.0),
        quantity: 2,
        sku: '123',
        imageUrl: '',
        size: 'size - 8'
      }
    ]
  }

  const updateQuantity = () => {}

  // act
  const wrapper = mount(
    <CartSummary cart={cart} updateQuantity={updateQuantity} />
  )

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('Total Price:£20')
  expect(wrapper).toIncludeText('Estimated shipping cost: £3.45')
  expect(wrapper).toIncludeText('TOTAL:£16')
})
