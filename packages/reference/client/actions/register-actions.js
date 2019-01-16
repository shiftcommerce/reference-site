// actionTypes
import * as actionTypes from './action-types'

// Actions
import { postEndpoint } from './api-actions'

// Handler
import { registerPayload } from './handlers/register-handler'

export function createAccount (account) {
  const request = {
    endpoint: '/register',
    body: registerPayload(account),
    requestActionType: actionTypes.CREATE_ACCOUNT,
    successActionType: actionTypes.SET_ACCOUNT,
    errorActionType: actionTypes.ERROR_REGISTRATION
  }
  return postEndpoint(request)
}
