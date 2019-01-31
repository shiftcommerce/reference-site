// Libraries
import { connectInfiniteHits, connectStateResults } from 'react-instantsearch-dom'

// Components
import { ProductListingCard } from 'shift-react-components'

// This is only exported for testing
const BaseAlgoliaHits = (variantGroups) => {
  return variantGroups.map((variantGroup, index) => {
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

const LoadMoreHits = ({ hits, hasMore, refine }) => {
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
}

const productListingInfo = ({ products, allSearchResults }) => {
  return (
    <div className="c-product-listing__info">
      <p className="c-product-listing__counts">
        Showing { products.length } of { allSearchResults && allSearchResults.nbHits } products
      </p>
      <p className="c-product-listing__grid-toggles u-visible-d">
        View <a href='#' className="c-product-listing__grid-toggle c-product-listing__grid-toggle--disabled">2 </a>
        <a href='#' className="c-product-listing__grid-toggle">4</a>
      </p>
    </div>
  )
}
const ConnectedProductListingInfo = connectStateResults(productListingInfo)

const AlgoliaResults = (hits, hasMore, refine) => {
  const products = groupVariants(hits.hits)

  return (
    <>
      <ConnectedProductListingInfo products={products} />
      <div className="c-product-listing__products">
        { BaseAlgoliaHits(products) }
      </div>
      { LoadMoreHits(hits, hasMore, refine) }
    </>
  )
}

// Groups variants (i.e. hits) by product reference, returns an array of arrays,
// each sub-array is a group of variants
const groupVariants = (hits) => {
  return Object.values(hits.reduce((products, variant) => {
    if (!products[variant.product_reference]) products[variant.product_reference] = []
    products[variant.product_reference].push(variant)
    return products
  }, {}))
}

const AlgoliaHits = connectInfiniteHits(AlgoliaResults)

export { AlgoliaHits, AlgoliaResults, BaseAlgoliaHits }
