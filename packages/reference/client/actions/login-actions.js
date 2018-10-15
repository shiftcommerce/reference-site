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
    successActionType: actionTypes.SET_LOGIN,
    errorActionType: actionTypes.ERROR_LOGIN
  }
  return postEndpoint(request)
}

export function inputChange (fieldName, fieldValue) {
  return (dispatch) => {
    dispatch(storeInputChange(fieldName, fieldValue))
  }
}

export function setValidationMessage (fieldName, errorMessage) {
  return (dispatch) => {
    dispatch(storeValidationMessage(fieldName, errorMessage))
  }
}

// Store the input change info in the local redux store
export function storeInputChange (fieldName, fieldValue) {
  return {
    type: actionTypes.SET_LOGIN_INPUT_VALUE,
    payload: {
      fieldName: fieldName,
      fieldValue: fieldValue
    }
  }
}

export function storeValidationMessage (fieldName, validationMessage) {
  return {
    type: actionTypes.SET_LOGIN_INPUT_VALIDATION_MESSAGE,
    payload: {
      fieldName: fieldName,
      validationMessage: validationMessage
    }
  }
}
