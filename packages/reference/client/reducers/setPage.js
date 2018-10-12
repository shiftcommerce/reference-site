// actionTypes
import * as types from '../actions/actionTypes'

export const initialState = {
  loading: true,
  error: false
}

export default function setPage (state = initialState, action) {
  switch (action.type) {
    case types.GET_PAGE:
      return Object.assign({}, state, { error: false })
    case types.SET_PAGE:
      return Object.assign({}, state, action.payload, { loading: false, error: false })
    case types.ERROR_PAGE:
      return Object.assign({}, state, action.payload, { loading: false })
    default:
      return state
  }
}
