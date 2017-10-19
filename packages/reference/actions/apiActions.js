// Libs
import ApiClient from '../lib/ApiClient'
import JsonApiParser from '../lib/JsonApiParser'

export const readEndpoint = (request) => {
  return (dispatch, getState) => {
    dispatch(setLoadingTo(true, request.successActionType))

    return new ApiClient().read(request.endpoint, request.query)
      .then((response) => {
        if (response.status === 200 || response.status === 304) {
          const parsedPayload = new JsonApiParser().parse(response.data)
          dispatch({ type: request.successActionType, payload: Object.assign({}, parsedPayload, {loading: false}) })
        } else {
          dispatch(setLoadingTo(false, request.successActionType))
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
        if (response.status === 200) {
          const parsedData = JSON.parse(response.data.data)
          const parsedPayload = new JsonApiParser().parse(parsedData.data)
          dispatch({ type: request.successActionType, payload: Object.assign({}, parsedPayload, {loading: false}) })
        } else {
          dispatch(setLoadingTo(false, request.successActionType))
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
    payload: {
      loading: boolean
    }
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
