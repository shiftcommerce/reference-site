// actionTypes
import * as types from '../actions/actionTypes'

export const initialState = {
  loading: true,
  error: false
}

export default function setOrder (state = initialState, action) {
  switch (action.type) {
    case types.CREATE_ORDER:
      return Object.assign({}, state, action.payload)

    default:
      return state
  }
}
