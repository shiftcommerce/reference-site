import CartTable from '../../../../client/components/cart/cart-table'
import CartNoData from '../../../../client/components/cart/cart-no-data'
import LineItems from '../../../../client/components/cart/line-items'
import CartSummary from '../../../../client/components/cart/cart-summary'

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
        variant: 'Regular Fit Wool Mix Trousers',
        quantity: 2,
        stockAvailableLevel: 10000,
        price: '30',
        imageUrl: 'https://shift-platform-dev-assets.s3-eu-west-1.amazonaws.com/uploads/asset_file/asset_file/145854/1506433071.3858652-S2658934_C101_Main.jpg',
        productID: '70515',
        canonicalPath: '1',
        slug: '1',
        bundles: [
          {
            id: '261',
            slug: 'anna-outfit-1',
            canonical_path: '/bundles/anna-outfit-1',
            meta_attributes: {},
            name: 'Anna Outfit 1',
            asset_files: [
              {
                id: '157928',
                meta_attributes: {},
                asset_file: '1513767197.7652595-1847-_Anna_Outfit_1-3_099.jpg',
                s3_url: 'https://shift-platform-dev-assets.s3-eu-west-1.amazonaws.com/uploads/asset_file/asset_file/157928/1513767197.7652595-1847-_Anna_Outfit_1-3_099.jpg',
                canonical_path: 'https://shift-platform-dev-assets.s3-eu-west-1.amazonaws.com/uploads/asset_file/asset_file/157928/1513767197.7652595-1847-_Anna_Outfit_1-3_099.jpg'
              }
            ]
          }
        ]
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
