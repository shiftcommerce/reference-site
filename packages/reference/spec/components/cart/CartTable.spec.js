import CartTable from '../../../components/cart/CartTable'
import CartNoData from '../../../components/cart/CartNoData'
import LineItems from '../../../components/cart/LineItems'
import CartSummary from '../../../components/cart/CartSummary'

test('renders the exception messages when no line items are available', () => {
  // arrange
  const cart = {
    lineItems: []
  }

  const updateQuantity = () => {}

  // act
  const wrapper = mount(
    <CartTable cart={cart} />
  )

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('My Bag')
  expect(wrapper).toIncludeText('0 items in your bag')
  expect(wrapper).toContainReact(<CartNoData />)
  expect(wrapper).not.toContainReact(<LineItems cart={cart} updateQuantity={updateQuantity} aria-label='Line Items' />)
  expect(wrapper).not.toContainReact(<CartSummary cart={cart} updateQuantity={updateQuantity} aria-label='Cart Summary' />)
})

test('renders the correct message when line items are available in cart', () => {
  // arrange
  const cart = {
    lineItems: [
      {
        title: 'test',
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
    <CartTable cart={cart} updateQuantity={updateQuantity} />
  )

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('My Bag')
  expect(wrapper).toIncludeText('1 item in your bag')
  expect(wrapper).not.toContainReact(<CartNoData />)
  expect(wrapper).toContainReact(<LineItems cart={cart} updateQuantity={updateQuantity} aria-label='Line Items' />)
  expect(wrapper).toContainReact(<CartSummary cart={cart} updateQuantity={updateQuantity} aria-label='Cart Summary' />)
})
