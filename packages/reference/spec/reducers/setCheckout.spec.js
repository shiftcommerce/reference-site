import setCheckout, { checkoutInitialState } from '../../reducers/setCheckout'
import * as actionTypes from '../../actions/actionTypes'

test('returns empty on dispatching INITIALIZE_CHECKOUT action', () => {
  // Arrange
  const payload = {
    type: actionTypes.INITIATE_CHECKOUT
  }

  // Act
  const result = setCheckout({}, payload)

  // Assert
  expect(result).toEqual(checkoutInitialState)
  expect(result.billingAddress.email).toBe('')
})
