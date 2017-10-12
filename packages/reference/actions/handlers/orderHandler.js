// Lib
import { randomUUID } from './../../utils/randomUUID'
import pick from './../../utils/pick'

export function convertCheckoutToOrder (cart, checkout) {
  // This is to ensure billing address has correctly set
  if (checkout.shippingAddressAsBillingAddress === true) {
    checkout.billingAddress = checkout.shippingAddress
  }

  const order = {
    data: {
      type: 'oms/create_order',
      attributes: {
        request_uuid: randomUUID(),
        retail_price_inc_tax: getTotalPrice(cart, checkout),
        paid_price_inc_tax: getTotalPrice(cart, checkout),
        tax_amount: 0,
        currency: 'GBP',
        line_items: prepareLineItems(cart),
        customer: prepareCustomerDetails(checkout.billingAddress),
        shipping_method: prepareShippingMethod(checkout.shippingMethod),
        billing_address: prepareBillingAddress(checkout.billingAddress),
        shipping_address: prepareShippingAddress(checkout.shippingAddress),
        transaction: prepareTransaction()
      }
    }
  }
  return order
}

function prepareLineItems (cart) {
  let lineItems = cart.lineItems
  let formattedLineItems = []
  if (lineItems.length === 0) {
    return lineItems
  } else {
    for (let lineItem of lineItems) {
      formattedLineItems.push({
        sku: lineItem.sku,
        quantity: lineItem.quantity,
        retail_price_inc_tax: lineItem.price,
        paid_price_inc_tax: lineItem.price,
        tax_percentage: 0,
        tax_amount: 0,
        currency: 'GBP',
        title: lineItem.title
      })
    }
  }
  return formattedLineItems
}

// TODO: Integrate with actual customer data
// Currently used checkout billing address details
function prepareCustomerDetails (address) {
  return {
    email: address.email,
    name: `${address.first_name} ${address.last_name}`,
    external_id: '123'
  }
}

// TODO: Integrate with actual data once stripe got integrated
function prepareTransaction () {
  return {
    'payment_gateway': 'paypal',
    'action': 'auth',
    'tokens': {
      'token_a': 123,
      'token_b': 456
    },
    'amount': 120,
    'currency': 'GBP'
  }
}

function getTotalPrice (cart, checkout) {
  let lineItems = cart.lineItems
  let totalAmount = 0
  if (lineItems.length > 0) {
    for (let lineItem of lineItems) {
      totalAmount += lineItem.price
    }
  }
  totalAmount += checkout.shippingMethod.retail_price_inc_tax
  return totalAmount
}

function prepareBillingAddress (address) {
  return Object.assign(
    {label: 'BILLING_LABEL'}, prepareAddress(address)
  )
}

function prepareShippingAddress (address) {
  return Object.assign(
    {label: 'SHIPPING_LABEL'}, prepareAddress(address)
  )
}

function prepareAddress (address) {
  return {
    first_name: address.first_name,
    last_name: address.last_name,
    line_1: address.line_1,
    line_2: address.line_2,
    city: address.city,
    state: address.state,
    zipcode: address.zipcode,
    country_code: address.country_code,
    primary_phone: address.primary_phone
  }
}

function prepareShippingMethod (shippingMethod) {
  return pick(shippingMethod,
    'id',
    'name',
    'retail_price_inc_tax',
    'paid_price_inc_tax',
    'tax_amount',
    'tax_percentage',
    'sku',
    'reference')
}
