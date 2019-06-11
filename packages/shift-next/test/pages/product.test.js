// Libraries
import { Provider } from 'react-redux'
import { createMockStore } from 'redux-test-utils'
import nock from 'nock'

// Actions
import * as ProductActions from '../../src/actions/product-actions'

// Page
import ProductPage from '../../src/pages/product'

// Components
import { Loading } from '@shiftcommerce/shift-react-components/src/objects/loading'
import { ProductDisplay } from '@shiftcommerce/shift-react-components/src/components/products/display/product-display'

// Config
import Config from '../../src/lib/config'

// Fixtures
import product from '../fixtures/product'

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {}
}))

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
      expect(wrapper.find('.o-loading')).toHaveClassName('o-loading')
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
          <ProductPage product={product} dispatch={dispatch} />
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
          <ProductPage product={{}} dispatch={dispatch} />
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

    const head = () => {
      return (
        <head>
        </head>
      )
    }

    Config.set({
      Head: head
    })


    // Act
    const wrapper = mount(
      <Provider store={createMockStore()}>
        <ProductPage product={product} dispatch={dispatch} />
      </Provider>
    )

    // Assert
    expect(wrapper).toMatchSnapshot()

    expect(wrapper.find('.c-product-display__info-title')).toIncludeText(product.title)
    expect(wrapper.find('.c-product-price')).toIncludeText(product.min_current_price)

    expect(wrapper.find(ProductDisplay)).toExist()
  })

  test('getInitialProps() retrieves the product serverside', async () => {
    Config.set({ apiHostProxy: 'http://example.com' })

    const productRequest = nock(/example\.com/)
      .get('/getProduct/1')
      .query(true)
      .reply(200, {
        id: 1,
        title: 'Test Product'
      })

    // Assert
    expect(await ProductPage.getInitialProps({ query: { id: 1 }, req: true, reduxStore: { dispatch: jest.fn() } })).toEqual({
      id: 1,
      product: {
        id: 1,
        title: 'Test Product'
      }
    })
    expect(productRequest.isDone()).toBe(true)
  })

  test('getInitialProps() retrieves the product clientside', async () => {
    Config.set({ apiHostProxy: 'http://example.com' })

    const productRequest = nock(/example\.com/)
      .get('/getProduct/1')
      .query(true)
      .reply(200, {
        id: 1,
        title: 'Test Product'
      })

    // Assert
    expect(await ProductPage.getInitialProps({ query: { id: 1 }, req: false, reduxStore: { dispatch: jest.fn() } })).toEqual({
      id: 1,
      product: {
        id: 1,
        title: 'Test Product'
      }
    })
    expect(productRequest.isDone()).toBe(true)
  })
})
