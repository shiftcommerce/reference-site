// Components
import CheckoutCart from '../../../components/checkout/CheckoutCart'

// Lib 
import { fixedPrice } from '../../../lib/fixedPrice'

describe('Checkout Cart', () => {
  test('renders the correct cart summary with single line item', () => {
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
          size: 'size - 8',
          stockAvailableLevel: '1000',
          variant: '38 Waist 31 Leg',
          slug: '1',
          canonical_path: '1'
        }
      ]
    }

    // act
    const wrapper = mount(
      <CheckoutCart cart={cart} />
    )

    // assert
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('h4.c-line-items__details-title')).toIncludeText('Test Product')
    expect(wrapper.find('div.c-line-items__total-wrapper')).toIncludeText('£20')
  })

  test('renders the correct cart summary with multiple line items', () => {
    // arrange
    const cart = {
      lineItems: [
        {
          title: 'Test Product',
          price: fixedPrice(10.0),
          discount: 0,
          quantity: 2,
          stockAvailableLevel: '1000',
          variant: '38 Waist 31 Leg',
          slug: '1',
          canonical_path: '1'
        },
        {
          title: 'Pretend Product',
          price: fixedPrice(5.0),
          discount: 0,
          quantity: 1,
          stockAvailableLevel: '1000',
          variant: '38 Waist 31 Leg',
          slug: '1',
          canonical_path: '1'
        }
      ]
    }

    // act
    const wrapper = mount(
      <CheckoutCart cart={cart} />
    )

    // assert
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('div.c-line-items')).toIncludeText('Test Product')
    expect(wrapper.find('div.c-line-items')).toIncludeText('Pretend Product')
  })
})
