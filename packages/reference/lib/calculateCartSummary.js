export function calculateCartSummary (cart, checkout = {}) {
  const lineItems = cart.lineItems
  const shippingMethod = checkout.shippingMethod || {}
  const shipping = shippingMethod.cost || 0

  let [ total, discount, tax, subTotal ] = [ 0, 0, 0, 0 ]

  lineItems.map((li, index) => {
    subTotal += (li.quantity * li.price)
    discount += (li.quantity * (li.discount || 0))
  })
  total = subTotal - discount + tax + shipping

  const totals = {
    subTotal: subTotal,
    total: total,
    tax: tax,
    discount: discount,
    shipping: shipping
  }
  return totals
}
