// Components
import { AlgoliaHits } from '../../../../../client/components/search/algolia/algolia-hits'

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
