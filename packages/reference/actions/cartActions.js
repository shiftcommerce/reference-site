// actionTypes
import * as actionTypes from '../constants/actionTypes'

// localForage
import LocalForage from '../lib/localforage'
const localForage = new LocalForage()

// This function will be called my minibag on every page load
// It will initialize cart lineitems
export function initializeCart () {
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
          cart = {lineItems: []}
        }
        // update local redux store
        dispatch(updateCart(cart))
      })
    // if local redux store has line items,
    // dispatch them
    } else {
      dispatch(updateCart(cart))
    }
    return cart
  }
}

function addOrUpdateLineItems (cart, lineItem, dispatch) {
  let existingLineItem = false
  // update line item quantity if already exists
  cart.lineItems.map((li, index) => {
    if (li.sku === lineItem.sku) {
      li.quantity += lineItem.quantity
      existingLineItem = true
    }
  })
  // push line item, if not exists
  if (existingLineItem === false) {
    cart.lineItems.push(lineItem)
  }

  // update local redux store
  dispatch(updateCart(cart))
  // update indexedDB
  localForage.setValue('cart', cart)
}

// This function will be called, when user add items to bag
// in product detail page. If a line item already exists, it
// will add the new quantity to the existing one
export function addToCart (lineItem) {
  return (dispatch, getState) => {
    // This call will be moved to minibag in next PR
    initializeCart()
    let cart = getState().cart
    addOrUpdateLineItems(cart, lineItem, dispatch)
  }
}

// Return to reducer with the updated cart details
export function updateCart (cart) {
  return {
    type: actionTypes.UPDATE_CART_LINE_ITEMS,
    cart: cart
  }
}

//  This function used to fetch cart details on
// cart page initial load.
export function readCart () {
  return (dispatch, getState) => {
    let cart = getState().cart
    //  Check for line items in local redux store
    if (cart.lineItems.length === 0) {
      // Check in indexedDB if, local redux store dont have
      // any line items.
      localForage.getValue('cart').then((cart) => {
        dispatch(storeCart(cart))
      })
    } else {
      dispatch(storeCart(cart))
    }
  }
}

// Store the cart details in to the local redux store
export function storeCart (cart) {
  return {
    type: actionTypes.STORE_CART,
    cart: cart
  }
}
