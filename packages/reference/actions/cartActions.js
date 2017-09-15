// actionTypes
import * as actionTypes from './actionTypes'

// cartHandler
import * as cartHandler from './../lib/cartHandler'

// localForage
import LocalForage from '../lib/localforage'
const localForage = new LocalForage()

// Return to reducer with the updated cart details
export function updateCart (cart) {
  return {
    type: actionTypes.UPDATE_CART_LINE_ITEMS,
    cart: cart
  }
}

// Store the cart details in to the local redux store
export function storeCart (cart) {
  return {
    type: actionTypes.STORE_CART,
    cart: cart
  }
}

// This function will be called my minibag on every page load
// It will initialize cart lineitems
export function readCart () {
  return (dispatch, getState) => {
    let cart = getState().cart
    // check if local redux has line items
    if (cart.lineItems.length === 0) {
      // check if indexedDB, if local redux store dont have line item
      // This is to ensure, we dont miss line items on page refresh
      localForage.getValue('cart').then((cart) => {
        // if indexedDB also dont have lineitems,
        // initalize cart
        if (cart === null) {
          cart = { lineItems: [] }
        }
        // update local redux store
        dispatch(storeCart(cart))
      })
    // if local redux store has line items,
    // dispatch them
    } else {
      dispatch(storeCart(cart))
    }
    return cart
  }
}

// This function will be called, when user add items to bag
// in product detail page. If a line item already exists, it
// will add the new quantity to the existing one
export function addToCart (lineItem) {
  return (dispatch, getState) => {
    let cart = getState().cart
    addOrUpdateLineItems(cart, lineItem, dispatch)
  }
}

export function updateQuantity (lineItem) {
  return (dispatch, getState) => {
    let cart = getState().cart
    cart = cartHandler.updateCart(cart, lineItem)
    dispatchUpdate(cart, dispatch)
  }
}

// Private functions

function addOrUpdateLineItems (cart, lineItem, dispatch) {
  cart = cartHandler.addToCart(cart, lineItem)
  dispatchUpdate(cart, dispatch)
}

function dispatchUpdate (cart, dispatch) {
  // update local redux store
  dispatch(updateCart(cart))
  // update indexedDB
  localForage.setValue('cart', cart)
}
