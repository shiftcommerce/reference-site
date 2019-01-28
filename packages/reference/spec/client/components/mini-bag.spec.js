import { MiniBag } from '../../../client/components/mini-bag'

test('renders the minibag links', () => {
  // arrange
  const cart = {
    line_items: [],
    line_items_count: 0
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
    line_items: [],
    line_items_count: 0
  }
  const dispatch = () => {}

  // act
  const wrapper = mount(
    <MiniBag cart={cart} dispatch={dispatch} />
  )

  // assert
  expect(wrapper.find('div.c-minibag__cart')).toIncludeText('0')
})

test('renders the line item quantity as expected, when line items are present', () => {
  // arrange
  const cart = {
    line_items: [
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
    ],
    line_items_count: 2
  }
  const dispatch = () => {}

  // act
  const wrapper = mount(
    <MiniBag cart={cart} dispatch={dispatch} />
  )

  // assert
  expect(wrapper.find('div.c-minibag__cart')).toIncludeText('2')
})

test('renders an active checkout button when cart has items', () => {
  // arrange
  const cart = {
    line_items: [
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
    ],
    line_items_count: 2
  }
  const dispatch = () => {}

  // act
  const wrapper = mount(
    <MiniBag cart={cart} dispatch={dispatch} />
  )

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper.find('button')).toMatchElement(<button>Checkout</button>)
  expect(wrapper.find('.o-button')).not.toHaveClassName('o-button--disabled')
})

test('renders a disabled checkout button when cart is empty', () => {
  // arrange
  const cart = {
    line_items: [],
    line_items_count: 0
  }
  const dispatch = () => {}

  // act
  const wrapper = mount(
    <MiniBag cart={cart} dispatch={dispatch} />
  )

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper.find('button')).toMatchElement(<button>Checkout</button>)
  expect(wrapper.find('.o-button')).toHaveClassName('o-button--disabled')
})
