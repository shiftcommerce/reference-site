// Libs
import CheckoutStepTransitionManager from '../../../client/lib/checkout-step-transition-manager'

// Mock localforage module
jest.mock('../../../client/lib/localforage')

describe('CheckoutStepTransitionManager', () => {
  describe('onCompleteStepEvent', () => {
    test('Transition From: shippingAddress to: shippingMethod component', () => {
      // Arrange
      const eventType = 'complete'
      const componentName = 'shippingAddress'
      const checkoutState = {
        shippingAddress: {
          collapsed: false,
          completed: false,
          errors: {}
        },
        shippingMethod: {
          collapsed: true,
          completed: false
        },
        paymentMethod: {
          collapsed: true,
          completed: false
        },
        reviewOrder: {
          collapsed: true,
          completed: false
        },
        currentStep: 1
      }

      // Act
      const newState = new CheckoutStepTransitionManager(eventType, componentName, checkoutState).call()

      // Assert
      expect(newState['currentStep']).toBe(2)
      expect(newState['shippingAddress']['collapsed']).toBe(true)
      expect(newState['shippingAddress']['completed']).toBe(true)
      expect(newState['shippingMethod']['collapsed']).toBe(false)
      expect(newState['shippingMethod']['completed']).toBe(false)
    })

    test('Transition From: shippingMethod to: paymentMethod component', () => {
      // Arrange
      const eventType = 'complete'
      const componentName = 'shippingMethod'
      const checkoutState = {
        shippingAddress: {
          collapsed: true,
          completed: true,
          errors: {}
        },
        shippingMethod: {
          collapsed: false,
          completed: false
        },
        paymentMethod: {
          collapsed: true,
          completed: false
        },
        reviewOrder: {
          collapsed: true,
          completed: false
        },
        currentStep: 2
      }

      // Act
      const newState = new CheckoutStepTransitionManager(eventType, componentName, checkoutState).call()

      // Assert
      expect(newState['currentStep']).toBe(3)
      expect(newState['shippingMethod']['collapsed']).toBe(true)
      expect(newState['shippingMethod']['completed']).toBe(true)
      expect(newState['paymentMethod']['collapsed']).toBe(false)
      expect(newState['paymentMethod']['completed']).toBe(false)
    })

    test('Transition From: paymentMethod to: reviewOrder component', () => {
      // Arrange
      const eventType = 'complete'
      const componentName = 'paymentMethod'
      const checkoutState = {
        shippingAddress: {
          collapsed: true,
          completed: true,
          errors: {}
        },
        shippingMethod: {
          collapsed: true,
          completed: true
        },
        paymentMethod: {
          collapsed: true,
          completed: true
        },
        reviewOrder: {
          collapsed: false,
          completed: false
        },
        currentStep: 3
      }

      // Act
      const newState = new CheckoutStepTransitionManager(eventType, componentName, checkoutState).call()

      // Assert
      expect(newState['currentStep']).toBe(4)
      expect(newState['paymentMethod']['collapsed']).toBe(true)
      expect(newState['paymentMethod']['completed']).toBe(true)
      expect(newState['reviewOrder']['collapsed']).toBe(false)
      expect(newState['reviewOrder']['completed']).toBe(false)
    })
  })

  describe('onEditStepEvent', () => {
    test('Transition From: paymentMethod to: shippingAddress component', () => {
      // Arrange
      const eventType = 'edit'
      const componentName = 'shippingAddress'
      const checkoutState = {
        shippingAddress: {
          collapsed: true,
          completed: true,
          errors: {}
        },
        shippingMethod: {
          collapsed: true,
          completed: true
        },
        paymentMethod: {
          collapsed: true,
          completed: true
        },
        reviewOrder: {
          collapsed: true,
          completed: false
        },
        currentStep: 4
      }

      // Act
      const newState = new CheckoutStepTransitionManager(eventType, componentName, checkoutState).call()

      // Assert
      expect(newState['currentStep']).toBe(1)
      expect(newState['shippingAddress']['collapsed']).toBe(false)
      expect(newState['shippingAddress']['completed']).toBe(true)
      expect(newState['paymentMethod']['collapsed']).toBe(true)
      expect(newState['paymentMethod']['completed']).toBe(true)
    })

    test('Transition From: paymentMethod to: shippingMethod component', () => {
      // Arrange
      const eventType = 'edit'
      const componentName = 'shippingMethod'
      const checkoutState = {
        shippingAddress: {
          collapsed: true,
          completed: true,
          errors: {}
        },
        shippingMethod: {
          collapsed: true,
          completed: true
        },
        paymentMethod: {
          collapsed: true,
          completed: true
        },
        reviewOrder: {
          collapsed: true,
          completed: false
        },
        currentStep: 4
      }

      // Act
      const newState = new CheckoutStepTransitionManager(eventType, componentName, checkoutState).call()

      // Assert
      expect(newState['currentStep']).toBe(2)
      expect(newState['shippingMethod']['collapsed']).toBe(false)
      expect(newState['shippingMethod']['completed']).toBe(true)
      expect(newState['paymentMethod']['collapsed']).toBe(true)
      expect(newState['paymentMethod']['completed']).toBe(true)
    })

    test('Transition From: shippingMethod to: shippingAddress component', () => {
      // Arrange
      const eventType = 'edit'
      const componentName = 'shippingAddress'
      const checkoutState = {
        shippingAddress: {
          collapsed: true,
          completed: true,
          errors: {}
        },
        shippingMethod: {
          collapsed: false,
          completed: false
        },
        paymentMethod: {
          collapsed: true,
          completed: false
        },
        reviewOrder: {
          collapsed: true,
          completed: false
        },
        currentStep: 4
      }

      // Act
      const newState = new CheckoutStepTransitionManager(eventType, componentName, checkoutState).call()

      // Assert
      expect(newState['currentStep']).toBe(1)
      expect(newState['shippingAddress']['collapsed']).toBe(false)
      expect(newState['shippingAddress']['completed']).toBe(true)
      expect(newState['shippingMethod']['collapsed']).toBe(true)
      expect(newState['shippingMethod']['completed']).toBe(false)
    })
  })
})
