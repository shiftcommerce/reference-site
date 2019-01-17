import CartTable from '../../../../client/components/cart/cart-table'
import CartNoData from '../../../../client/components/cart/cart-no-data'
import LineItems from '../../../../client/components/cart/line-items'
import CartSummary from '../../../../client/components/cart/cart-summary'

test('renders the exception messages when no line items are available', () => {
  // arrange
  const cart = {
    line_items: [],
    sub_total: 0,
    line_items_count: 0,
    discount_summaries: []
  }

  const updateQuantity = () => {}

  // act
  const wrapper = shallow(
    <CartTable cart={cart} />
  )

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('Your Shopping Basket')
  expect(wrapper).toIncludeText('You have 0')
  expect(wrapper).toContainReact(<CartNoData />)
  expect(wrapper).not.toContainReact(<LineItems cart={cart} updateQuantity={updateQuantity} aria-label='Line Items' />)
  expect(wrapper).not.toContainReact(<CartSummary cart={cart} updateQuantity={updateQuantity} aria-label='Cart Summary' />)
})

test('renders the correct message when line items are available in cart', () => {
  // arrange
  const cart = {
    line_items: [
      {
        sku: 'S2658934_C101_486',
        title: 'Regular Fit Wool Mix Trousers',
        unit_quantity: 2,
        stock_available_level: 10000,
        total: 30,
        sub_total: 30,
        item: {
          product: {
            canonicalPath: '1',
            slug: '1'
          }
        }
      }
    ],
    sub_total: 60,
    line_items_count: 2,
    discount_summaries: []
  }

  const updateQuantity = () => {}

  // act
  const wrapper = mount(
    <CartTable cart={cart} updateQuantity={updateQuantity} />
  )

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('Your Shopping Basket')
  expect(wrapper).toIncludeText('2 items in your shopping basket')
  expect(wrapper).not.toContainReact(<CartNoData />)
  expect(wrapper).toContainReact(<LineItems cart={cart} updateQuantity={updateQuantity} aria-label='Line Items' />)
  expect(wrapper).toContainReact(<CartSummary cart={cart} updateQuantity={updateQuantity} aria-label='Cart Summary' />)
})
