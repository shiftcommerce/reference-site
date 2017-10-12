// Update the cart shipping method
export function updateShippingMethod (checkout, shippingMethod) {
  checkout.shippingMethod = shippingMethod
  return checkout
}
