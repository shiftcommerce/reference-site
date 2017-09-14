// actionTypes
import * as types from '../constants/actionTypes'

export const initialState = {
  query: null
}

export default function setSearchState (state = initialState, action) {
  switch (action.type) {
    case types.SET_SEARCH_STATE:
      let newState = Object.assign(state, action.searchState)
      Object.keys(newState).map((key) => {
        if (!action.searchState[key]) {
          delete newState[key]
        }
      })
      return newState

    case types.SET_SEARCH_QUERY:
      return Object.assign({}, state, { query: action.query })

    default:
      return state
  }
}
