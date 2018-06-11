// actionTypes
import * as types from '../actions/actionTypes'

export const initialState = {
  loading: true,
  error: false,
  data: {}
}

export default function setPage (state = initialState, action) {
  switch (action.type) {
    case types.SET_PAGE:
      return Object.assign({}, state, action.payload)

    default:
      return state
  }
}
