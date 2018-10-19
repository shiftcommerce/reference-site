import setCheckout, { checkoutInitialState } from '../../../client/reducers/set-checkout'
import * as actionTypes from '../../../client/actions/action-types'

test('returns empty on dispatching INITIALIZE_CHECKOUT action', () => {
  // Arrange
  const payload = {
    type: actionTypes.INITIATE_CHECKOUT
  }

  const expectedResult = Object.assign({}, checkoutInitialState)

  // Act
  const result = setCheckout({}, payload)

  // Assert
  expect(result).toEqual(expectedResult)
  expect(result.billingAddress.email).toBe('')
})