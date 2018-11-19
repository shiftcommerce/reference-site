// Components
import { AlgoliaHits, BaseAlgoliaHits } from '../../../../../client/components/search/algolia/algolia-hits'

// Fixtures
import resultsState from '../../../../fixtures/search-result-state'

test('renders the algolia hits', () => {
  // Arrange
  const context = {
    ais: {
      store: {
        getState: () => (resultsState),
        setState: () => (null),
        subscribe: () => (null)
      },
      widgetsManager: {
        registerWidget: () => (null)
      },
      mainTargetedIndex: 'reference_variants',
      onSearchParameters: () => (null)
    }
  }

  // Act
  const wrapper = mount(<AlgoliaHits />, { context })

  // Assert
  expect(wrapper).toMatchSnapshot()
})

test('groups algolia hits by product_reference', () => {
  const hits = [
    {
      product_reference: 'product_a',
      product_title: 'Product A',
      product_assets: [{}],
      variant_meta_data: {
        eu: {
          price: 10
        }
      },
      product_path: '/product_1',
      product_rating: 3
    },
    {
      product_reference: 'product_a',
      product_title: 'Product A',
      product_assets: [{}],
      variant_meta_data: {
        eu: {
          price: 20
        }
      },
      product_path: '/product_1',
      product_rating: 3
    },
    {
      product_reference: 'product_b',
      product_title: 'Product B',
      product_assets: [{}],
      variant_meta_data: {
        eu: {
          price: 15
        }
      },
      product_path: '/product_2',
      product_rating: 5
    },
    {
      product_reference: 'product_b',
      product_title: 'Product B',
      product_assets: [{}],
      variant_meta_data: {
        eu: {
          price: 25
        }
      },
      product_path: '/product_2',
      product_rating: 5
    }
  ]

  const products = BaseAlgoliaHits({ hits })

  expect(products.length).toEqual(2)
  expect(products[0].props.title).toEqual('Product A')
  expect(products[0].props.minPrice).toEqual(10)
  expect(products[0].props.maxPrice).toEqual(20)
  expect(products[1].props.title).toEqual('Product B')
  expect(products[1].props.minPrice).toEqual(15)
  expect(products[1].props.maxPrice).toEqual(25)
})
