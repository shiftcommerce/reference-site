// Libraries
import { Provider } from 'react-redux'
import { createMockStore } from 'redux-test-utils'

// Components
import AlgoliaRatingFilter from '../../../../../client/components/search/algolia/algolia-rating-filter'

test('renders rating options correctly', () => {
  // Arrange
  const ratings = [
    { label: '4', value: [], count: 3, isRefined: true },
    { label: '1', value: ['4', '1'], count: 8, isRefined: false },
    { label: '2', value: ['4', '2'], count: 4, isRefined: false },
    { label: '3', value: ['4', '3'], count: 3, isRefined: false },
    { label: '0', value: ['4', '0'], count: 2, isRefined: false }
  ]
  const refineMockFunction = jest.fn()
  const props = {
    attributeName: 'product_rating',
    min: 0,
    max: 5,
    items: ratings,
    refine: refineMockFunction
  }

  // Act
  const wrapper = shallow(
    <Provider store={createMockStore({})} >
      <AlgoliaRatingFilter {...props} />
    </Provider>
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper.props().items).toBe(ratings)
  expect(wrapper.props().refine).toBe(refineMockFunction)
})
