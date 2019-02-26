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

export function inputComplete () {
  return (dispatch, getState) => {
    const checkout = getState().checkout
    storeCheckoutInLocalStorage(checkout)
  }
}

// Stores a checkout in redux store
export function storeCheckout (checkout) {
  return (dispatch, getState) => {
    const customer = getState().account

    // If logged in set customer details if not already set
    if (customer.loggedIn) {
      [checkout.shippingAddress, checkout.billingAddress].forEach((addressObject) => {
        if (addressIsEmpty(addressObject)) {
          addressObject.first_name = addressObject.first_name || customer.first_name
          addressObject.last_name = addressObject.last_name || customer.last_name
          addressObject.email = addressObject.email || customer.email
        }
      })
    }

    return {
      type: actionTypes.STORE_CHECKOUT,
      checkout: Object.assign({}, checkout)
    }
  }
}

// Helper method to return whether an address object is empty/has blank values
function addressIsEmpty (addressObject) {
  const fields = ['first_name', 'last_name', 'email', 'primary_phone', 'country_code', 'companyName', 'line_1', 'line_2', 'zipcode', 'city', 'state']
  let emptyAddress = true

  for (const field of fields) {
    if (addressObject[field]) {
      emptyAddress = false
      break
    }
  }
  return emptyAddress
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
    const { checkout } = getState()
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
  return (dispatch, getState) => {
    const customer = getState().account

    let action = {
      type: actionTypes.INITIATE_CHECKOUT
    }

    if (customer.loggedIn === true) {
      action.customer = {
        first_name: customer.first_name,
        last_name: customer.last_name,
        email: customer.email
      }
    }

    return action
  }
}

export function autoFillAddress (address) {
  return {
    type: actionTypes.AUTOFILL_ADDRESS,
    address: address
  }
}
