// Libs
import { canCheckout } from '../../src/lib/cart-helpers'

describe('Cart Helpers', () => {
  describe('canCheckout', () => {
    test('valid cart', () => {
      // Arrange
      const cart = {
        line_items: [{
          unit_quantity: 10,
          stock_available_level: 20
        }, {
          unit_quantity: 20,
          stock_available_level: 30
        }]
      }

      // Act
      const result = canCheckout(cart)

      // Assert
      expect(result).toBe(true)
    })

    test('invalid cart', () => {
      // Arrange
      const cart = {
        line_items: [{
          unit_quantity: 10,
          stock_available_level: 5
        }, {
          unit_quantity: 20,
          stock_available_level: 30
        }]
      }

      // Act
      const result = canCheckout(cart)

      // Assert
      expect(result).toBe(false)
    })
  })
})
