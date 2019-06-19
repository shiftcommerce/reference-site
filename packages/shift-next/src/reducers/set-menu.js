// actionTypes
import * as types from '../actions/action-types'

export const initialState = {
  loading: false,
  loaded: false,
  error: false
}

export default function setMenu (state = initialState, action) {
  switch (action.type) {
    case types.GET_MENU:
      return Object.assign({}, state, action.payload, { loading: true, error: false, loaded: false })
    case types.SET_MENU:
      return Object.assign({}, state, action.payload, { loading: false, loaded: true, error: false })
    case types.ERROR_MENU:
      return Object.assign({}, state, action.payload, { error: true, loading: false, loaded: false })

    default:
      return state
  }
}
