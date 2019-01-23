// Libraries
import { PureComponent } from 'react'
import { SortBy } from 'react-instantsearch-dom'
import getConfig from 'next/config'

// Components
import AlgoliaRefinements from '../../search/algolia/algolia-refinements'

// Objects
import Button from '../../../objects/button'

const {
  publicRuntimeConfig: {
    ALGOLIA_INDEX_NAME
  }
} = getConfig()

class ProductMenuOptions extends PureComponent {
  render () {
    const { toggleFiltering } = this.props

    return (
      <div className='c-product-listing__menu-options'>
        <div className='c-product-listing__menu-options-filters'>
          <h2 className='c-product-listing__menu-options-filters-title'>Filters</h2>
          <div className='c-product-listing__menu-options-filters-applied'>
            <AlgoliaRefinements />
          </div>
          <Button className='c-product-listing__menu-options-filters-button' onClick={toggleFiltering} />
        </div>
        <div className='c-product-listing__menu-options-sort-by'>
          <h2 className='c-product-listing__menu-options-sort-by-title'>Sort by:</h2>
          <SortBy defaultRefinement={ALGOLIA_INDEX_NAME}
            items={[
              { value: ALGOLIA_INDEX_NAME, label: 'Featured' },
              { value: `${ALGOLIA_INDEX_NAME}_product_rating_asc`, label: 'Rating asc.' },
              { value: `${ALGOLIA_INDEX_NAME}_product_rating_desc`, label: 'Rating desc.' }
            ]}
          />
          <Button className='c-product-listing__menu-options-sort-by-button u-hidden-d' />
        </div>
      </div>
    )
  }
}

export default ProductMenuOptions
