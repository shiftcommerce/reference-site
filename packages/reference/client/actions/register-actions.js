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

export function inputChange (formName, fieldName, fieldValue) {
  return (dispatch) => {
    dispatch(storeInputChange(formName, fieldName, fieldValue))
  }
}

export function setValidationMessage (formName, fieldName, errorMessage) {
  return (dispatch) => {
    dispatch(storeValidationMessage(formName, fieldName, errorMessage))
  }
}

// Store the input change info in the local redux store
export function storeInputChange (formName, fieldName, fieldValue) {
  return {
    type: actionTypes.SET_REGISTRATION_INPUT_VALUE,
    payload: {
      formName: formName,
      fieldName: fieldName,
      fieldValue: fieldValue
    }
  }
}

export function storeValidationMessage (formName, fieldName, validationMessage) {
  return {
    type: actionTypes.SET_REGISTRATION_INPUT_VALIDATION_MESSAGE,
    payload: {
      formName: formName,
      fieldName: fieldName,
      validationMessage: validationMessage
    }
  }
}
