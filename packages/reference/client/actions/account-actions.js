// Config
import { accountRequest } from '../requests/account-request'

// Actions
import { readEndpoint } from './api-actions'

// actionTypes
import * as actionTypes from './action-types'

export function fetchAccountDetails (store) {
  return readEndpoint(accountRequest)
}

export function clearErrors () {
  return {
    type: actionTypes.CLEAR_ACCOUNT_ERRORS
  }
}

export function setLoggedInFromCookies () {
  return {
    type: actionTypes.SET_LOGGED_IN,
    payload: {}
  }
}
