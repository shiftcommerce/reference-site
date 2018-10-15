// actionTypes
import * as types from '../actions/action-types'

export const initialState = {
  first_name: '',
  last_name: '',
  email: '',
  confirm_email: '',
  password: '',
  confirm_password: '',
  errors: {},
  validationErrors: [],
  loggedIn: false
}

export default function setAccount (state = initialState, action) {
  switch (action.type) {
    case types.SET_ACCOUNT_INPUT_VALUE:
      return Object.assign({}, state, { [action.payload.fieldName]: action.payload.fieldValue })

    case types.SET_ACCOUNT_INPUT_VALIDATION_MESSAGE:
      return Object.assign({}, state, { errors: { [action.payload.fieldName]: action.payload.validationMessage } })

    case types.SET_ACCOUNT:
      return Object.assign({}, state, action.payload, {
        loggedIn: true,
        validationErrors: []
      })

    case types.ERROR_ACCOUNT:
      return Object.assign({}, state, { validationErrors: action.payload.error.data })

    default:
      return state
  }
}
