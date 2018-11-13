// actionTypes
import * as types from '../actions/action-types'

export const initialState = {
  first_name: '',
  last_name: '',
  email: '',
  errors: {},
  loggedIn: false
}

export default function setAccount (state = initialState, action) {
  switch (action.type) {
    case types.GET_ACCOUNT:
      return Object.assign({}, state)

    case types.SET_ACCOUNT:
      let accountObject

      if (action.payload) {
        accountObject = Object.assign(initialState, {
          first_name: action.payload.meta_attributes.first_name.value,
          last_name: action.payload.meta_attributes.last_name.value,
          email: action.payload.email,
          loggedIn: true
        })
      }

      return Object.assign({}, initialState, accountObject)

    case types.ERROR_ACCOUNT:
      return Object.assign({}, state, { errors: action.payload.error.data })

    default:
      return state
  }
}
