// actionTypes
import * as actionTypes from './actionTypes'

// localForage
import LocalForage from '../lib/localforage'
const localForage = new LocalForage()

export function inputChange (formName, fieldName, fieldValue) {
  return (dispatch) => {
    dispatch(storeInputChange(formName, fieldName, fieldValue))
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

export function showField (formName, fieldName) {
  return {
    type: actionTypes.SET_CHECKOUT_INPUT_SHOWN,
    payload: {
      formName: formName,
      fieldName: fieldName
    }
  }
}

export function toggleCollapsed (componentName) {
  return {
    type: actionTypes.TOGGLE_CHECKOUT_COMPONENT_COLLAPSED,
    payload: {
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
    checkout: checkout
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
          checkout = {
            shippingAddress: {},
            billingAddress: {},
            paymentMethod: {
              shippingAddressAsBillingAddress: true
            }
          }
        }
        // update local redux store
        dispatch(storeCheckout(checkout))
      })
    // if local redux store has checkout data, dispatch it
    } else {
      dispatch(storeCheckout(checkout))
    }
    return checkout
  }
}
