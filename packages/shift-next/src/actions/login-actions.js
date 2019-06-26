// actionTypes
import * as actionTypes from './action-types'

// Actions
import { postEndpoint } from './api-actions'

export function createLogin (account, options) {
  const request = {
    endpoint: '/login',
    body: createLoginPayload(account),
    requestActionType: actionTypes.GET_LOGIN,
    errorActionType: actionTypes.ERROR_LOGIN
  }
  console.log('request', request)
  return postEndpoint(request, options)
}

function createLoginPayload (login) {
  return {
    data: {
      type: 'customer_account_authentications',
      attributes: {
        email: login.email,
        password: login.password,
        meta_attributes: {}
      }
    }
  }
}
