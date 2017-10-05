// Libraries
import { Provider } from 'react-redux'
import { createMockStore } from 'redux-test-utils'

// Pages
import { CheckoutPage } from '../../pages/checkout'

// Actions
import { setShippingMethod } from '../../actions/checkoutActions'

// Fixtures
import cart from '../fixtures/cart.fixture'
import checkout from '../fixtures/checkout.fixture'
import shippingMethods from '../fixtures/shippingMethods.fixture'

test('dispatch setShippingMethod action on changing sipping method', () => {
  // Arrange
  const initialState = {}
  const expectedFunction = setShippingMethod().toString()
  const setShippingMethodSpy = jest.spyOn(CheckoutPage.prototype, 'setShippingMethod')
  const dispatch = jest.fn().mockImplementation((updateSpy) => 'first call')
  const selectedShippingMethod = shippingMethods.shippingMethods[0]

  // Act
  const wrapper = mount(
    <Provider store={createMockStore(initialState)}>
      <CheckoutPage checkout={checkout} cart={cart} dispatch={dispatch} />
    </Provider>
  )

  // Assert
  expect(wrapper).toMatchSnapshot()

  // Verify if cart line items are available
  expect(wrapper).toIncludeText('1 item')

  // To clear the logs of dispatch being called on component mount
  dispatch.mockClear()

  // Trigger quantity change
  wrapper.find(`input[id="${selectedShippingMethod.id}"]`).simulate('change', {target: { checked: true }})

  // Verify if setShippingMethod method is getting clicking shipping method
  expect(setShippingMethodSpy).toHaveBeenCalled()

  expect(dispatch).toHaveBeenCalled()

  // Verify it dispatch method called a function
  expect(dispatch.mock.calls[0][0]).toEqual(expect.any(Function))

  // Verify if the dispatch function has dispatched updateQuantity action.
  expect(dispatch.mock.calls[0][0].toString()).toMatch(expectedFunction)
})
