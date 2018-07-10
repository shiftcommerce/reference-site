// actionTypes
import * as types from '../actions/actionTypes'

export const initialState = {
  loading: true,
  error: false
}

export default function setMenu (state = initialState, action) {
  switch (action.type) {
    case types.GET_MENU:
      return Object.assign({}, state)
    case types.SET_MENU:
      return Object.assign({}, state, action.payload, {loading: false})

    default:
      return state
  }
}
