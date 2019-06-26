// actionTypes
import * as types from '../actions/action-types'

// Actions
import { readEndpoint, postEndpoint } from './api-actions'

// libs
import Config from '../lib/config'

const accountRequest = {
  endpoint: '/getAccount',
  errorActionType: types.ERROR_ACCOUNT,
  requestActionType: types.GET_ACCOUNT,
  successActionType: types.SET_ACCOUNT
}

export function fetchAccountDetails (options) {
  return readEndpoint(accountRequest, options)
}

export function updateCustomerAccount (details, options) {
  const request = {
    endpoint: '/updateCustomerAccount',
    body: {
      ...details
    },
    successActionType: types.SET_ACCOUNT
  }

  return postEndpoint(request, options)
}

export function clearErrors () {
  return {
    type: types.CLEAR_ACCOUNT_ERRORS
  }
}

export function setLoggedInFromCookies () {
  return {
    type: types.SET_LOGGED_IN,
    payload: {}
  }
}

export function getCustomerOrders (pageNumber, options) {
  // set offset & limit
  const pageLimit = parseInt(Config.get().customerOrdersPageLimit || 10)
  const pageOffset = parseInt(Config.get().customerOrdersPageOffset || 10)
  // build request params
  const customerOrdersRequest = {
    endpoint: `/customerOrders`,
    query: {
      page: { 
        limit: pageLimit,
        // calculate the page offset using pageNumber & page offset
        offset: (pageOffset * (parseInt(pageNumber) - 1))
      }
    },
    requestActionType: types.GET_CUSTOMER_ORDERS,
    successActionType: types.SET_CUSTOMER_ORDERS
  }
  return readEndpoint(customerOrdersRequest, options)
}

const forgottenPasswordRequest = (email) => {
  return {
    endpoint: '/forgotPassword',
    query: { email }
  }
}

export function requestPasswordResetEmail (email) {
  return readEndpoint(forgottenPasswordRequest(email))
}

export function passwordReset (token, password, options) {
  const request = {
    endpoint: '/passwordReset',
    body: {
      data: {
        type: 'password_recoveries',
        attributes: {
          token: token,
          password: password
        }
      }
    },
    successActionType: types.PASSWORD_RESET,
    errorActionType: types.ERROR_ACCOUNT
  }

  return postEndpoint(request, options)
}
