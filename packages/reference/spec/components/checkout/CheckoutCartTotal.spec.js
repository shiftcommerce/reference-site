// Components
import CheckoutCartTotal from '../../../components/checkout/CheckoutCartTotal'

// Fixtures
import { shippingMethods } from '../../../static/shippingMethods.json'

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

  const checkout = {
    shippingAddress: {}
  }

  const updateQuantity = () => {}

  // act
  const wrapper = mount(
    <CheckoutCartTotal cart={cart} checkout={checkout} title="Checkout Cart Summary" />
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

  const checkout = {
    shippingAddress: {},
    shippingMethod: {}
  }

  const updateQuantity = () => {}

  // act
  const wrapper = mount(
    <CheckoutCartTotal cart={cart} checkout={checkout} />
  )

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('Subtotal:  £25')
  expect(wrapper).toIncludeText('VAT:  £0')
  expect(wrapper).toIncludeText('Shipping:  Enter address')
  expect(wrapper).toIncludeText('You Pay:  £25')
})

test('renders the correct checkout cart costs with shipping address completed', () => {
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

  const checkout = {
    shippingAddress: {
      collapsed: true
    },
    shippingMethod: {}
  }

  const updateQuantity = () => {}

  // act
  const wrapper = mount(
    <CheckoutCartTotal cart={cart} checkout={checkout} />
  )

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('Subtotal:  £25')
  expect(wrapper).toIncludeText('VAT:  £0')
  expect(wrapper).toIncludeText('Shipping:  Select shipping method')
  expect(wrapper).toIncludeText('You Pay:  £25')
})

test('renders the correct checkout cart costs with shipping method selected', () => {
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

  const checkout = {
    shippingAddress: {
      collapsed: true
    },
    shippingMethod: shippingMethods[0]
  }

  const updateQuantity = () => {}

  // act
  const wrapper = mount(
    <CheckoutCartTotal cart={cart} checkout={checkout} />
  )

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('Subtotal:  £25')
  expect(wrapper).toIncludeText('VAT:  £0')
  expect(wrapper).toIncludeText('Shipping:  £3.45')
  expect(wrapper).toIncludeText('You Pay:  £28.45')
})
