import Cookies from 'js-cookie'

/**
 * Gets and returns the line item count
 * If the line item count in the cart is different from the one stored in the
 * cookie, then update the cookie
 * @param  {Object} cart
 * @return {Number}
 */
export default (cart) => {
  const lineItemsCountLabel = 'lineItemsCount'
  let lineItemsCount = Cookies.get(lineItemsCountLabel)

  if (lineItemsCount || cart.line_items_count) {
    // Use `cart.line_items_count >= 0` instead of evaulating
    // `cart.line_items_count`, as the latter will be false if there are zero
    // line items
    if (cart.line_items_count >= 0 && cart.line_items_count !== lineItemsCount) {
      Cookies.set(lineItemsCountLabel, cart.line_items_count, { path: '/' })
      lineItemsCount = cart.line_items_count
    }

    return lineItemsCount
  }

  return 0
}
