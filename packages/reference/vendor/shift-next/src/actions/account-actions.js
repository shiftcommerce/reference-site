// actionTypes
import * as types from '../actions/action-types'

// Actions
import { readEndpoint } from './api-actions'

export function fetchAccountDetails (store) {
  return readEndpoint(accountRequest)
}

export function clearErrors () {
  return {
    type: types.CLEAR_ACCOUNT_ERRORS
  }
}

export function setLoggedInFromCookies () {
  return {
    type: types.SET_ACCOUNT,
    payload: {}
  }
}

export function getCustomerOrders () {
  return readEndpoint(customerOrdersRequest)
}

const accountRequest = {
  endpoint: '/getAccount',
  query: {},
  errorActionType: types.ERROR_ACCOUNT,
  requestActionType: types.GET_ACCOUNT,
  successActionType: types.SET_ACCOUNT
}

const customerOrdersRequest = {
  endpoint: `/customerOrders`,
  requestActionType: types.GET_CUSTOMER_ORDERS,
  successActionType: types.SET_CUSTOMER_ORDERS
}
