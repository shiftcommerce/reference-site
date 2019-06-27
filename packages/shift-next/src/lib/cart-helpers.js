/**
 * Check if all the line items in the cart are valid
 * @param  {Object}  cart
 * @return {Boolean}
 */
export const canCheckout = (cart) => {
  if (cart.line_items) {
    const invalidLineItem = cart.line_items.find((lineItem) => {
      return lineItem.unit_quantity > lineItem.stock_available_level
    })

    if (invalidLineItem) {
      return false
    }
  }

  return true
}
