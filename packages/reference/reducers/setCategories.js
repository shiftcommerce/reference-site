// actionTypes
import * as types from '../actions/actionTypes'

export const initialState = {
  loading: false,
  error: false,
  data: []
}

export default function setCategories (state = initialState, action) {
  switch (action.type) {
    case types.SET_CATEGORIES:
      return Object.assign({}, state, action.payload)

    default:
      return state
  }
}
