import * as checkoutActions from '../../actions/checkoutActions'
import * as actionTypes from '../../actions/actionTypes'

// Mock localforage module
jest.mock('../../lib/localforage')

test('return STORE_CHECKOUT action type on calling readCheckoutFromLocalStorage()', () => {
  // Arrange
  const fn = checkoutActions.readCheckoutFromLocalStorage()
  const dispatch = jest.fn()
  const checkout = {
    shippingAddress: {
      fullName: 'Test Name'
    },
    updatedAt: new Date()
  }
  const getState = () => ({ checkout: checkout })

  // Act
  fn(dispatch, getState)

  // Asset
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
