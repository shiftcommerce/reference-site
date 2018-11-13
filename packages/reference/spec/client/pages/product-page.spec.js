// Libraries
import { Provider } from 'react-redux'
import { createMockStore } from 'redux-test-utils'

// Page
import { Product } from './../../../client/pages/product'

// Components
import Loading from './../../../client/components/loading'
import ProductDisplay from './../../../client/components/products/display/product-display'

// Fixtures
import product from './../../fixtures/product'

describe('Product page', () => {
  describe('loading and error states', () => {
    test('displays loading spinner, when there is no error and product is loading', () => {
      // Arrange
      const product = {
        loading: true,
        error: false,
        data: []
      }

      const dispatch = jest.fn()

      // Act
      const wrapper = mount(
        <Loading product={product} dispatch={dispatch} />
      )

      // Assert
      expect(wrapper).toMatchSnapshot()
      expect(wrapper.find('.c-loading')).toHaveClassName('c-loading')
    })

    test('displays an error message when there is an error loading the product', () => {
      // Arrange
      const product = {
        loading: false,
        error: true,
        data: []
      }

      const dispatch = jest.fn()

      // Act
      const wrapper = mount(
        <Provider store={createMockStore()}>
          <Product product={product} dispatch={dispatch} />
        </Provider>
      )

      // Assert
      expect(wrapper).toMatchSnapshot()
      expect(wrapper).toIncludeText('Unable to load product.')
    })

    test('displays relevant message, when product data is empty', () => {
      // Arrange
      const dispatch = jest.fn()

      // Act
      const wrapper = mount(
        <Provider store={createMockStore()}>
          <Product product={{}} dispatch={dispatch} />
        </Provider>
      )

      // Assert
      expect(wrapper).toMatchSnapshot()
      expect(wrapper).toIncludeText('Unable to load product.')
    })
  })

  test('renders a product once data is present', () => {
    // Arrange
    const dispatch = jest.fn()

    // Act
    const wrapper = mount(
      <Provider store={createMockStore()}>
        <Product product={product} dispatch={dispatch} />
      </Provider>
    )

    // Assert
    expect(wrapper).toMatchSnapshot()

    expect(wrapper).toIncludeText(product.title)
    expect(wrapper).toIncludeText(product.min_current_price)

    expect(wrapper.find(ProductDisplay)).toExist()
  })
})
