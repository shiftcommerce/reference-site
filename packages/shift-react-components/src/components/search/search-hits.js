// Libraries
import React from 'react'

import ProductListingCards from '../products/listing/product-listing-cards'
import LoadMoreHits from './load-more'
import ProductListingInfo from '../products/listing/product-listing-info'

const SearchResults = () => {
  return (
    <>
      <ProductListingInfo />
      <ProductListingCards />
      <LoadMoreHits />
    </>
  )
}

export default SearchResults
