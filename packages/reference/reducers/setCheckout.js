// actionTypes
import * as types from '../actions/actionTypes'

const addressFormFields = {
  country: '',
  fullName: '',
  companyName: '',
  companyNameShown: '',
  address1: '',
  address2: '',
  address2Shown: '',
  postCode: '',
  city: '',
  county: '',
  phone: '',
  email: '',
  newsletterOptIn: '',
  collapsed: false
}

const initialState = {
  shippingAddress: addressFormFields,
  shippingMethod: {
    collapsed: false
  },
  billingAddress: addressFormFields,
  paymentMethod: {
    shippingAddressAsBillingAddress: 'true',
    collapsed: false
  }
}

export default function setCheckout (state = initialState, action) {
  let newState = Object.assign({}, state)

  switch (action.type) {
    case types.SET_CHECKOUT_INPUT_VALUE:
      newState[action.payload.formName][action.payload.fieldName] = action.payload.fieldValue
      newState.updatedAt = new Date()
      return newState

    case types.SET_CHECKOUT_INPUT_SHOWN:
      newState[action.payload.formName][action.payload.fieldName] = true
      newState.updatedAt = new Date()
      return newState

    case types.TOGGLE_CHECKOUT_COMPONENT_COLLAPSED:
      const newValue = !newState[action.payload.componentName].collapsed
      newState[action.payload.componentName].collapsed = newValue
      newState.updatedAt = new Date()
      return newState

    // For storing checkout loaded from indexedDB
    case types.STORE_CHECKOUT:
      newState = action.checkout
      return newState

    default:
      return newState
  }
}
