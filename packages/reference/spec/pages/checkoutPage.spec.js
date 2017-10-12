// Libraries
import { Provider } from 'react-redux'
import { createMockStore } from 'redux-test-utils'
import Router from 'next/router'

// Pages
import { CheckoutPage } from '../../pages/checkout'

// Actions
import { setShippingMethod } from '../../actions/checkoutActions'
import { initializeCart } from '../../actions/cartActions'

// Fixtures
import cart from '../fixtures/cart.fixture'
import checkout from '../fixtures/checkout.fixture'
import shippingMethods from '../fixtures/shippingMethods.fixture'

test('dispatch setShippingMethod action on changing shipping method', () => {
  // Arrange
  const initialState = {}
  const expectedFunction = setShippingMethod().toString()
  const setShippingMethodSpy = jest.spyOn(CheckoutPage.prototype, 'setShippingMethod')
  const dispatch = jest.fn().mockImplementation((updateSpy) => Promise.resolve('first call'))
  const selectedShippingMethod = shippingMethods.shippingMethods[0]

  // Act
  const wrapper = mount(
    <Provider store={createMockStore(initialState)}>
      <CheckoutPage checkout={checkout} cart={cart} dispatch={dispatch} />
    </Provider>
  )

  // Assert
  expect(wrapper).toMatchSnapshot()

  // Verify if cart line items are available
  expect(wrapper).toIncludeText('1 item')

  // To clear the logs of dispatch being called on component mount
  dispatch.mockClear()

  // Trigger quantity change
  wrapper.find(`input[id="${selectedShippingMethod.id}"]`).simulate('change', {target: { checked: true }})

  // Verify if setShippingMethod method is getting clicking shipping method
  expect(setShippingMethodSpy).toHaveBeenCalled()

  expect(dispatch).toHaveBeenCalled()

  // Verify it dispatch method called a function
  expect(dispatch.mock.calls[0][0]).toEqual(expect.any(Function))

  // Verify if the dispatch function has dispatched updateQuantity action.
  expect(dispatch.mock.calls[0][0].toString()).toMatch(expectedFunction)
})

test('redirects to cart page when lineItems is empty', () => {
  // Arrange
  const cart = {
    lineItems: []
  }
  const checkout = {
    shippingAddress: {
      collapsed: false
    },
    shippingMethod: {
      collapsed: false
    },
    billingAddress: {
      collapsed: false
    },
    paymentMethod: {
      collapsed: false
    },
    currentStep: 1
  }

  // Mock out dispatch to synchronusly return a promise-like object
  const dispatch = jest.fn().mockImplementation((updateSpy) => ({ then: (f) => f(cart) }))

  // Mock next.js router
  const mockedRouter = { push: jest.fn() }
  Router.router = mockedRouter

  // Act
  const wrapper = mount(
    <CheckoutPage dispatch={dispatch} cart={cart} checkout={checkout} />
  )

  // Assert - verify that only one redirect happens
  expect(Router.router.push.mock.calls.length).toBe(1)

  // Assert - verify that the redirect goes to the cart page
  expect(Router.router.push.mock.calls[0][0]).toBe('/cart')
})

test('redirects to order confirmation page, on creating an order', () => {
  // Arrange
  const initialState = {
    order: {}
  }
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
  const wrapper = mount(
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
  const initialState = {
    order: {}
  }
  const dispatch = jest.fn().mockImplementation((updateSpy) => Promise.resolve('first call'))
  const order = {
    id: 2332423424234,
    ...checkout
  }

  // Mock next.js router
  const mockedRouter = { push: jest.fn() }
  Router.router = mockedRouter

  // Act
  const wrapper = mount(
    <CheckoutPage checkout={checkout} cart={cart} order={order} dispatch={dispatch} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()

  // Assert - verify that only one redirect happens
  expect(Router.router.push.mock.calls.length).toBe(0)

})

test('should redirect to order confirmation page, if new order got created', () => {
  // Arrange
  const initialState = {
    order: {}
  }
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
  const wrapper = mount(
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

test('dispatch intializeCart action on creating an order', () => {
  // Arrange
  const expectedFunction = initializeCart().toString()
  const componentWillReceivePropsSpy = jest.spyOn(CheckoutPage.prototype, 'componentWillReceiveProps')
  const dispatch = jest.fn().mockImplementation((updateSpy) => Promise.resolve('first call'))
  const order = {
    id: 2332423424234,
    ...checkout
  }

  // Act
  const wrapper = mount(
    <CheckoutPage checkout={checkout} cart={cart} order={{}} dispatch={dispatch} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()

  // To clear the logs of dispatch being called on component mount
  dispatch.mockClear()

  wrapper.setProps({
    order: order
  })

  // Verify if componentWillRecieveProps method is called on order creation
  expect(componentWillReceivePropsSpy).toHaveBeenCalled()

  expect(dispatch).toHaveBeenCalled()

  // Verify it dispatch method called a function
  expect(dispatch.mock.calls[0][0]).toEqual(expect.any(Function))

  // Verify if the dispatch function has dispatched updateQuantity action.
  expect(dispatch.mock.calls[0][0].toString()).toMatch(expectedFunction)
})
