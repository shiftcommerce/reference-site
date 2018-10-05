import setCart, { cartInitialState } from '../../../client/reducers/setCart'
import * as actionTypes from '../../../client/actions/actionTypes'

test('returns empty on dispatching INITIALIZE_CART action', () => {
  // Arrange
  const payload = {
    type: actionTypes.INITIATE_CART
  }
  const expectResults = Object.assign({}, cartInitialState)

  // Act
  const result = setCart({}, payload)

  // Assert
  expect(result).toEqual(expectResults)
  expect(result.lineItems.length).toBe(0)
})
