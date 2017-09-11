import LineItems from '../../../components/cart/LineItems'
import Image from '../../../objects/Image'

test('renders line items correctly, on initial load', () => {
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
    <LineItems cart={cart} updateQuantity={updateQuantity} />
  )

  // assert
  const lineItem = cart.lineItems[0]
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText(lineItem.title)
  expect(wrapper).toContainReact(<Image src={lineItem.imageUrl} alt={lineItem.title} className='c-line-items__image' aria-label={lineItem.title} />)
  expect(wrapper.find('select').props().value).toBe(lineItem.quantity)
  expect(wrapper).toIncludeText(lineItem.sku)
  expect(wrapper).toIncludeText(lineItem.size)
  expect(wrapper).toIncludeText((lineItem.price * lineItem.quantity) - (lineItem.discount))
})

test('trigger updateQuantity function, on change of line item quantity', () => {
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

  const updateQuantity = jest.fn()

  // act
  const wrapper = mount(
    <LineItems cart={cart} updateQuantity={updateQuantity} />
  )

  // assert
  wrapper.find('select').simulate('change', {target: { value: 3 }})
  expect(wrapper).toMatchSnapshot()
  expect(updateQuantity).toHaveBeenCalled()
})
