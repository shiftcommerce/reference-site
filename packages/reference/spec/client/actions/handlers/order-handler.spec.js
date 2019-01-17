// Handler
import { convertCheckoutToOrder } from '../../../../client/actions/handlers/order-handler'

// Fixtures
import cartState from '../../../fixtures/actions/handlers/order-handler/cart-state'
import orderState from '../../../fixtures/actions/handlers/order-handler/order-state'
import checkoutState from '../../../fixtures/actions/handlers/order-handler/checkout-state'
import createOrderPayload from '../../../fixtures/actions/handlers/order-handler/create-order-payload'

describe('convertCheckoutToOrder()', () => {
  test('converts cart, checkout and order state into a correct API order payload', () => {
    // act
    const result = convertCheckoutToOrder(cartState, checkoutState, orderState)

    // assert
    expect(result).toMatchObject(createOrderPayload)
  })
})
