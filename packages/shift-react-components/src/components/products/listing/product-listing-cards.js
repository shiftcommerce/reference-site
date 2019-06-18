// Libraries
import React from 'react'
import { connectInfiniteHits } from 'react-instantsearch-dom'
import ProductListingCard from './product-listing-card'

export const ProductListingCards = ({ hits }) => {
  return (
    <div className='c-product-listing__products'>
      { hits && hits.map(hit => <ProductListingCard
        {...hit}
        title={hit.product_title}
        assetFileUrl={hit.product_asset_files ? hit.product_asset_files[0].source : ''}
        assetFileAltText={hit.product_asset_files ? hit.product_asset_files[0].caption : ''}
        minPrice={hit.product_min_current_price || 0}
        maxPrice={hit.product_max_current_price || 0}
        productPath={hit.product_path}
        productRating={hit.product_rating}
        key={hit.objectID}
      />) }
    </div>
  )
}

export default connectInfiniteHits(ProductListingCards)
