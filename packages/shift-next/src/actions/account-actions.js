// actionTypes
import * as types from '../actions/action-types'

// Actions
import { readEndpoint, postEndpoint } from './api-actions'

const accountRequest = {
  endpoint: '/getAccount',
  errorActionType: types.ERROR_ACCOUNT,
  requestActionType: types.GET_ACCOUNT,
  successActionType: types.SET_ACCOUNT
}

export function fetchAccountDetails (options) {
  return readEndpoint(accountRequest, options)
}

export function updateCustomerPassword (details, options) {
  // 1. Login here and return directly the response
  // 2. If successful send on the postEndpoint for account update
  //
  // 
  console.log(details)
  const { password, newPassword, newPasswordConfirmation, email } = details

  const request = {
    endpoint: '/updateCustomerPassword',
    body: {
      login: {
        data: {
          type: 'customer_account_authentications',
          attributes: {
            email,
            password
          }
        }
      },
      updatePassword: {
        data: {
          type: 'customer_accounts',
          attributes: {
            email: email,
            password: newPassword,
            password_confirmation: newPasswordConfirmation
          }
        }
      }
    },
    errorActionType: types.ERROR_ACCOUNT
  }

  console.log('request in action updateCustomerPassword', request)
  console.log('request body', request.body)
  return postEndpoint(request, options)
}

export function updateCustomerAccount (details, options) {
  const request = {
    endpoint: '/updateCustomerAccount',
    body: {
      ...details
    },
    successActionType: types.SET_ACCOUNT
  }
  console.log('request body', request.body)
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

const customerOrdersRequest = {
  endpoint: `/customerOrders`,
  requestActionType: types.GET_CUSTOMER_ORDERS,
  successActionType: types.SET_CUSTOMER_ORDERS
}

export function getCustomerOrders (options) {
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
