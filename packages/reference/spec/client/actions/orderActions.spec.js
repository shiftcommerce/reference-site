import * as orderActions from '../../../client/actions/orderActions'
import * as actionTypes from '../../../client/actions/actionTypes'

// Mock orderHandler
jest.mock('../../../client/actions/handlers/orderHandler', () => ({
  convertCheckoutToOrder: () => {}
}))

// Mock api
jest.mock('../../../client/actions/apiActions', () => ({
  postEndpoint: () => 'API call made'
}))

test('return REQUEST_CARD_TOKEN action type on calling requestCardToken()', () => {
  // Act
  const action = orderActions.requestCardToken(true)

  // Assert
  expect(action.type).toEqual(actionTypes.REQUEST_CARD_TOKEN)
})

test('return SET_PAYMENT_ERROR action type on calling setPaymentError()', () => {
  // Act
  const action = orderActions.setPaymentError('Error message')

  // Assert
  expect(action.type).toEqual(actionTypes.SET_PAYMENT_ERROR)
  expect(action.value).toEqual('Error message')
})

test('dispatch SET_CARD_TOKEN and make the api call on calling setCardToken()', () => {
  // Act
  const fn = orderActions.setCardToken('token')
  const dispatch = jest.fn()

  const checkout = 'checkout'
  const cart = 'cart'
  const order = 'order'

  const getState = () => ({ checkout: checkout, cart: cart, order: order })

  fn(dispatch, getState)

  // Assert
  expect(fn).toEqual(expect.any(Function))
  expect(dispatch.mock.calls[0][0].type).toEqual(actionTypes.SET_CARD_TOKEN)
  expect(dispatch.mock.calls[1][0]).toEqual('API call made')
})
