// Libraries
import { connectInfiniteHits } from 'react-instantsearch-dom'

// Components
import ProductListingCard from '../../products/listing/product-listing-card'

// This is only exported for testing
const BaseAlgoliaHits = ({ hits }) => {
  return groupVariants(hits).map((variantGroup, index) => {
    return <ProductListingCard
      title={variantGroup[0].product_title}
      assetFileUrl={variantGroup[0].product_assets[0].url}
      assetFileAltText={variantGroup[0].product_assets[0].alt_text}
      minPrice={Math.min(...variantGroup.map(variant => variant.variant_meta_data.eu.price))}
      maxPrice={Math.max(...variantGroup.map(variant => variant.variant_meta_data.eu.price))}
      productPath={variantGroup[0].product_path}
      productRating={variantGroup[0].product_rating}
      key={variantGroup[0].objectID}
    />
  })
}

const AlgoliaHits = connectInfiniteHits(BaseAlgoliaHits)

// Groups variants (i.e. hits) by product reference, returns an array of arrays,
// each sub-array is a group of variants
const groupVariants = (hits) => {
  return Object.values(hits.reduce((products, variant) => {
    if (!products[variant.product_reference]) products[variant.product_reference] = []
    products[variant.product_reference].push(variant)
    return products
  }, {}))
}

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

export { AlgoliaHits, BaseAlgoliaHits, LoadMoreHits }
