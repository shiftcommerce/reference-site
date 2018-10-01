// Libraries
import { Provider } from 'react-redux'
import { createMockStore } from 'redux-test-utils'

// Pages
import { CartPage } from '../../pages/cart'

// Actions
import { updateQuantity } from '../../actions/cartActions'

// Fixtures
import cart from '../fixtures/cart.fixture'
import menu from '../fixtures/menu.fixture'

test('dispatch updateQuantity action on changing line item quantity', () => {
  // Arrange
  const initialState = {
    menu: {
      loading: false,
      error: false,
      data: menu
    }
  }
  const expectedFunction = updateQuantity().toString()
  const updateQuantitySpy = jest.spyOn(CartPage.prototype, 'updateQuantity')
  const dispatch = jest.fn().mockImplementation((updateSpy) => 'first call')

  // Act
  const wrapper = mount(
    <Provider store={createMockStore(initialState)}>
      <CartPage cart={cart} dispatch={dispatch} />
    </Provider>
  )

  // Assert
  expect(wrapper).toMatchSnapshot()

  // Verify if cart line items are available
  expect(wrapper).toIncludeText('2 items in your shopping basket')

  // To clear the logs of dispatch being called on component mount
  dispatch.mockClear()

  // Trigger quantity change
  wrapper.find('select').simulate('change', {target: { value: 3, dataset: { variant: '123' } }})

  // Verify if updateQuantity method is getting triggered on quantity update
  expect(updateQuantitySpy).toHaveBeenCalled()

  expect(dispatch).toHaveBeenCalled()

  // Verify it dispatch method called a function
  expect(dispatch.mock.calls[0][0]).toEqual(expect.any(Function))

  // Verify if the dispatch function has dispatched updateQuantity action.
  expect(dispatch.mock.calls[0][0].toString()).toMatch(expectedFunction)
})
