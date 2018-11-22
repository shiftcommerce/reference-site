// Components
import { AlgoliaHits, AlgoliaResults } from '../../../../../client/components/search/algolia/algolia-hits'
import ProductListingCard from '../../../../../client/components/products/listing/product-listing-card'

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
      product_rating: 3,
      objectID: 1
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
      product_rating: 3,
      objectID: 2
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
      product_rating: 5,
      objectID: 3
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
      product_rating: 5,
      objectID: 4
    }
  ]

  const wrapper = shallow(<AlgoliaResults hits={ hits } hasMore={ false } refine={ jest.fn() } />)

  expect(wrapper.find(ProductListingCard).length).toEqual(2)

  const productA = wrapper.find(ProductListingCard).first()
  const productB = wrapper.find(ProductListingCard).last()
  expect(productA.prop('title')).toEqual('Product A')
  expect(productA.prop('minPrice')).toEqual(10)
  expect(productA.prop('maxPrice')).toEqual(20)
  expect(productB.prop('title')).toEqual('Product B')
  expect(productB.prop('minPrice')).toEqual(15)
  expect(productB.prop('maxPrice')).toEqual(25)
})
