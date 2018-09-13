// Libs
import ApiClient from '../lib/ApiClient'
import JsonApiParser from '../lib/JsonApiParser'

export const readEndpoint = (request) => {
  return (dispatch, getState) => {
    dispatch(fetching(request.requestActionType))
    return new ApiClient().read(request.endpoint, request.query)
      .then(response => {
        if (response.status === 200 || response.status === 304) {
          const parsedPayload = new JsonApiParser().parse(response.data)
          dispatch(sendResponse(request.successActionType, parsedPayload))
        } else {
          dispatch(setErroredTo(request.errorActionType, response.data))
        }
      })
      .catch((error) => {
        dispatch(setErroredTo(request.errorActionType, error))
      })
  }
}

export const postEndpoint = (request) => {
  return (dispatch, getState) => {
    dispatch(fetching(request.requestActionType))
    return new ApiClient().post(request.endpoint, request.body)
      .then(response => {
        _determinePostDispatch(dispatch, request, response)
      })
      .catch(error => {
        dispatch(setErroredTo(request.errorActionType, error))
      })
  }
}

export function sendResponse (actionType, parsedPayload) {
  return {
    type: actionType,
    payload: parsedPayload
  }
}

function fetching (actionType) {
  return {
    type: actionType
  }
}

function setErroredTo (actionType, data) {
  return {
    type: actionType,
    payload: {
      error: {
        data: data
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

function _determinePostDispatch (dispatch, request, response) {
  const validationPassed = _checkForErrors(response)

  if (response.status === 201 || response.status === 200) {
    if (validationPassed) {
      const parsedPayload = new JsonApiParser().parse(response.data)
      dispatch(sendResponse(request.successActionType, parsedPayload))
    } else {
      dispatch(setErroredTo(request.errorActionType, response.data))
    }
  } else {
    dispatch(setErroredTo(request.errorActionType, response.data))
  }
}
