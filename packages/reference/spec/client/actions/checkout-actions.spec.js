import * as checkoutActions from '../../../client/actions/checkout-actions'
import * as actionTypes from '../../../client/actions/action-types'

// Mock localforage module
jest.mock('../../../client/lib/localforage')

test('return STORE_CHECKOUT action type on calling readCheckoutFromLocalStorage()', () => {
  // Arrange
  const fn = checkoutActions.readCheckoutFromLocalStorage()
  const dispatch = jest.fn()
  const checkout = {
    shippingAddress: {
      fullName: 'Test Name'
    },
    loading: false,
    updatedAt: new Date()
  }
  const getState = () => ({ checkout: checkout })

  // Act
  fn(dispatch, getState)

  // Assert
  expect(fn).toEqual(expect.any(Function))
  expect(dispatch).toHaveBeenCalledWith({ checkout: checkout, type: actionTypes.STORE_CHECKOUT })
})

test('return SET_CHECKOUT_INPUT_VALUE on calling inputChange()', () => {
  // Arrange
  const dispatch = jest.fn()
  const checkout = {
    shippingAddress: {}
  }
  const getState = () => ({ checkout: checkout })

  const fn = checkoutActions.inputChange(
    'shippingAddress',
    'fullName',
    'Test Name'
  )
  const expectedPayload = {
    formName: 'shippingAddress',
    fieldName: 'fullName',
    fieldValue: 'Test Name'
  }

  // Act
  fn(dispatch, getState)

  // Asset
  expect(fn).toEqual(expect.any(Function))
  expect(dispatch).toHaveBeenCalledWith({ payload: expectedPayload, type: actionTypes.SET_CHECKOUT_INPUT_VALUE })
})

test('return SET_SHIPPING_METHOD on calling storeShippingMethod()', () => {
  // arrange
  const dispatch = jest.fn()
  const checkout = {
    shippingAddress: {
      firstName: 'George'
    }
  }
  const getState = () => ({ checkout: checkout })

  const shippingMethod = {
    id: '1'
  }
  const fn = checkoutActions.setShippingMethod(shippingMethod)
  const expectedPayload = {
    shippingMethod: shippingMethod,
    shippingAddress: {
      firstName: 'George'
    }
  }

  // act
  fn(dispatch, getState)

  // assert
  expect(fn).toEqual(expect.any(Function))
  expect(dispatch).toHaveBeenCalledWith({ payload: expectedPayload, type: actionTypes.SET_SHIPPING_METHOD })
})