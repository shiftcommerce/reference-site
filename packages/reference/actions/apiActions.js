// Actions
import { resetProcesses, setLoadingTo, setErroredTo } from './processingStateActions'

// Libs
import ApiClient from '../lib/ApiClient'
import JsonApiParser from '../lib/JsonApiParser'

export const readEndpoint = (request) => {
  return (dispatch, getState) => {
    dispatch(resetProcesses())
    dispatch(setLoadingTo(true))

    return new ApiClient().read(request.endpoint, request.query)
      .then((response) => {
        dispatch(setLoadingTo(false))
        if (response.status === 200) {
          const parsedPayload = new JsonApiParser().parse(response.data)

          dispatch({ type: request.successActionType, payload: parsedPayload })
        } else {
          dispatch(setErroredTo(true))
        }
      })
      .catch(() => {
        dispatch(setLoadingTo(false))
        dispatch(setErroredTo(true))
      })
  }
}
