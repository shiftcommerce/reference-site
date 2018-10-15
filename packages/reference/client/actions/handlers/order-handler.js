export function convertCheckoutToOrder (cart, checkout, order) {
  // This is to ensure billing address has correctly set
  if (checkout.shippingAddressAsBillingAddress === true) {
    checkout.billingAddress = checkout.shippingAddress
  }

  const orderPayload = {
    attributes: {
      billing_address: prepareBillingAddress(checkout.billingAddress),
      channel: 'web',
      currency: 'GBP',
      email: checkout.billingAddress.email,
      ip_address: '',
      line_items_resources: prepareLineItems(cart),
      shipping_address: prepareShippingAddress(checkout.shippingAddress),
      shipping_method: prepareShippingMethod(checkout.shippingMethod, checkout),
      discount_summaries: discountSummary(),
      sub_total: getTotalPrice(cart, checkout),
      total: getTotalPrice(cart, checkout),
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
  const lineItems = cart.lineItems
  let formattedLineItems = []
  if (lineItems.length === 0) {
    return lineItems
  } else {
    lineItems.forEach((lineItem) => {
      formattedLineItems.push({
        attributes: {
          sku: lineItem.sku,
          title: lineItem.title,
          unit_quantity: lineItem.quantity,
          unit_price: lineItem.price,
          taxes: 0
        },
        type: 'line_items'
      })
    })
  }
  return formattedLineItems
}

function getTotalPrice (cart, checkout) {
  const lineItems = cart.lineItems
  let totalAmount = 0
  if (lineItems.length > 0) {
    lineItems.forEach((lineItem) => {
      totalAmount += parseInt(lineItem.price * lineItem.quantity)
    })
  }
  totalAmount += checkout.shippingMethod.retail_price_inc_tax
  return totalAmount
}

function prepareBillingAddress (address) {
  return Object.assign(
    prepareAddress(address)
  )
}

function prepareShippingAddress (address) {
  return Object.assign(
    prepareAddress(address)
  )
}

function prepareAddress (address) {
  return {
    id: '',
    attributes: {
      address_line_1: address.line_1,
      address_line_2: address.line_2,
      city: address.city,
      country: address.country_code,
      first_name: address.first_name,
      last_name: address.last_name,
      postcode: address.zipcode
    },
    type: 'addresses'
  }
}

function prepareShippingMethod (shippingMethod, checkout) {
  return {
    attributes: {
      created_at: checkout.updatedAt.toISOString(),
      description: shippingMethod.delivery_date,
      label: shippingMethod.name,
      meta_attributes: {},
      reference: shippingMethod.reference,
      sku: shippingMethod.sku,
      sub_total: shippingMethod.paid_price_inc_tax,
      tax: shippingMethod.tax_amount,
      tax_rate: shippingMethod.tax_amount,
      total: shippingMethod.retail_price_inc_tax,
      updated_at: checkout.updatedAt.toISOString()
    },
    id: shippingMethod.id,
    type: 'shipping_methods'
  }
}

// Integrate when we actually use discounts
function discountSummary () {
  return [{
    id: '',
    type: 'discount_summaries',
    attributes: {
      total: 0,
      name: '',
      promotion_id: 0
    }
  }]
}
