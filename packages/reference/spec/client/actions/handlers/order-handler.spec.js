// Handler
import { convertCheckoutToOrder } from '../../../../client/actions/handlers/order-handler'

// Fixtures
import cartPayload from '../../../fixtures/actions/handlers/order-handler/cart-payload'
import orderPayload from '../../../fixtures/actions/handlers/order-handler/order-payload'
import checkoutPayload from '../../../fixtures/actions/handlers/order-handler/checkout-payload'
import createOrderPayload from '../../../fixtures/actions/handlers/order-handler/create-order-payload'

describe('convertCheckoutToOrder()', () => {
  test('converts checkout data into API order payload', () => {
    // act
    const result = convertCheckoutToOrder(cartPayload, checkoutPayload, orderPayload)

    // assert
    expect(result).toMatchObject(createOrderPayload)
  })
})
