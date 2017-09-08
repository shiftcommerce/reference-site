// actionTypes
import * as types from '../constants/actionTypes'

// Actions
import { resetProcesses, setLoadingTo, setErroredTo } from './processingStateActions'

// Libs
import ApiClient from '../lib/ApiClient'

export function setProduct (data) {
  return {
    type: types.SET_PRODUCT,
    payload: data
  }
}

export function readProduct (productID) {
  return (dispatch) => {
    dispatch(resetProcesses())
    dispatch(setLoadingTo(true))

    const queryObject = { include: 'variants,asset_files' }
    const endpoint = `/pim/v1/products/${productID}.json_api`

    return new ApiClient().read(endpoint, queryObject)
      .then((response) => {
        dispatch(setLoadingTo(false))
        if (response.status === 200) {
          dispatch(setProduct(response.data))
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
