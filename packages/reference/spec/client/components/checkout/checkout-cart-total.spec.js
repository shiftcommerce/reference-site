// Components
import CheckoutCartTotal from '../../../../client/components/checkout/checkout-cart-total'

// Fixtures
import checkout from '../../../fixtures/checkout'
import order from '../../../fixtures/order'

test("renders the cart's total, subtotal and shipping cost", () => {
  // arrange
  const cart = {
    sub_total: 15,
    total: 20,
    discount_summaries: [],
    shipping_method: {
      total: 5
    }
  }

  const checkout = {
    shippingAddress: {}
  }

  const order = {}

  // act
  const wrapper = mount(
    <CheckoutCartTotal cart={cart} checkout={checkout} order={order} title='Checkout Cart Summary' />
  )

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('Total Price:  £15.00')
  expect(wrapper).toIncludeText('Shipping costs:  £5.00')
  expect(wrapper).toIncludeText('TOTAL:  £20.00')
})

test('renders promotions', () => {
  // arrange
  const cart = {
    sub_total: 15,
    total: 20,
    discount_summaries: [{
      id: 1,
      name: 'Christmas Special',
      total: 1.5
    }],
    shipping_method: {
      total: 5
    }
  }

  const checkout = {
    shippingAddress: {}
  }

  const order = {}

  // act
  const wrapper = mount(
    <CheckoutCartTotal cart={cart} checkout={checkout} order={order} title='Checkout Cart Summary' />
  )

  // assert
  expect(wrapper).toIncludeText('Christmas Special:- £1.50')
})

test('renders shipping promotions', () => {
  // arrange
  const cart = {
    sub_total: 15,
    total: 20,
    shipping_method: {
      total: 5
    },
    discount_summaries: [],
    shipping_discount_name: 'Free shipping',
    shipping_total_discount: -5
  }

  const checkout = {
    shippingAddress: {}
  }

  const order = {}

  // act
  const wrapper = mount(
    <CheckoutCartTotal cart={cart} checkout={checkout} order={order} title='Checkout Cart Summary' />
  )

  // assert
  expect(wrapper).toIncludeText('Free shipping:- £5.00')
})

test('renders payment errors', () => {
  // arrange
  const cart = {
    sub_total: 15,
    total: 20,
    discount_summaries: [],
    shipping_method: {
      total: 5
    }
  }

  const checkout = {
    shippingAddress: {}
  }

  const order = {
    paymentError: 'Payment authentication failed'
  }

  // act
  const wrapper = mount(
    <CheckoutCartTotal cart={cart} checkout={checkout} order={order} />
  )

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('Payment authentication failed')
})

test('displays a correct disabled button when shipping address is not completed yet', () => {
  const checkout = {
    currentStep: 1,
    shippingAddress: {
      errors: []
    }
  }

  const cart = {
    sub_total: 15,
    total: 20,
    discount_summaries: []
  }

  const wrapper = mount(
    <CheckoutCartTotal checkout={checkout} order={{}} cart={cart} dispatch={jest.fn()} />
  )

  expect(wrapper.find('button.c-cart-summary__buttons--proceed')).toHaveText('Choose Shipping Method')
  expect(wrapper.find('button.c-cart-summary__buttons--proceed')).toHaveProp('disabled', true)
})

test('displays a correct enabled button when shipping address is completed', () => {
  const checkout = {
    currentStep: 1,
    shippingAddress: {
      first_name: 'John',
      last_name: 'Doe',
      primary_phone: '07510123123',
      email: 'john@example.com',
      country_code: 'UK',
      line_1: '1 Line',
      zipcode: 'Ls27EY',
      city: 'Leeds',
      errors: {}
    }
  }

  const cart = {
    sub_total: 15,
    total: 20,
    discount_summaries: []
  }

  const wrapper = mount(
    <CheckoutCartTotal checkout={checkout} order={{}} cart={cart} dispatch={jest.fn()} />
  )

  expect(wrapper.find('button.c-cart-summary__buttons--proceed')).toHaveText('Choose Shipping Method')
  expect(wrapper.find('button.c-cart-summary__buttons--proceed')).toHaveProp('disabled', false)
})

describe('Place Order button', () => {
  test('should be disabled if there is any error in billing address', () => {
    // Arrange
    const dispatch = jest.fn().mockImplementation((test) => Promise.resolve())
    const newCheckout = Object.assign({}, checkout, {
      paymentMethod: {
        ...checkout.paymentMethod,
        collapsed: false
      },
      billingAddress: {
        ...checkout.billingAddress,
        errors: {
          first_name: 'please fill the details'
        }
      },
      currentStep: 4
    })

    const cart = {
      sub_total: 15,
      total: 20,
      discount_summaries: []
    }

    // Act
    const wrapper = mount(
      <CheckoutCartTotal checkout={newCheckout} order={order} cart={cart} dispatch={dispatch} />
    )

    // Assert
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('button#place_order')).toBeDisabled()
  })

  test('should be disabled if there is any error in card details', () => {
    // Arrange
    const dispatch = jest.fn().mockImplementation((test) => Promise.resolve())
    const newCheckout = Object.assign({}, checkout, {
      paymentMethod: {
        ...checkout.paymentMethod,
        collapsed: false
      },
      currentStep: 4
    })

    const newOrder = {
      ...order,
      cardErrors: true
    }

    const cart = {
      sub_total: 15,
      total: 20,
      discount_summaries: []
    }

    // Act
    const wrapper = mount(
      <CheckoutCartTotal checkout={newCheckout} order={newOrder} cart={cart} dispatch={dispatch} />
    )

    // Assert
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('button#place_order')).toBeDisabled()
  })
})
