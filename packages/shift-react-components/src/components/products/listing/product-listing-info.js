// Libraries
import React from 'react'
import { connectStateResults, connectInfiniteHits } from 'react-instantsearch-dom'

/**
 * Renders how many products of all results are displayed
 * @param {array} products
 * @param {object} allSearchResults
 * @return {string} - HTML markup for the component
 */
const ProductListingInfo = ({ hits, allSearchResults }) => {
  return (
    <div className='c-product-listing__info'>
      <p className='c-product-listing__counts'>
        Showing { hits.length } of { allSearchResults && allSearchResults.nbHits } products
      </p>
      <p className='c-product-listing__grid-toggles u-visible-d'>
        View
        <button className='c-product-listing__grid-toggle c-product-listing__grid-toggle--disabled'>
          2
        </button>
        <button className='c-product-listing__grid-toggle'>
          4
        </button>
      </p>
    </div>
  )
}

export default connectInfiniteHits(connectStateResults(ProductListingInfo))
