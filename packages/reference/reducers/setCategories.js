// actionTypes
import * as types from '../actions/actionTypes'

export const initialState = []

export default function setCategories (state = initialState, action) {
  switch (action.type) {
    case types.SET_CATEGORIES:
      return action.payload.data

    default:
      return state
  }
}
