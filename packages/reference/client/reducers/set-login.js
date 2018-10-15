// actionTypes
import * as types from '../actions/action-types'

export const initialState = {
  email: '',
  password: '',
  errors: {},
  validationErrors: [],
  loggedIn: false
}

export default function setLogin (state = initialState, action) {
  switch (action.type) {
    case types.SET_LOGIN_INPUT_VALUE:
      return Object.assign({}, state, { [action.payload.fieldName]: action.payload.fieldValue })

    case types.SET_LOGIN_INPUT_VALIDATION_MESSAGE:
      return Object.assign({}, state, { errors: { [action.payload.fieldName]: action.payload.validationMessage } })

    case types.SET_LOGIN:
      return Object.assign({}, state, action.payload, {
        loggedIn: true,
        validationErrors: []
      })

    case types.ERROR_LOGIN:
      return Object.assign({}, state, { validationErrors: action.payload.error.data })

    default:
      return state
  }
}
