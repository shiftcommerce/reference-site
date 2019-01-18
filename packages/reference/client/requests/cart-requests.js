import * as types from '../actions/action-types'

export const addToCartRequest = (variantId, quantity) => {
  return {
    endpoint: '/addToCart',
    body: { variantId, quantity },
    successActionType: types.CART_UPDATED
  }
}

export const fetchCartRequest = () => {
  return {
    endpoint: '/getCart',
    successActionType: types.CART_UPDATED
  }
}

export const fetchShippingMethodsRequest = () => {
  return {
    endpoint: '/getShippingMethods'
  }
}

export const updateLineItemQuantityRequest = (lineItemId, newQuantity) => {
  return {
    endpoint: '/updateLineItem',
    body: { lineItemId, newQuantity },
    successActionType: types.CART_UPDATED
  }
}

export const deleteLineItemRequest = (lineItemId) => {
  return {
    endpoint: `/deleteLineItem/${lineItemId}`,
    successActionType: types.CART_UPDATED
  }
}

export const setShippingAddressRequest = (addressId) => {
  return {
    endpoint: '/setCartShippingAddress',
    body: { addressId },
    successActionType: types.CART_UPDATED
  }
}

export const createShippingAddressRequest = (address) => {
  return {
    endpoint: '/createAddress',
    body: address,
    successActionType: types.SHIPPING_ADDRESS_CREATED
  }
}

export const setBillingAddressRequest = (addressId) => {
  return {
    endpoint: '/setCartBillingAddress',
    body: { addressId },
    successActionType: types.CART_UPDATED
  }
}

export const createBillingAddressRequest = (address) => {
  return {
    endpoint: '/createAddress',
    body: address,
    successActionType: types.BILLING_ADDRESS_CREATED
  }
}

export const setShippingMethodRequest = (shippingMethodId) => {
  return {
    endpoint: '/setShippingMethod',
    body: { shippingMethodId },
    successActionType: types.CART_UPDATED
  }
}

export const addCartCouponRequest = (couponCode) => {
  return {
    endpoint: '/addCartCoupon',
    body: { couponCode }
  }
}
