// actionTypes
import * as types from '../constants/actionTypes'

// Parsers
import { parseJsonApiResource } from '../lib/jsonApiParsers'

export const initialState = {}

export default function setCategory (state = initialState, action) {
  switch (action.type) {
    case types.SET_CATEGORY:
      return Object.assign({}, state, parseJsonApiResource(action.payload))

    default:
      return state
  }
}
