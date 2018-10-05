import CartTable from '../../../../client/components/cart/CartTable'
import CartNoData from '../../../../client/components/cart/CartNoData'
import LineItems from '../../../../client/components/cart/LineItems'
import CartSummary from '../../../../client/components/cart/CartSummary'

test('renders the exception messages when no line items are available', () => {
  // arrange
  const cart = {
    lineItems: [],
    totalQuantity: 0
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
    lineItems: [
      {
        sku: 'S2658934_C101_486',
        title: 'Regular Fit Wool Mix Trousers',
        variant: '38 Waist 31 Leg',
        quantity: 2,
        stockAvailableLevel: 10000,
        price: '30',
        imageUrl: 'https://shift-platform-dev-assets.s3-eu-west-1.amazonaws.com/uploads/asset_file/asset_file/145854/1506433071.3858652-S2658934_C101_Main.jpg',
        productID: '70515',
        canonicalPath: '1',
        slug: '1'
      }
    ],
    totalQuantity: 2
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
