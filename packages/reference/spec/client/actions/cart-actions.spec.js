import * as cartActions from '../../../client/actions/cart-actions'
import * as actionTypes from '../../../client/actions/action-types'
import { initiateCheckout } from '../../../client/actions/checkout-actions'

// Mock localforage module
jest.mock('../../../client/lib/localforage')

test('return STORE_CART action type on calling readCart()', () => {
  // arrange
  const fn = cartActions.readCart()
  const dispatch = jest.fn()
  let cart = {
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
  const getState = () => ({ cart: cart })

  // act
  fn(dispatch, getState)

  // assert
  expect(fn).toEqual(expect.any(Function))
  expect(dispatch).toHaveBeenCalledWith({ 'cart': cart, type: actionTypes.STORE_CART })
})

test('return UPDATE_CART_LINE_ITEMS action type on calling addToCart()', () => {
  // arrange
  const dispatch = jest.fn()
  const getState = () => ({ cart: { lineItems: [], totalQuantity: 0 } })

  const lineItemToAdd = {
    title: 'test',
    price: 10,
    discount: 0,
    quantity: 2,
    sku: '123',
    imageUrl: '',
    size: 'size - 8'
  }

  const fn = cartActions.addToCart(lineItemToAdd)

  // act
  fn(dispatch, getState)

  // assert
  expect(fn).toEqual(expect.any(Function))
  expect(dispatch).toHaveBeenCalledWith({ 'cart': { 'lineItems': [lineItemToAdd],
    totalQuantity: 2 },
  type: actionTypes.UPDATE_CART_LINE_ITEMS })
})

test('return UPDATE_CART_LINE_ITEMS action type on calling updateQuantity()', () => {
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
  const lineItemToAdd = {
    quantity: 3,
    sku: '123'
  }
  const expectedCart = {
    lineItems: [
      {
        title: 'test',
        price: 10,
        discount: 0,
        quantity: 3,
        sku: '123',
        imageUrl: '',
        size: 'size - 8'
      }
    ],
    totalQuantity: 3
  }
  const dispatch = jest.fn()
  const getState = () => ({ cart: cart })

  const fn = cartActions.updateQuantity(lineItemToAdd)
  // act
  fn(dispatch, getState)

  // assert
  expect(fn).toEqual(expect.any(Function))
  expect(dispatch).toHaveBeenCalledWith({ 'cart': expectedCart, type: actionTypes.UPDATE_CART_LINE_ITEMS })
})

test('return INITIALIZE_CART action type on calling initializeCart()', () => {
  // arrange
  const fn = cartActions.initializeCart()
  const dispatch = jest.fn()
  const getState = () => ({ })

  // act
  fn(dispatch, getState)

  // assert
  expect(fn).toEqual(expect.any(Function))
  expect(dispatch).toHaveBeenCalledWith({ type: actionTypes.INITIATE_CART })
})

test('return INITIALIZE_CHECKOUT action type on calling initializeCart()', () => {
  // arrange
  const fn = cartActions.initializeCart()
  const dispatch = jest.fn()
  const getState = () => ({ account: {} })

  // act
  fn(dispatch, getState)

  // assert
  expect(fn).toEqual(expect.any(Function))
  // Expect dispatch to have been called with function. Comparing function output with expected function output.
  const mockCall = dispatch.mock.calls[1]
  const mockCallFirstArgument = mockCall[0]
  expect(mockCallFirstArgument(jest.fn(), getState)).toEqual(initiateCheckout()(jest.fn(), getState))
})
