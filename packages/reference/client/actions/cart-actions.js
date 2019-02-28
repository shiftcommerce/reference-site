// Libraries
import Cookies from 'js-cookie'

// Actions
import { postEndpoint, readEndpoint } from './api-actions'

// Lib
import ApiClient from '../lib/api-client'

import {
  addToCartRequest,
  fetchCartRequest,
  updateLineItemQuantityRequest,
  deleteLineItemRequest,
  setShippingAddressRequest,
  createShippingAddressRequest,
  setBillingAddressRequest,
  createBillingAddressRequest,
  setShippingMethodRequest
} from '../requests/cart-requests'

export function readCart (options = {}) {
  return (dispatch, getState) => {
    // Only fetch the cart if needed, otherwise do nothing
    if ((Cookies.get('cart') && !getState().cart.id) || options.force) {
      return dispatch(readEndpoint(fetchCartRequest()))
    } else {
      return Promise.resolve()
    }
  }
}

export function addToCart (variantId, quantity) {
  return postEndpoint(addToCartRequest(variantId, quantity))
}

export function updateLineItemQuantity (lineItemId, newQuantity) {
  return postEndpoint(updateLineItemQuantityRequest(lineItemId, newQuantity))
}

export function deleteLineItem (lineItemId) {
  return postEndpoint(deleteLineItemRequest(lineItemId))
}

export function setCartShippingAddress (addressId) {
  return postEndpoint(setShippingAddressRequest(addressId))
}

export function setCartBillingAddress (addressId) {
  return postEndpoint(setBillingAddressRequest(addressId))
}

export function createShippingAddress (address) {
  return postEndpoint(createShippingAddressRequest(address))
}

export function createBillingAddress (address) {
  return postEndpoint(createBillingAddressRequest(address))
}

export function setCartShippingMethod (shippingMethodId) {
  return postEndpoint(setShippingMethodRequest(shippingMethodId))
}

export function setCartCouponCode (couponCode) {
  return postEndpoint(addCartCouponRequest(couponCode))
}

const addCartCouponRequest = (couponCode) => {
  return {
    endpoint: '/addCartCoupon',
    body: { couponCode }
  }
}

export async function submitCoupon (couponCode) {
  const request = addCartCouponRequest(couponCode)
  const response = await new ApiClient().post(request.endpoint, request.body)
  if (response.status === 201) {
    return response.data
  }
  throw response.data
}

export function setAPIError (error, setErrors) {
  setErrors({ couponCode: error[0]['title'] })
}
