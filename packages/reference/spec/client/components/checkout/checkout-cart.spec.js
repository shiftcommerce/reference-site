// Components
import CheckoutCart from '../../../../client/components/checkout/checkout-cart'

const updateQuantityfnc = jest.fn()

describe('Checkout Cart', () => {
  test('renders the correct cart summary with single line item', () => {
    // arrange
    const cart = {
      total: 20,
      line_items: [
        {
          total: 20,
          sub_total: 20,
          total_discount: 0,
          unit_quantity: 2,
          sku: '123',
          stock_available_level: '1000',
          item: {
            imageUrl: 'https://shift-platform-dev-assets.s3-eu-west-1.amazonaws.com/uploads/asset_file/asset_file/145854/1506433071.3858652-S2658934_C101_Main.jpg',
            title: 'Test Variant',
            product: {
              slug: '1',
              canonical_path: '1',
              title: 'Test Product'
            }
          }
        }
      ]
    }

    // act
    const wrapper = mount(
      <CheckoutCart cart={cart} updateQuantity={updateQuantityfnc} />
    )

    // assert
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('a.c-line-items__amount')).toIncludeText('£20')
    expect(wrapper.find('h4.c-line-items__details-title')).toIncludeText('Test Product')
  })

  test('renders the correct cart summary with multiple line items', () => {
    // arrange
    const cart = {
      total: 25,
      line_items: [
        {
          total: 10,
          sub_total: 10,
          total_discount: 0,
          unit_quantity: 2,
          sku: '123',
          stock_available_level: '1000',
          item: {
            imageUrl: 'https://shift-platform-dev-assets.s3-eu-west-1.amazonaws.com/uploads/asset_file/asset_file/145854/1506433071.3858652-S2658934_C101_Main.jpg',
            title: 'Test Variant',
            product: {
              slug: '1',
              canonical_path: '1',
              title: 'Test Product'
            }
          }
        },
        {
          total: 5,
          sub_total: 5,
          total_discount: 0,
          unit_quantity: 1,
          sku: '123',
          stock_available_level: '1000',
          item: {
            imageUrl: 'https://shift-platform-dev-assets.s3-eu-west-1.amazonaws.com/uploads/asset_file/asset_file/145854/1506433071.3858652-S2658934_C101_Main.jpg',
            title: 'Pretend Variant',
            product: {
              slug: '2',
              canonical_path: '1',
              title: 'Pretend Product'
            }
          }
        }
      ]
    }

    // act
    const wrapper = mount(
      <CheckoutCart cart={cart} updateQuantity={updateQuantityfnc} />
    )

    // assert
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('div.c-line-items')).toIncludeText('Test Product')
    expect(wrapper.find('div.c-line-items')).toIncludeText('Pretend Product')
  })
})
