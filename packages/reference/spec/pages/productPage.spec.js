// Libraries
import { Provider } from 'react-redux'
import { createMockStore } from 'redux-test-utils'

// Page
import { Product } from './../../pages/product'

// fixtures
// import cart from './../fixtures/cart.fixture'
import menu from './../fixtures/menu.fixture'

describe('Processing state handling:', () => {
  test('displays loading message, when there is no error and product is loading from db', () => {
    // Arrange
    const initialState = {
      menu: {
        loading: false,
        error: false,
        data: menu
      }
    }
    const product = {
      loading: true,
      error: false,
      product: []
    }
    const dispatch = jest.fn().mockImplementation((updateSpy) => 'first call')

    // Act
    const wrapper = mount(
      <Provider store={createMockStore(initialState)}>
        <Product product={product} dispatch={dispatch} />
      </Provider>
    )

    // Assert
    expect(wrapper).toMatchSnapshot()
    expect(wrapper).toIncludeText('Loading product...')
  })
  test('displays error message, when there is an error in loading product', () => {
    // Arrange
    const initialState = {
      menu: {
        loading: false,
        error: false,
        data: menu
      }
    }
    const product = {
      loading: false,
      error: true,
      product: []
    }
    const dispatch = jest.fn().mockImplementation((updateSpy) => 'first call')

    // Act
    const wrapper = mount(
      <Provider store={createMockStore(initialState)}>
        <Product product={product} dispatch={dispatch} />
      </Provider>
    )

    // Assert
    expect(wrapper).toMatchSnapshot()
    expect(wrapper).toIncludeText('Unable to load product.')
  })
  test('displays relevant message, when product data is empty', () => {
    // Arrange
    const initialState = {
      menu: {
        loading: false,
        error: false,
        data: menu
      }
    }
    const product = {}
    const dispatch = jest.fn().mockImplementation((updateSpy) => 'first call')

    // Act
    const wrapper = mount(
      <Provider store={createMockStore(initialState)}>
        <Product product={product} dispatch={dispatch} />
      </Provider>
    )

    // Assert
    expect(wrapper).toMatchSnapshot()
    expect(wrapper).toIncludeText('Unable to load product.')
  })
})
