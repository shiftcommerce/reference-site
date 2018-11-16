// Libs
import { calculateCartSummary } from '../../lib/calculate-cart-summary'

export function convertCheckoutToOrder (cart, checkout, order) {
  // This is to ensure billing address has correctly set
  if (checkout.shippingAddressAsBillingAddress === true) {
    checkout.billingAddress = checkout.shippingAddress
  }

  const totals = calculateCartSummary(cart, checkout)

  const orderPayload = {
    attributes: {
      billing_address: prepareBillingAddress(checkout.billingAddress),
      channel: 'web',
      currency: 'GBP',
      email: checkout.billingAddress.email,
      ip_address: '',
      line_items_resources: prepareLineItems(cart),
      shipping_address: prepareShippingAddress(checkout.shippingAddress),
      shipping_method: prepareShippingMethod(checkout),
      discount_summaries: discountSummary(),
      sub_total: totals.subTotal,
      total: totals.total,
      shipping_total: totals.shipping,
      tax: totals.tax || 0,
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

function prepareBillingAddress (address) {
  return prepareAddress(address)
}

function prepareShippingAddress (address) {
  return prepareAddress(address)
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

function prepareShippingMethod (checkout) {
  const shippingMethod = checkout.shippingMethod
  const checkoutUpdatedAt = new Date(checkout.updatedAt).toISOString()
  return {
    attributes: {
      created_at: checkoutUpdatedAt,
      description: shippingMethod.delivery_date,
      label: shippingMethod.name,
      meta_attributes: {},
      reference: shippingMethod.reference,
      sku: shippingMethod.sku,
      sub_total: shippingMethod.paid_price_inc_tax,
      tax: shippingMethod.tax_amount,
      tax_rate: shippingMethod.tax_percentage,
      total: shippingMethod.retail_price_inc_tax,
      updated_at: checkoutUpdatedAt
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
