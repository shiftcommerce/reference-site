import { calculateCartSummary } from '../../../client/lib/calculate-cart-summary'

test('correctly calculates totals', () => {
  const cart = {
    lineItems: [
      {
        quantity: 1,
        price: 10
      },
      {
        quantity: 1,
        price: 20,
        discount: 5
      },
      {
        quantity: 3,
        price: 8.5,
        discount: 1.25
      }

    ]
  }

  const checkout = {
    shippingMethod: {
      retail_price_inc_tax: 12.99
    }
  }

  const totals = calculateCartSummary(cart, checkout)

  expect(totals).toEqual({
    subTotal: 55.5,
    total: 59.74,
    discount: 8.75,
    shipping: 12.99
  })
})
