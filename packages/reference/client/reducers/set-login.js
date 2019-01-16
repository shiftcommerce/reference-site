// actionTypes
import * as types from '../actions/action-types'

export const initialState = {
  errors: [],
  loggedIn: false
}

export default function setLogin (state = initialState, action) {
  switch (action.type) {
    case types.SET_LOGIN:
      return Object.assign({}, state, action.payload, {
        loggedIn: true
      })

    case types.ERROR_LOGIN:
      return Object.assign({}, state, { errors: action.payload.error.data })

    case types.CLEAR_ACCOUNT_ERRORS:
      return Object.assign({}, state, { errors: [] })

    default:
      return state
  }
}
