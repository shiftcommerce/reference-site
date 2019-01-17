export function convertCheckoutToOrder (cart, checkout, order) {
  const lineItems = prepareLineItems(cart)

  const orderPayload = {
    attributes: {
      billing_address: prepareBillingAddress(cart.billing_address),
      channel: 'web',
      currency: 'GBP',
      email: checkout.shippingAddress.email,
      line_items_resources: prepareLineItems(cart),
      shipping_address: prepareShippingAddress(cart.shipping_address),
      shipping_method: prepareShippingMethod(cart.shipping_method),
      discount_summaries: discountSummaries(cart, lineItems),
      sub_total: cart.sub_total,
      total: cart.total,
      shipping_total: cart.shipping_total,
      tax: cart.tax,
      placed_at: new Date().toISOString()
    },
    type: 'create_order'
  }

  return {
    data: orderPayload,
    payment_method: checkout.paymentMethod.selectedMethod,
    card_token: order.cardToken
  }
}

function prepareLineItems (cart) {
  return cart.line_items.map((lineItem) => {
    return {
      attributes: {
        sku: lineItem.sku,
        title: lineItem.title,
        unit_quantity: lineItem.unit_quantity,
        unit_price: lineItem.unit_price,
        taxes: lineItem.tax,
        line_item_discounts: lineItem.line_item_discounts.map(discount => {
          return {
            id: discount.id,
            type: 'line_item_discounts',
            attributes: {
              line_item_number: discount.line_item_number,
              promotion_id: discount.promotion_id,
              total: discount.total
            }
          }
        })
      },
      type: 'line_items'
    }
  })
}

// To be tested and used when changes to v2 endpoint are deployed
//
// function prepareLineItems (cart) {
//   return cart.line_items.map((lineItem) => {
//     const eachExTax = lineItem.item.price_includes_taxes ? lineItem.unit_price / (1 + parseFloat(lineItem.tax_rate)) : lineItem.unit_price
//     const eachIncTax = lineItem.item.price_includes_taxes ? lineItem.unit_price : (1 + parseFloat(lineItem.tax_rate)) * lineItem.unit_price
//     const preDiscountLineTotalExTax = eachExTax * lineItem.unit_quantity
//     const preDiscountLineTotalIncTax = eachIncTax * lineItem.unit_quantity
//     const lineDiscountExTax = lineItem.item.price_includes_taxes ? lineItem.total_discount / (1 + parseFloat(lineItem.tax_rate)) : lineItem.total_discount
//     const lineDiscountIncTax = lineItem.item.price_includes_taxes ? lineItem.total_discount : (1 + parseFloat(lineItem.tax_rate)) * lineItem.total_discount

//     return {
//       attributes: {
//         sku: lineItem.sku,
//         title: lineItem.title,
//         unit_quantity: lineItem.unit_quantity,
//         each_ex_tax: eachExTax,
//         each_inc_tax: eachIncTax,
//         pre_discount_line_total_ex_tax: preDiscountLineTotalExTax,
//         pre_discount_line_total_inc_tax: preDiscountLineTotalIncTax,
//         line_discount_ex_tax: lineDiscountExTax,
//         line_discount_inc_tax: lineDiscountIncTax,
//         line_total_ex_tax: preDiscountLineTotalExTax - lineDiscountExTax,
//         line_total_inc_tax: preDiscountLineTotalIncTax - lineDiscountIncTax,
//         tax_rate: lineItem.tax_rate,
//         line_item_discounts: lineItem.line_item_discounts.map(discount => {
//           const amountExTax = lineItem.item.price_includes_taxes ? discount.total / (1 + parseFloat(lineItem.tax_rate)) : discount.total
//           const amountIncTax = lineItem.item.price_includes_taxes ? discount.total : (1 + parseFloat(lineItem.tax_rate)) * discount.total

//           return {
//             id: discount.id,
//             type: 'line_item_discounts',
//             attributes: {
//               line_item_number: discount.line_item_number,
//               promotion_id: discount.promotion_id,
//               amount_ex_tax: amountExTax,
//               amount_inc_tax: amountIncTax
//             }
//           }
//         })
//       },
//       type: 'line_items'
//     }
//   })
// }

function prepareBillingAddress (address) {
  return prepareAddress(address)
}

function prepareShippingAddress (address) {
  return prepareAddress(address)
}

function prepareAddress (address) {
  return {
    id: address.id,
    attributes: {
      address_line_1: address.address_line_1,
      address_line_2: address.address_line_2,
      city: address.city,
      country: address.country,
      first_name: address.first_name,
      last_name: address.last_name,
      postcode: address.postcode
    },
    type: 'addresses'
  }
}

function prepareShippingMethod (shippingMethod) {
  return {
    attributes: {
      description: shippingMethod.description,
      label: shippingMethod.label,
      meta_attributes: shippingMethod.meta_attributes,
      reference: shippingMethod.reference,
      sku: shippingMethod.sku,
      sub_total: shippingMethod.sub_total,
      tax: shippingMethod.tax,
      tax_rate: shippingMethod.tax_rate,
      total: shippingMethod.total
    },
    id: shippingMethod.id,
    type: 'shipping_methods'
  }
}

function discountSummaries (cart) {
  return cart.discount_summaries.map(discountSummary => {
    return {
      id: discountSummary.id,
      type: 'discount_summaries',
      attributes: {
        promotion_id: discountSummary.promotion_id,
        name: discountSummary.name,
        total: discountSummary.total
      }
    }
  })
}

// To be tested and used when changes to v2 endpoint are deployed
//
// function discountSummaries (cart, lineItems) {
//   return cart.discount_summaries.map(discountSummary => {
//     const lineItemDiscounts = lineItems.map(lineItem => {
//       return lineItem.attributes.line_item_discounts.find(lineItemDiscount => lineItemDiscount.promotion_id === discountSummary.promotion_id)
//     }).filter(discount => discount)

//     return {
//       id: discountSummary.id,
//       type: 'discount_summaries',
//       attributes: {
//         promotion_id: discountSummary.promotion_id,
//         name: discountSummary.name,
//         amount_ex_tax: lineItemDiscounts.reduce((discountA, discountB) => discountA.amount_ex_tax + discountB.amount_ex_tax, 0),
//         amount_inc_tax: lineItemDiscounts.reduce((discountA, discountB) => discountA.amount_inc_tax + discountB.amount_inc_tax, 0)
//       }
//     }
//   })
// }
