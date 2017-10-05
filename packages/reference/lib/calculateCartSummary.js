export function calculateCartSummary (cart) {
  const lineItems = cart.lineItems
  let [ total, discount, tax, subTotal ] = [ 0, 0, 0, 0 ]

  lineItems.map((li, index) => {
    subTotal += (li.quantity * li.price)
    discount += (li.quantity * (li.discount || 0))
  })
  total = subTotal - discount + tax
  return {subTotal, total, tax, discount}
}
