// actionTypes
import * as types from '../actions/actionTypes'

export const initialState = {
  error: false
}

export default function setSlug (state = initialState, action) {
  switch (action.type) {
    case types.SET_SLUG:
      return Object.assign({}, state, action.payload)

    default:
      return state
  }
}
