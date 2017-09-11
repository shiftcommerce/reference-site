import CartSummary from '../../../components/cart/CartSummary'

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
  expect(wrapper).toIncludeText('Sub total:  £0')
  expect(wrapper).toIncludeText('Tax applied:  +£0')
  expect(wrapper).toIncludeText('Amount you saved on this purchase:  -£0')
  expect(wrapper).toIncludeText('Total amount to be paid:  £0')
})

test('renders correct values when line items are available', () => {
  // arrange
  const cart = {
    lineItems: [
      {
        title: 'test',
        price: 10,
        discount: 2,
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
  expect(wrapper).toIncludeText('Sub total:  £20')
  expect(wrapper).toIncludeText('Tax applied:  +£0')
  expect(wrapper).toIncludeText('Amount you saved on this purchase:  -£4')
  expect(wrapper).toIncludeText('Total amount to be paid:  £16')
})
