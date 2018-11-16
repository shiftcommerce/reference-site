export function calculateCartSummary (cart, checkout = {}) {
  const lineItems = cart.lineItems
  const shippingMethod = checkout.shippingMethod || {}
  const shipping = shippingMethod.retail_price_inc_tax || 0

  let [ total, discount, subTotal ] = [ 0, 0, 0 ]

  lineItems.map((li, index) => {
    subTotal += (li.quantity * li.price)
    discount += (li.quantity * (li.discount || 0))
  })
  total = subTotal - discount + shipping

  const totals = {
    subTotal: subTotal,
    total: total,
    discount: discount,
    shipping: shipping
  }
  return totals
}
