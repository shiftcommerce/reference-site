// Libraries
import Cookies from 'js-cookie'

// Lib
import ApiClient from '../lib/api-client'

// Actions
import * as actionTypes from './action-types'
import { readEndpoint, postEndpoint } from './api-actions'

const fetchCartRequest = {
  endpoint: '/getCart',
  successActionType: actionTypes.CART_UPDATED
}

export function readCart (params = {}, options) {
  return (dispatch, getState) => {
    // Only fetch the cart if needed, otherwise do nothing
    if ((Cookies.get('cart') && !getState().cart.id) || params.force) {
      return dispatch(readEndpoint(fetchCartRequest, options))
    } else {
      return Promise.resolve()
    }
  }
}

const addToCartRequest = (variantId, quantity) => {
  return {
    endpoint: '/addToCart',
    body: { variantId, quantity },
    successActionType: actionTypes.CART_UPDATED
  }
}

export function addToCart (variantId, quantity, options) {
  return postEndpoint(addToCartRequest(variantId, quantity), options)
}

const updateLineItemQuantityRequest = (lineItemId, newQuantity) => {
  return {
    endpoint: '/updateLineItem',
    body: { lineItemId, newQuantity },
    successActionType: actionTypes.CART_UPDATED
  }
}

export function updateLineItemQuantity (lineItemId, newQuantity, options) {
  return postEndpoint(updateLineItemQuantityRequest(lineItemId, newQuantity), options)
}

const deleteLineItemRequest = (lineItemId) => {
  return {
    endpoint: `/deleteLineItem/${lineItemId}`,
    successActionType: actionTypes.CART_UPDATED
  }
}

export function deleteLineItem (lineItemId, options) {
  return postEndpoint(deleteLineItemRequest(lineItemId), options)
}

const addCartCouponRequest = (couponCode) => {
  return {
    endpoint: '/addCartCoupon',
    body: { couponCode }
  }
}

export const fetchShippingMethodsRequest = () => {
  return {
    endpoint: '/getShippingMethods'
  }
}

const setShippingMethodRequest = (shippingMethodId) => {
  return {
    endpoint: '/setShippingMethod',
    body: { shippingMethodId },
    successActionType: actionTypes.CART_UPDATED
  }
}

export function setCartShippingMethod (shippingMethodId, options) {
  return postEndpoint(setShippingMethodRequest(shippingMethodId), options)
}

export async function submitCoupon (couponCode) {
  const request = addCartCouponRequest(couponCode)
  const dispatch = null
  const response = await new ApiClient().post(request.endpoint, request.body, dispatch, { csrf: Cookies.get('_csrf') })
  if (response.status === 201) {
    return response.data
  }
  throw response.data
}

export function setAPIError (error, setErrors) {
  setErrors({ couponCode: error[0]['title'] })
}

const setBillingAddressRequest = (addressId) => {
  return {
    endpoint: '/setCartBillingAddress',
    body: { addressId },
    successActionType: actionTypes.CART_UPDATED
  }
}

export function setCartBillingAddress (addressId, options) {
  return postEndpoint(setBillingAddressRequest(addressId), options)
}

const setShippingAddressRequest = (addressId) => {
  return {
    endpoint: '/setCartShippingAddress',
    body: { addressId },
    successActionType: actionTypes.CART_UPDATED
  }
}

export function setCartShippingAddress (addressId, options) {
  return postEndpoint(setShippingAddressRequest(addressId), options)
}

const createShippingAddressRequest = (address) => {
  return {
    endpoint: '/createAddress',
    body: address,
    successActionType: actionTypes.SHIPPING_ADDRESS_CREATED
  }
}

export function createShippingAddress (address, options) {
  return postEndpoint(createShippingAddressRequest(address), options)
}

const createBillingAddressRequest = (address) => {
  return {
    endpoint: '/createAddress',
    body: address,
    successActionType: actionTypes.BILLING_ADDRESS_CREATED
  }
}

export function createBillingAddress (address, options) {
  return postEndpoint(createBillingAddressRequest(address), options)
}

export const setCartItemsCount = (count) => {
  return {
    type: actionTypes.SET_CART_ITEMS_COUNT,
    count
  }
}

export function toggleMiniBag (displayed) {
  return {
    type: actionTypes.TOGGLE_MINIBAG,
    displayed
  }
}
