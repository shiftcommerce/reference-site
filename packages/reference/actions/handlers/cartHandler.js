export function addToCart (cart, lineItem) {
  let existingLineItem = false
  // update line item quantity if already exists
  cart.lineItems.map((li, index) => {
    if (li.sku === lineItem.sku) {
      li.quantity += lineItem.quantity
      existingLineItem = true
    }
  })
  // push line item, if not exists
  if (existingLineItem === false) {
    cart.lineItems.push(lineItem)
  }

  return calculateTotalQuantity(cart)
}

export function updateCart (cart, lineItem) {
  let existingLineItemIndex = -1

  cart.lineItems.map((li, index) => {
    if (li.sku === lineItem.sku) {
      // Store the line item index, if its latest quantity is zero
      if (lineItem.quantity === 0) {
        existingLineItemIndex = index
      } else {
        // update line item quantity if already exists
        li.quantity = lineItem.quantity
      }
    }
  })

  // Delete line item if quantity is set to zero
  if (existingLineItemIndex !== -1) {
    cart.lineItems.splice(existingLineItemIndex, 1)
  }
  return calculateTotalQuantity(cart)
}

function calculateTotalQuantity (cart) {
  cart.totalQuantity = cart.lineItems.reduce((totalQuantity, li) => totalQuantity + li.quantity, 0)
  return cart
}
