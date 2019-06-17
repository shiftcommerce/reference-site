// Libraries
import React from 'react'

// Components
import ConnectedProductListingCards from '../../../../src/components/products/listing/product-listing-cards'

// Fixtures
import resultsState from '../../../fixtures/search-results-state'

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
  const wrapper = mount(<ConnectedProductListingCards />, { context })

  // Assert
  expect(wrapper).toMatchSnapshot()
})
