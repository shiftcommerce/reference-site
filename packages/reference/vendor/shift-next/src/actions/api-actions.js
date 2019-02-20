// Libs
import ApiClient from '../lib/api-client'
import JsonApiParser from '../lib/json-api-parser'

export const readEndpoint = (request) => {
  return (dispatch) => {
    dispatchInitialAction(dispatch, request)
    return new ApiClient().read(request.endpoint, request.query)
      .then(processResponse(dispatch, request, [200, 304]))
      .catch((error) => {
        if (request.errorActionType) dispatch(setErroredTo(request.errorActionType, error, request))
      })
  }
}

export const postEndpoint = (request) => {
  return (dispatch) => {
    dispatchInitialAction(dispatch, request)
    return new ApiClient().post(request.endpoint, request.body)
      .then(response => {
        _determinePostDispatch(dispatch, request, response)
      })
      .catch(error => {
        if (request.errorActionType) dispatch(setErroredTo(request.errorActionType, error))
      })
  }
}

function dispatchInitialAction (dispatch, request) {
  if (request.requestActionType) {
    dispatch(fetching(request.requestActionType, request.requestActionData))
  }
}

function sendResponse (actionType, parsedPayload) {
  return {
    type: actionType,
    payload: parsedPayload
  }
}

function fetching (actionType, actionData) {
  return {
    type: actionType,
    data: actionData
  }
}

function setErroredTo (actionType, data, request) {
  return {
    type: actionType,
    payload: {
      error: {
        data: data,
        request: request
      }
    }
  }
}

function _checkForErrors (response) {
  let validationPassed = true
  // Validation for customer account form
  if (response.data.length > 0) {
    response.data.forEach(item => {
      if (parseInt(item.status) === 422 || parseInt(item.status) === 404) {
        validationPassed = false
      }
    })
  }

  return validationPassed
}

function processResponse (dispatch, request, expectedStatusCodes) {
  return (response) => {
    if (expectedStatusCodes.includes(response.status)) {
      if (request.successActionType) {
        const parsedPayload = new JsonApiParser().parse(response.data)
        // TODO: remove this when all endpoints have been extracted into shift-api
        const payload = parsedPayload || response.data
        dispatch(sendResponse(request.successActionType, payload))
      }
    } else {
      if (request.errorActionType) dispatch(setErroredTo(request.errorActionType, response.data, request))
    }
  }
}

function _determinePostDispatch (dispatch, request, response) {
  const validationPassed = _checkForErrors(response)

  if ((response.status === 202 || response.status === 201 || response.status === 200) && validationPassed) {
    if (request.successActionType) {
      const parsedPayload = new JsonApiParser().parse(response.data)
      // TODO: remove when all enpoints have been moved to shift-next
      const payload = parsedPayload || response.data
      dispatch(sendResponse(request.successActionType, payload))
    }
  } else {
    dispatch(setErroredTo(request.errorActionType, response.data))
  }
}