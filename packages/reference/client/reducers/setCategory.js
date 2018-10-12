// actionTypes
import * as types from '../actions/actionTypes'

export const initialState = {
  loading: true,
  error: false
}

export default function setCategory (state = initialState, action) {
  switch (action.type) {
    case types.GET_CATEGORY:
      return Object.assign({}, state)
    case types.SET_CATEGORY:
      return Object.assign({}, state, action.payload, { loading: false })

    default:
      return state
  }
}
