import CheckoutCartTotal from '../../../components/checkout/CheckoutCartTotal'

test('renders the correct checkout cart total with single line item', () => {
  // arrange
  const cart = {
    lineItems: [
      {
        title: 'Test Product',
        price: 10,
        discount: 0,
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
    <CheckoutCartTotal cart={cart} title="Checkout Cart Summary" />
  )

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('Subtotal:  £20')
  expect(wrapper).toIncludeText('VAT:  £0')
  expect(wrapper).toIncludeText('Shipping:  Enter address')
  expect(wrapper).toIncludeText('You Pay:  £20')
})

test('renders the correct checkout cart total with multiple line items', () => {
  // arrange
  const cart = {
    lineItems: [
      {
        title: 'Test Product',
        price: 10,
        discount: 0,
        quantity: 2
      },
      {
        title: 'Pretend Product',
        price: 5,
        discount: 0,
        quantity: 1
      }
    ]
  }

  const updateQuantity = () => {}

  // act
  const wrapper = mount(
    <CheckoutCartTotal cart={cart} />
  )

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('Subtotal:  £25')
  expect(wrapper).toIncludeText('VAT:  £0')
  expect(wrapper).toIncludeText('Shipping:  Enter address')
  expect(wrapper).toIncludeText('You Pay:  £25')
})
