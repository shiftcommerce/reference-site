// actionTypes
import * as actionTypes from './action-types'

// Actions
import { postEndpoint } from './api-actions'

// Handler
import { createLoginPayload } from './handlers/login-handler'

export function createLogin (account) {
  const request = {
    endpoint: '/login',
    body: createLoginPayload(account),
    requestActionType: actionTypes.GET_LOGIN,
    errorActionType: actionTypes.ERROR_LOGIN
  }
  return postEndpoint(request)
}
