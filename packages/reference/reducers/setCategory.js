// actionTypes
import * as types from '../actions/actionTypes'

export const initialState = {
  loading: false,
  error: false
}

export default function setCategory (state = initialState, action) {
  switch (action.type) {
    case types.SET_CATEGORY:
      return Object.assign({}, state, action.payload)

    default:
      return state
  }
}
