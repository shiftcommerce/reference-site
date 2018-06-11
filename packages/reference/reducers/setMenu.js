// actionTypes
import * as types from '../actions/actionTypes'

export const initialState = {
  loading: true,
  error: false,
  data: []
}

export default function setMenu (state = initialState, action) {
  switch (action.type) {
    case types.SET_MENU:
      return Object.assign({}, state, action.payload)

    default:
      return state
  }
}
