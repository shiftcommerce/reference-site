import setCheckout, { checkoutInitialState } from '../../reducers/setCheckout'
import * as actionTypes from '../../actions/actionTypes'

test('returns empty on dispatching INITIALIZE_CHECKOUT action', () => {
  // Arrange
  const payload = {
    type: actionTypes.INITIATE_CHECKOUT
  }

  const expectedResult = Object.assign({}, checkoutInitialState, {loading: false})

  // Act
  const result = setCheckout({}, payload)

  // Assert
  expect(result).toEqual(expectedResult)
  expect(result.billingAddress.email).toBe('')
})
