// Components
import CheckoutCartTotal from '../../../../client/components/checkout/checkout-cart-total'

// Fixtures
import { shippingMethods } from '../../../../client/static/shipping-methods.json'
import checkout from '../../../fixtures/checkout'
import order from '../../../fixtures/order'

// Lib
import { fixedPrice } from '../../../../client/lib/fixed-price'

test('renders the correct checkout cart total with single line item', () => {
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
        size: 'size - 8'
      }
    ]
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
  expect(wrapper).toIncludeText('Total Price:  £20')
  expect(wrapper).toIncludeText('Shipping costs:  Enter address')
  expect(wrapper).toIncludeText('TOTAL:  £20')
})

test('renders the correct checkout cart total with multiple line items', () => {
  // arrange
  const cart = {
    lineItems: [
      {
        title: 'Test Product',
        price: fixedPrice(10.0),
        discount: 0,
        quantity: 2
      },
      {
        title: 'Pretend Product',
        price: fixedPrice(5.0),
        discount: 0,
        quantity: 1
      }
    ]
  }

  const checkout = {
    shippingAddress: {},
    shippingMethod: {}
  }

  const order = {}

  // act
  const wrapper = mount(
    <CheckoutCartTotal cart={cart} checkout={checkout} order={order} />
  )

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('Total Price:  £25')
  expect(wrapper).toIncludeText('Shipping costs:  Enter address')
  expect(wrapper).toIncludeText('TOTAL:  £25')
})

test('renders the correct checkout cart costs with shipping address completed', () => {
  // arrange
  const cart = {
    lineItems: [
      {
        title: 'Test Product',
        price: fixedPrice(10.0),
        discount: 0,
        quantity: 2
      },
      {
        title: 'Pretend Product',
        price: fixedPrice(5.0),
        discount: 0,
        quantity: 1
      }
    ]
  }

  const checkout = {
    shippingAddress: {
      completed: true
    },
    shippingMethod: {}
  }

  const order = {}

  // act
  const wrapper = mount(
    <CheckoutCartTotal cart={cart} checkout={checkout} order={order} />
  )

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('Total Price:  £25')
  expect(wrapper).toIncludeText('Shipping costs:  Select shipping method')
  expect(wrapper).toIncludeText('TOTAL:  £25')
})

test('renders the correct checkout cart costs with shipping method selected', () => {
  // arrange
  const cart = {
    lineItems: [
      {
        title: 'Test Product',
        price: fixedPrice(10.0),
        discount: 0,
        quantity: 2
      },
      {
        title: 'Pretend Product',
        price: fixedPrice(5.0),
        discount: 0,
        quantity: 1
      }
    ]
  }

  const checkout = {
    shippingAddress: {
      completed: true
    },
    shippingMethod: shippingMethods[0]
  }

  const order = {}

  // act
  const wrapper = mount(
    <CheckoutCartTotal cart={cart} checkout={checkout} order={order} />
  )

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('Total Price:  £25')
  expect(wrapper).toIncludeText('Shipping costs:  £3.45')
  expect(wrapper).toIncludeText('TOTAL:  £28.45')
})

test('renders payment errors', () => {
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
        size: 'size - 8'
      }
    ]
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
    lineItems: [
      {
        title: 'Test Product',
        price: fixedPrice(10.0),
        discount: 0,
        quantity: 2,
        sku: '123',
        imageUrl: '',
        size: 'size - 8'
      }
    ]
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
    lineItems: [
      {
        title: 'Test Product',
        price: fixedPrice(10.0),
        discount: 0,
        quantity: 2,
        sku: '123',
        imageUrl: '',
        size: 'size - 8'
      }
    ]
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
    const dispatch = jest.fn().mockImplementation((test) => Promise.resolve('1234'))
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
      lineItems: [
        {
          title: 'Test Product',
          price: fixedPrice(10.0),
          discount: 0,
          quantity: 2
        },
        {
          title: 'Pretend Product',
          price: fixedPrice(5.0),
          discount: 0,
          quantity: 1
        }
      ]
    }

    // Act
    /* eslint-disable no-unused-vars */
    const wrapper = mount(
      <CheckoutCartTotal checkout={newCheckout} order={order} cart={cart} dispatch={dispatch} />
    )
    /* eslint-enable no-unused-vars */
    // Assert
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('button#place_order')).toBeDisabled()
  })

  test('should be disabled if there is any error in card details', () => {
    // Arrange
    const dispatch = jest.fn().mockImplementation((test) => Promise.resolve('1234'))
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
      lineItems: [
        {
          title: 'Test Product',
          price: fixedPrice(10.0),
          discount: 0,
          quantity: 2
        },
        {
          title: 'Pretend Product',
          price: fixedPrice(5.0),
          discount: 0,
          quantity: 1
        }
      ]
    }

    // Act
    /* eslint-disable no-unused-vars */
    const wrapper = mount(
      <CheckoutCartTotal checkout={newCheckout} order={newOrder} cart={cart} dispatch={dispatch} />
    )
    /* eslint-enable no-unused-vars */
    // Assert
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('button#place_order')).toBeDisabled()
  })
})
