// actionTypes
import * as types from '../actions/actionTypes'

export const initialState = {}

export default function setProduct (state = initialState, action) {
  switch (action.type) {
    case types.SET_PRODUCT:
      return Object.assign({}, state, action.payload)

    default:
      return state
  }
}
