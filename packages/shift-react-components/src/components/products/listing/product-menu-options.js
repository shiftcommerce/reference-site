// Libraries
import React, { PureComponent } from 'react'
import { SortBy } from 'react-instantsearch-dom'

// Objects
import { Button } from '../../../objects/button'

// Components
import SearchRefinements from '../../search/search-refinements'

class ProductMenuOptions extends PureComponent {
  render () {
    const { toggleFiltering, indexName, indexNameWithoutDefaultSortOrder } = this.props

    return (
      <div className='c-product-listing__menu-options'>
        <div className='c-product-listing__menu-options-filters'>
          <h2 className='c-product-listing__menu-options-filters-title'>Filters</h2>
          <div className='c-product-listing__menu-options-filters-applied'>
            <SearchRefinements />
          </div>
          <Button className='c-product-listing__menu-options-filters-button' onClick={toggleFiltering} />
        </div>
        <div className='c-product-listing__menu-options-sort-by'>
          <h2 className='c-product-listing__menu-options-sort-by-title'>Sort by:</h2>
          <SortBy defaultRefinement={indexName}
            items={[
              { value: indexNameWithoutDefaultSortOrder, label: 'Featured' },
              { value: `${indexNameWithoutDefaultSortOrder}_price_asc`, label: 'Price asc.' },
              { value: `${indexNameWithoutDefaultSortOrder}_price_desc`, label: 'Price desc.' },
              { value: `${indexNameWithoutDefaultSortOrder}_created_at_desc`, label: 'Newest' },
              { value: `${indexNameWithoutDefaultSortOrder}_total_purchases_desc`, label: 'Most Popular' },
              { value: `${indexNameWithoutDefaultSortOrder}_rating_desc`, label: 'Rating desc.' }
            ]}
          />
          <Button className='c-product-listing__menu-options-sort-by-button u-hidden-d' />
        </div>
      </div>
    )
  }
}

export default ProductMenuOptions
