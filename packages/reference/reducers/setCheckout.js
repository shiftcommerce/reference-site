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
  },
  currentStep: 1
}

const mapComponentsToNextStep = {
  shippingAddress: 2, // 'View Shipping Options'
  shippingMethod: 3, // 'Continue to Payment'
  paymentMethod: 4 // 'Review Your Order'
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
      const componentName = action.payload.componentName
      const newCollapsedValue = !newState[componentName].collapsed
      const newStep = mapComponentsToNextStep[componentName]
      // If component has just been collapsed, and the component name maps to a step,
      // and we're not going back to edit an old step
      if (newCollapsedValue && newStep && newState.currentStep < newStep) {
        newState.currentStep = newStep
      }
      newState[componentName].collapsed = newCollapsedValue
      newState.updatedAt = new Date()
      return newState

    case types.SET_SHIPPING_METHOD:
      Object.assign(newState.shippingMethod, action.payload.shippingMethod)
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
