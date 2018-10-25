// Libraries
import { connectInfiniteHits } from 'react-instantsearch-dom'

// Components
import ProductListingCard from '../../products/listing/product-listing-card'

const AlgoliaHits = connectInfiniteHits(({ hits }) => {
  return hits.map((hit, index) => (
    <ProductListingCard
      title={hit.product_title}
      assetFileUrl={hit.product_assets[0].url}
      assetFileAltText={hit.product_assets[0].alt_text}
      minPrice={hit.variant_meta_data.eu.price}
      maxPrice={hit.variant_meta_data.eu.price}
      productPath={hit.product_path}
      productRating={hit.product_rating}
      key={hit.objectID}
    />
  ))
})

const LoadMoreHits = connectInfiniteHits(({ hits, hasMore, refine }) => {
  const option = (hasMore, count) => {
    if (hasMore) {
      return <button className='c-product-listing__view-more-button' onClick={refine}>Load More</button>
    } else if (count > 0) {
      return <p className='c-product-listing__view-more-message'>Showing all results</p>
    } else {
      return <p className='c-product-listing__view-more-message'>There are no results for this search</p>
    }
  }

  return (
    <div className='c-product-listing__view-more'>
      { option(hasMore, hits.length) }
    </div>
  )
})

export { AlgoliaHits, LoadMoreHits }
