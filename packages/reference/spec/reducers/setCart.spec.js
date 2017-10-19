import setCart, { cartInitialState } from '../../reducers/setCart'
import * as actionTypes from '../../actions/actionTypes'

test('returns empty on dispatching INITIALIZE_CART action', () => {
  // Arrange
  const payload = {
    type: actionTypes.INITIATE_CART
  }
  const expectResults = Object.assign({}, cartInitialState, {loading: false})

  // Act
  const result = setCart({}, payload)

  // Assert
  expect(result).toEqual(expectResults)
  expect(result.lineItems.length).toBe(0)
})
