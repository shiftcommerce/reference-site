// Libraries
import React from 'react'
import { connectInfiniteHits } from 'react-instantsearch-dom'

export const LoadMoreHits = ({ hits, hasMore, refine }) => {
  let content

  if (hasMore) {
    content = <button className='c-product-listing__view-more-button' onClick={refine}>Load More</button>
  } else if (hits.length > 0) {
    content = <p className='c-product-listing__view-more-message'>Showing all results</p>
  } else {
    content = <p className='c-product-listing__view-more-message'>There are no results for this search</p>
  }

  return (
    <div className='c-product-listing__view-more'>{ content }</div>
  )
}

export default connectInfiniteHits(LoadMoreHits)
