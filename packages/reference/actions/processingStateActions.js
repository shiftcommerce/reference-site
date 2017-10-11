// actionTypes
import * as types from './actionTypes'

export function setLoadingTo (boolean) {
  return {
    type: types.SET_PROCESS_LOADING,
    loading: boolean
  }
}

export function setErroredTo (boolean) {
  return {
    type: types.SET_PROCESS_ERRORED,
    errored: boolean
  }
}
