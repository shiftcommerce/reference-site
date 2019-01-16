import * as accountActions from '../../../client/actions/account-actions'
import * as actionTypes from '../../../client/actions/action-types'

test('return CLEAR_ACCOUNT_ERRORS action type on calling clearErrors()', () => {
  // Act
  const action = accountActions.clearErrors()

  // Assert
  expect(action.type).toEqual(actionTypes.CLEAR_ACCOUNT_ERRORS)
})
