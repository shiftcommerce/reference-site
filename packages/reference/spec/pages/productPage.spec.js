// Libraries
import { Provider } from 'react-redux'
import { createMockStore } from 'redux-test-utils'

// Page
import { Product } from './../../pages/products/product'

// fixtures
// import cart from './../fixtures/cart.fixture'
import categories from './../fixtures/categories.fixture'

describe('Processing state handling:', () => {
  test('displays loading message, when there is no error and product is loading from db', () => {
    // Arrange
    const initialState = {
      categories: {
        loading: false,
        error: false,
        data: categories
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
      categories: {
        loading: false,
        error: false,
        data: categories
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
      categories: {
        loading: false,
        error: false,
        data: categories
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
