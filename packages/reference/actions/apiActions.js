// Libs
import ApiClient from '../lib/ApiClient'
import JsonApiParser from '../lib/JsonApiParser'

export const readEndpoint = (request) => {
  return (dispatch, getState) => {
    dispatch(setLoadingTo(true, request.successActionType))

    return new ApiClient().read(request.endpoint, request.query)
      .then((response) => {
        dispatch(setLoadingTo(false, request.successActionType))
        if (response.status === 200) {
          const parsedPayload = new JsonApiParser().parse(response.data)
          dispatch({ type: request.successActionType, payload: parsedPayload })
        } else {
          dispatch(setErroredTo(true, request.successActionType))
        }
      })
      .catch(() => {
        dispatch(setLoadingTo(false, request.successActionType))
        dispatch(setErroredTo(true, request.successActionType))
      })
  }
}

export const postEndpoint = (request) => {
  return (dispatch, getState) => {
    dispatch(setLoadingTo(true, request.successActionType))
    return new ApiClient().post(request.endpoint, request.body)
      .then((response) => {
        dispatch(setLoadingTo(false, request.successActionType))
        if (response.status === 200) {
          const parsedData = JSON.parse(response.data.data)
          const parsedPayload = new JsonApiParser().parse(parsedData.data)
          dispatch({ type: request.successActionType, payload: parsedPayload })
        } else {
          dispatch(setErroredTo(true, request.successActionType))
        }
      })
      .catch(() => {
        dispatch(setLoadingTo(false, request.successActionType))
        dispatch(setErroredTo(true, request.successActionType))
      })
  }
}

function setLoadingTo (boolean, actionType) {
  return {
    type: actionType,
    loading: boolean
  }
}

function setErroredTo (boolean, actionType) {
  return {
    type: actionType,
    errored: boolean
  }
}
