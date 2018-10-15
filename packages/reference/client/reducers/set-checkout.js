// actionTypes
import * as types from '../actions/action-types'

// libs
import CheckoutStepTransitionManager from '../lib/checkout-step-transition-manager'

const addressFormFields = {
  country_code: '',
  first_name: '',
  last_name: '',
  companyName: '',
  companyNameShown: '',
  line_1: '',
  line_2: '',
  address2Shown: '',
  zipcode: '',
  city: '',
  state: '',
  primary_phone: '',
  email: '',
  newsletterOptIn: false,
  collapsed: false,
  completed: false,
  errors: {}
}

export const checkoutInitialState = {
  error: false,
  shippingAddress: {
    ...addressFormFields
  },
  shippingMethod: {
    collapsed: true,
    completed: false
  },
  billingAddress: {
    ...addressFormFields
  },
  shippingAddressAsBillingAddress: true,
  paymentMethod: {
    collapsed: true,
    completed: false,
    selectedMethod: 'card'
  },
  reviewOrder: {
    collapsed: true,
    completed: false
  },
  currentStep: 1
}

export default function setCheckout (state = checkoutInitialState, action) {
  let newState = Object.assign({}, state)

  switch (action.type) {
    case types.SET_CHECKOUT_INPUT_VALUE:
      newState[action.payload.formName][action.payload.fieldName] = action.payload.fieldValue
      newState.billingAddress[action.payload.fieldName] = action.payload.fieldValue
      newState.updatedAt = new Date()
      return newState

    case types.SET_CHECKOUT_INPUT_VALIDATION_MESSAGE:
      let errors = Object.assign({}, newState[action.payload.formName]['errors'], { [action.payload.fieldName]: action.payload.validationMessage })
      Object.assign(newState[action.payload.formName], { errors: errors })
      newState.updatedAt = new Date()
      return newState

    case types.SET_CHECKOUT_INPUT_SHOWN:
      newState[action.payload.formName][action.payload.fieldName] = true
      newState.updatedAt = new Date()
      return newState

    case types.TOGGLE_CHECKOUT_COMPONENT_COLLAPSED:
      return new CheckoutStepTransitionManager(action.payload.eventType, action.payload.componentName, newState).call()

    case types.SET_SHIPPING_METHOD:
      Object.assign(newState.shippingMethod, action.payload.shippingMethod)
      newState.updatedAt = new Date()
      return newState

    case types.CHANGE_BILLING_ADDRESS:
      newState[action.payload.fieldName] = action.payload.fieldValue
      if (action.payload.fieldValue) {
        Object.assign(newState.billingAddress, newState.shippingAddress, { collapsed: false })
      } else {
        Object.assign(newState.billingAddress, addressFormFields)
      }
      newState.updatedAt = new Date()
      return newState

    // For storing checkout loaded from indexedDB
    case types.STORE_CHECKOUT:
      newState = action.checkout
      return newState

    case types.INITIATE_CHECKOUT:
      return Object.assign({}, checkoutInitialState)

    case types.CHANGE_PAYMENT_METHOD:
      newState.paymentMethod.selectedMethod = action.paymentMethod
      return newState

    default:
      return newState
  }
}
