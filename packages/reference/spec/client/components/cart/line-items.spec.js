import LineItems from '../../../../client/components/cart/line-items'
import Image from '../../../../client/objects/image'

import { fixedPrice } from '../../../../client/lib/fixed-price'

test('renders line items correctly, on initial load', () => {
  // arrange
  const cart = {
    lineItems: [
      {
        title: 'test',
        price: fixedPrice(10.0),
        discount: 0,
        quantity: 2,
        sku: '123',
        imageUrl: 'https://staging-matalanintegration-1452506760.s3.amazonaws.com/uploads/asset_file/asset_file/12917/S2623404_C146_Main.jpg',
        size: 'size - 8',
        stockAvailableLevel: '1000',
        variant: '38 Waist 31 Leg',
        canonicalPath: '1',
        slug: '1'
      }
    ]
  }

  const updateQuantity = () => {}

  // act
  const wrapper = shallow(
    <LineItems cart={cart} updateQuantity={updateQuantity} />
  )

  // assert
  const lineItem = cart.lineItems[0]
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText(lineItem.title)
  expect(wrapper).toContainReact(<Image src={lineItem.imageUrl} alt={lineItem.title} className='c-line-items__image' aria-label={lineItem.title} />)
  expect(wrapper.find('select').props().value).toBe(lineItem.quantity)
  expect(wrapper).toIncludeText(lineItem.sku)
  expect(wrapper).toIncludeText(lineItem.variant)
  expect(wrapper).toIncludeText((lineItem.price * lineItem.quantity) - (lineItem.discount))
})

test('trigger updateQuantity function, on change of line item quantity', () => {
  // arrange
  const cart = {
    lineItems: [
      {
        title: 'test',
        price: fixedPrice(10.0),
        discount: 0,
        quantity: 2,
        sku: '123',
        imageUrl: 'https://staging-matalanintegration-1452506760.s3.amazonaws.com/uploads/asset_file/asset_file/12917/S2623404_C146_Main.jpg',
        size: 'size - 8',
        stockAvailableLevel: '1000',
        variant: '38 Waist 31 Leg',
        canonicalPath: '1',
        slug: '1'
      }
    ]
  }

  const updateQuantity = jest.fn()

  // act
  const wrapper = shallow(
    <LineItems cart={cart} updateQuantity={updateQuantity} />
  )

  // assert
  wrapper.find('select').simulate('change', { target: { value: 3 } })
  expect(wrapper).toMatchSnapshot()
  expect(updateQuantity).toHaveBeenCalled()
})
