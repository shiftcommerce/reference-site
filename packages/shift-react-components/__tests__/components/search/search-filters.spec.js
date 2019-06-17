// Libraries
import React from 'react'

// Components
import SearchFilters from '../../../src/components/search/search-filters'

test('renders the algolia filter component with children', () => {
  // Arrange
  const facets = [
    {
      aggregation_type: 'range',
      label: 'volume',
      source: 'whatever'
    }
  ]

  // Act
  const wrapper = shallow(<SearchFilters facets={facets} />)

  // Assert
  expect(wrapper.find('.c-product-listing-filter__body-option')).toHaveLength(3)
  expect(wrapper.find('.c-product-listing-filter__body-option').at(0).dive()).toIncludeText('volume')
})

test('algolia filters turns every facet into a refinement list', () => {
  // Arrange
  const facets = [
    {
      aggregation_type: 'range',
      label: 'volume',
      source: 'whatever'
    },
    {
      aggregation_type: 'range',
      label: 'diameter',
      source: 'whatever'
    },
    {
      aggregation_type: 'list',
      label: 'colour',
      source: 'whatever'
    }
  ]

  // Act
  const wrapper = shallow(<SearchFilters facets={facets} />)

  // Assert
  // We add 2 to the expected length here to account for Rating and Price which are
  // not facets returned from the API, they are hardcoded into algolia-filters.js
  expect(wrapper.find('.c-product-listing-filter__body-option')).toHaveLength(5)
  expect(wrapper.find('.c-product-listing-filter__body-option').at(0).dive()).toIncludeText('volume')
  expect(wrapper.find('.c-product-listing-filter__body-option').at(1).dive()).toIncludeText('diameter')
  expect(wrapper.find('.c-product-listing-filter__body-option').at(2).dive()).toIncludeText('colour')
})
