// actionTypes
import * as actionTypes from './action-types'

// checkout Handler
import * as checkoutHandler from './handlers/checkout-handler'

// localForage
import LocalForage from '../lib/localforage'
const localForage = new LocalForage()

export function inputChange (formName, fieldName, fieldValue) {
  return (dispatch) => {
    dispatch(storeInputChange(formName, fieldName, fieldValue))
  }
}

export function setValidationMessage (formName, fieldName, errorMessage) {
  return (dispatch) => {
    dispatch(storeValidationMessage(formName, fieldName, errorMessage))
  }
}

// Store the input change info in the local redux store
export function storeInputChange (formName, fieldName, fieldValue) {
  return {
    type: actionTypes.SET_CHECKOUT_INPUT_VALUE,
    payload: {
      formName: formName,
      fieldName: fieldName,
      fieldValue: fieldValue
    }
  }
}

export function storeValidationMessage (formName, fieldName, validationMessage) {
  return {
    type: actionTypes.SET_CHECKOUT_INPUT_VALIDATION_MESSAGE,
    payload: {
      formName: formName,
      fieldName: fieldName,
      validationMessage: validationMessage
    }
  }
}

export function showField (formName, fieldName) {
  return {
    type: actionTypes.SET_CHECKOUT_INPUT_SHOWN,
    payload: {
      formName: formName,
      fieldName: fieldName
    }
  }
}

export function toggleCollapsed (eventType, componentName) {
  return {
    type: actionTypes.TOGGLE_CHECKOUT_COMPONENT_COLLAPSED,
    payload: {
      eventType: eventType,
      componentName: componentName
    }
  }
}

export function inputComplete () {
  return (dispatch, getState) => {
    const checkout = getState().checkout
    storeCheckoutInLocalStorage(checkout)
  }
}

// Stores a checkout in redux store
export function storeCheckout (checkout) {
  return {
    type: actionTypes.STORE_CHECKOUT,
    checkout: Object.assign({}, checkout)
  }
}

// set shipping method details
export function setShippingMethod (shippingMethod) {
  return (dispatch, getState) => {
    const checkout = checkoutHandler.updateShippingMethod(getState().checkout, shippingMethod)
    dispatch(storeShippingMethod(checkout))
    storeCheckoutInLocalStorage(checkout)
  }
}

// Store shipping method details
export function storeShippingMethod (checkout) {
  return {
    payload: checkout,
    type: actionTypes.SET_SHIPPING_METHOD
  }
}

// Stores checkout in indexedDB, eventually we can update and/or duplicate this for API?
export function storeCheckoutInLocalStorage (checkout) {
  localForage.setValue('checkout', checkout)
}

// This function will be called by checkout every time the component is mounted
export function readCheckoutFromLocalStorage () {
  return (dispatch, getState) => {
    let checkout = getState().checkout
    // check if local redux store has no data
    if (checkout.updatedAt === undefined) {
      localForage.getValue('checkout').then((checkout) => {
        // if indexedDB is also empty, initialize an empty checkout
        if (checkout === null) {
          dispatch(initiateCheckout())
        } else {
          // update local redux store
          dispatch(storeCheckout(checkout))
        }
      })
    // if local redux store has checkout data, dispatch it
    } else {
      dispatch(storeCheckout(checkout))
    }
    return checkout
  }
}
export function initiateCheckout () {
  return {
    type: actionTypes.INITIATE_CHECKOUT
  }
}

export function changeBillingAddress (formName, fieldName, fieldValue) {
  return {
    type: actionTypes.CHANGE_BILLING_ADDRESS,
    payload: {
      formName: formName,
      fieldName: fieldName,
      fieldValue: fieldValue
    }
  }
}

export function changePaymentMethod (paymentMethod) {
  return {
    type: actionTypes.CHANGE_PAYMENT_METHOD,
    paymentMethod: paymentMethod
  }
}
