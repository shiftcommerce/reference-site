// Libs
import ApiClient from '../lib/ApiClient'
import JsonApiParser from '../lib/JsonApiParser'

export const readEndpoint = (request) => {
  return (dispatch, getState) => {
    dispatch(fetching(request.requestActionType))
    return new ApiClient().read(request.endpoint, request.query)
      .then((response) => {
        if ((response.status === 200 || response.status === 304) || (!response.data && response.status === 200)) {
          const parsedPayload = new JsonApiParser().parse(response.data)
          dispatch(sendResponse(parsedPayload, request.successActionType))
        } else {
          dispatch(fetching(request.successActionType))
          dispatch(setErroredTo(request.errorActionType))
        }
      })
      .catch(() => {
        dispatch(fetching(false, request.successActionType))
        dispatch(setErroredTo(true, request.errorActionType))
      })
  }
}

export const postEndpoint = (request) => {
  return (dispatch, getState) => {
    dispatch(fetching(request.successActionType))
    return new ApiClient().post(request.endpoint, request.body)
      .then((response) => {
        if (response.status === 201) {
          const parsedPayload = new JsonApiParser().parse(response.data.data.data)
          dispatch({ type: request.successActionType, payload: Object.assign({}, parsedPayload) })
        } else {
          dispatch(fetching(false, request.successActionType))
          dispatch(setErroredTo(true, request.successActionType))
        }
      })
      .catch(() => {
        dispatch(fetching(false, request.successActionType))
        dispatch(setErroredTo(true, request.successActionType))
      })
  }
}

export function sendResponse (parsedPayload, actionType) {
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

function setErroredTo (boolean, actionType) {
  return {
    type: actionType,
    payload: {
      error: boolean
    }
  }
}
