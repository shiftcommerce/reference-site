import { MiniBag } from '../../components/MiniBag'
import Link from 'next/link'

test('renders the minibag links', () => {
  // arrange
  const cart = {
    lineItems: [
      {
        title: 'test',
        price: 10,
        discount: 0,
        quantity: 2,
        sku: '123',
        image_url: '',
        size: 'size - 8',
        productSku: '1231',
        productID: 1
      }
    ]
  }
  const dispatch = () => {}

  // act
  const wrapper = shallow(
    <MiniBag cart={cart} dispatch={dispatch} />
  )

  // assert
  expect(wrapper).toMatchSnapshot()
})

test('renders the minibag links', () => {
  // arrange
  const cart = {
    lineItems: []
  }
  const dispatch = () => {}

  // act
  const wrapper = mount(
    <MiniBag cart={cart} dispatch={dispatch} />
  )

  // assert
  expect(wrapper).toIncludeText('View Your Bag(0)')
})

test('renders the line item quantity as expected, where are items', () => {
  // arrange
  const cart = {
    lineItems: [
      {
        title: 'test',
        price: 10,
        discount: 0,
        quantity: 2,
        sku: '123',
        image_url: '',
        size: 'size - 8',
        productSku: '1231',
        productID: 1
      }
    ]
  }
  const dispatch = () => {}

  // act
  const wrapper = mount(
    <MiniBag cart={cart} dispatch={dispatch} />
  )

  // assert
  expect(wrapper).toIncludeText('View Your Bag(1)')
})
