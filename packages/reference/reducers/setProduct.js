// actionTypes
import * as types from '../constants/actionTypes'

// Parsers
import { parseJsonApiResource } from '../lib/jsonApiParsers'

export const initialState = {}

export default function setProduct (state = initialState, action) {
  switch (action.type) {
    case types.SET_PRODUCT:
      return Object.assign({}, state, parseJsonApiResource(action.payload))

    default:
      return state
  }
}
