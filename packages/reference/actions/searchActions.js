// actionTypes
import * as types from '../constants/actionTypes'

export function setSearchState (searchState) {
  return {
    type: types.SET_SEARCH_STATE,
    searchState: searchState
  }
}

export function setSearchQuery (query) {
  return {
    type: types.SET_SEARCH_QUERY,
    query: query
  }
}
