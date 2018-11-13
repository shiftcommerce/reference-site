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
  validationErrors: []
}

export default function setRegistration (state = initialState, action) {
  switch (action.type) {
    case types.SET_REGISTRATION_INPUT_VALUE:
      return Object.assign({}, state, { [action.payload.fieldName]: action.payload.fieldValue })

    case types.SET_REGISTRATION_INPUT_VALIDATION_MESSAGE:
      return Object.assign({}, state, { errors: { [action.payload.fieldName]: action.payload.validationMessage } })

    case types.ERROR_REGISTRATION:
      return Object.assign({}, state, { errors: action.payload.error.data })

    default:
      return state
  }
}
