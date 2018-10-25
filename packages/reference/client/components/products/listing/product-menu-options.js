// Libraries
import { PureComponent } from 'react'
import { SortBy } from 'react-instantsearch-dom'

// Components
import ProductMenuDropdowns from './product-menu-dropdowns'
import AlgoliaRefinements from '../../search/algolia/algolia-refinements'

// Objects
import Button from '../../../objects/button'
import Breadcrumb from '../../../objects/breadcrumb'

class ProductMenuOptions extends PureComponent {
  render () {
    const { toggleFiltering } = this.props

    return (
      <div className='c-product-listing__menu-options'>
        <Breadcrumb />
        <ProductMenuDropdowns />
        <div className='c-product-listing__menu-options-filters'>
          <h2 className='c-product-listing__menu-options-filters-title'>Filters</h2>
          <div className='c-product-listing__menu-options-filters-applied'>
            <AlgoliaRefinements />
          </div>
          <Button className='c-product-listing__menu-options-filters-button' onClick={ toggleFiltering } />
        </div>
        <div className='c-product-listing__menu-options-sort-by'>
          <h2 className='c-product-listing__menu-options-sort-by-title'>Sort by:</h2>
          <SortBy defaultRefinement="instant_search"
            items={[
              { value: 'instant_search', label: 'Featured' },
              { value: 'instant_search_product_rating_asc', label: 'Rating asc.' },
              { value: 'instant_search_product_rating_desc', label: 'Rating desc.' }
            ]}
          />
          <Button className='c-product-listing__menu-options-sort-by-button' />
        </div>
      </div>
    )
  }
}

export default ProductMenuOptions
