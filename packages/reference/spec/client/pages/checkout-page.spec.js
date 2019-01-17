// Libraries
import Router from 'next/router'

// Pages
import { CheckoutPage } from '../../../client/pages/checkout'

// Fixtures
import cart from '../../fixtures/cart'
import checkout from '../../fixtures/checkout'

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    STRIPE_API_KEY: 'FAKE-STRIPE-API-KEY'
  }
}))

test('redirects to cart page when lineItems is empty', () => {
  // Arrange
  const cart = {
    lineItems: [],
    totalQuantity: 0
  }
  const checkout = {
    shippingAddress: {
      collapsed: false,
      completed: false,
      errors: {}
    },
    shippingMethod: {
      collapsed: false,
      completed: false
    },
    billingAddress: {
      collapsed: false,
      completed: false,
      errors: {}
    },
    paymentMethod: {
      collapsed: false,
      completed: false
    },
    currentStep: 1
  }

  // Mock out dispatch to synchronusly return a promise-like object
  const dispatch = jest.fn().mockImplementation((updateSpy) => ({ then: (f) => f(cart) }))

  // Mock next.js router
  const mockedRouter = { push: jest.fn() }
  Router.router = mockedRouter

  // Act
  mount(
    <CheckoutPage dispatch={dispatch} cart={cart} checkout={checkout} />
  )

  // Assert - verify that only one redirect happens
  expect(Router.router.push.mock.calls.length).toBe(1)

  // Assert - verify that the redirect goes to the cart page
  expect(Router.router.push.mock.calls[0][0]).toBe('/cart')
})

test('redirects to order confirmation page, on creating an order', () => {
  // Arrange
  const dispatch = jest.fn().mockImplementation((updateSpy) => Promise.resolve('first call'))
  const order = {}
  const newOrder = {
    id: 2332423424234,
    ...checkout
  }

  // Mock next.js router
  const mockedRouter = { push: jest.fn() }
  Router.router = mockedRouter

  // Act
  const wrapper = shallow(
    <CheckoutPage checkout={checkout} cart={cart} order={order} dispatch={dispatch} />
  )
  // Assert
  expect(wrapper).toMatchSnapshot()

  wrapper.setProps({
    order: newOrder
  })

  // Assert - verify that only one redirect happens
  expect(Router.router.push.mock.calls.length).toBe(1)

  // Assert - verify that the redirect goes to the order confirmation page
  expect(Router.router.push.mock.calls[0][0]).toBe('/order')
})

test('should not redirect to order confirmation page, if no new order got created', () => {
  // Arrange
  const dispatch = jest.fn().mockImplementation((updateSpy) => Promise.resolve('first call'))
  const order = {
    id: 2332423424234,
    ...checkout
  }

  // Mock next.js router
  const mockedRouter = { push: jest.fn() }
  Router.router = mockedRouter

  // Act
  const wrapper = shallow(
    <CheckoutPage checkout={checkout} cart={cart} order={order} dispatch={dispatch} />
  )
  // Assert
  expect(wrapper).toMatchSnapshot()

  // Assert - verify that only one redirect happens
  expect(Router.router.push.mock.calls.length).toBe(0)
})

test('should redirect to order confirmation page, if new order got created', () => {
  // Arrange
  const dispatch = jest.fn().mockImplementation((updateSpy) => Promise.resolve('first call'))
  const order = {
    id: 2332423424234,
    ...checkout
  }
  const newOrder = {
    id: 1231312321,
    ...checkout
  }

  // Mock next.js router
  const mockedRouter = { push: jest.fn() }
  Router.router = mockedRouter

  // Act
  const wrapper = shallow(
    <CheckoutPage checkout={checkout} cart={cart} order={order} dispatch={dispatch} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()

  wrapper.setProps({
    order: newOrder
  })

  // Assert - verify that only one redirect happens
  expect(Router.router.push.mock.calls.length).toBe(1)

  // Assert - verify that the redirect goes to the order confirmation page
  expect(Router.router.push.mock.calls[0][0]).toBe('/order')
})
