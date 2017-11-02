// actionTypes
import * as actionTypes from './actionTypes'

// cartHandler
import * as cartHandler from './handlers/cartHandler'

// initial states
import { cartInitialState } from './../reducers/setCart'
import { checkoutInitialState } from './../reducers/setCheckout'

// localForage
import LocalForage from '../lib/localforage'
const localForage = new LocalForage()

// Return to reducer with the updated cart details
export function updateCart (cart) {
  return {
    type: actionTypes.UPDATE_CART_LINE_ITEMS,
    cart: Object.assign({}, cart, {loading: false})
  }
}

// Store the cart details in to the local redux store
export function storeCart (cart) {
  return {
    type: actionTypes.STORE_CART,
    cart: Object.assign({}, cart, {loading: false})
  }
}

export function initiateCart () {
  return {
    type: actionTypes.INITIATE_CART
  }
}

export function initiateCheckout () {
  return {
    type: actionTypes.INITIATE_CHECKOUT
  }
}

// This function will be called by minibag on every page load
// It will initialize cart lineitems
export function readCart () {
  return (dispatch, getState) => {
    let cart = getState().cart

    // check if local redux has line items
    if (cart.totalQuantity === 0) {
      // check if indexedDB, if local redux store dont have line item
      // This is to ensure, we dont miss line items on page refresh
      return localForage.getValue('cart').then((cart) => {
        // if indexedDB also dont have lineitems,
        // initalize cart
        if (cart === null) {
          dispatch(initializeCart())
        }
        // update local redux store
        dispatch(storeCart(cart))

        return cart
      })
    // if local redux store has line items,
    // dispatch them
    } else {
      dispatch(storeCart(cart))
      return Promise.resolve(cart)
    }
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

export function initializeCart () {
  return (dispatch) => {
    dispatch(initiateCart())
    dispatch(initiateCheckout())
    localForage.setValue('cart', cartInitialState)
    localForage.setValue('checkout', checkoutInitialState)
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
