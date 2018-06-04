import CheckoutCart from '../../../components/checkout/CheckoutCart'

import { fixedPrice } from '../../../lib/fixedPrice'

test('renders the correct checkout cart summary with single line item', () => {
  // arrange
  const cart = {
    lineItems: [
      {
        title: 'Test Product',
        price: fixedPrice(10.0),
        discount: 0,
        quantity: 2,
        sku: '123',
        imageUrl: '',
        size: 'size - 8'
      }
    ]
  }

  // act
  const wrapper = mount(
    <CheckoutCart cart={cart} title='Checkout Cart Summary' />
  )

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('Checkout Cart Summary')
  expect(wrapper).toIncludeText('Test Product')
  expect(wrapper).toIncludeText('Qty: 2')
  expect(wrapper).toIncludeText('Price: £10')
  expect(wrapper).toIncludeText('Subtotal: £20')
})
test('renders the correct checkout cart summary with multiple line items', () => {
  // arrange
  const cart = {
    lineItems: [
      {
        title: 'Test Product',
        price: fixedPrice(10.0),
        discount: 0,
        quantity: 2
      },
      {
        title: 'Pretend Product',
        price: fixedPrice(5.0),
        discount: 0,
        quantity: 1
      }
    ]
  }

  // act
  const wrapper = mount(
    <CheckoutCart cart={cart} />
  )

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('Test Product')
  expect(wrapper).toIncludeText('Pretend Product')
})
