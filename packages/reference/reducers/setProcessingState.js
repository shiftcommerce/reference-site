// actionTypes
import * as types from '../actions/actionTypes'

export const initialState = {
  loading: false,
  errored: false
}

export default function setProcessingState (state = initialState, action) {
  switch (action.type) {
    case types.SET_PROCESS_LOADING:
      return Object.assign({}, state, { loading: action.loading })

    case types.SET_PROCESS_ERRORED:
      return Object.assign({}, state, { errored: action.errored })

    case types.RESET_PROCESSES:
      return state

    default:
      return state
  }
}
