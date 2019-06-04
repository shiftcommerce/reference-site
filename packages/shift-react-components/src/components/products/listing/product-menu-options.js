// Libraries
import React, { PureComponent } from 'react'
import { SortBy } from 'react-instantsearch-dom'

// Objects
import { Button } from '../../../objects/button'

// Components
import SearchRefinements from '../../search/search-refinements'

class ProductMenuOptions extends PureComponent {
  render () {
    const { toggleFiltering, indexName } = this.props

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
              { value: indexName, label: 'Featured' },
              { value: `${indexName}_product_rating_asc`, label: 'Rating asc.' },
              { value: `${indexName}_product_rating_desc`, label: 'Rating desc.' }
            ]}
          />
          <Button className='c-product-listing__menu-options-sort-by-button u-hidden-d' />
        </div>
      </div>
    )
  }
}

export default ProductMenuOptions
