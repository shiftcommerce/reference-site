// Libraries
import React, { Component } from 'react'
import {
  HierarchicalMenu,
  Panel,
  RangeInput,
  RatingMenu,
  RefinementList,
  connectStateResults
} from 'react-instantsearch-dom'


// Components
import SearchRatingFilter from './search-rating-filter'
import SearchSlider from './search-slider'

// Simple header element for category Panels
const header = (headerText) => (<h2>{ headerText }</h2>)
  let facets
const AlgoliaFacets = ({ searchResults }) => {

  if (searchResults) {
    console.log("searchResults._rawResults", searchResults._rawResults)
    if (searchResults._rawResults[0].facets) {
      facets =  [searchResults._rawResults[0].facets]
    }
  }
  console.log(facets)
   return (
    (facets && facets.length) ? facets.map(facet => <RefinementList attribute={facet} /> ) : <div>
      No results has been found
    </div>
    )
}

const ConnectedAlgoliaFacets = connectStateResults(AlgoliaFacets)

class SearchFilters extends Component {
  renderRefinements (facets) {
    if (facets) {
      return (
        <>
          {
            facets.map((facet) => {
              const { source, searchable, aggregation_type, label } = facet
              let filter

              switch (aggregation_type) {
                case 'list':
                  filter = <RefinementList attribute={source} searchable={searchable} showMore={true} limit={3} />
                  break
                case 'hierarchy':
                  filter = <HierarchicalMenu attribute={source} searchable={searchable} />
                  break
                case 'range':
                  filter = <RangeInput attribute={source} />
                  break
                case 'rating':
                  filter = <RatingMenu attribute={source} />
                  break
                default:
                  // no-op
              }

              return (
                <Panel className='c-product-listing-filter__body-option' key={label} header={header(label)}>
                  { filter }
                </Panel>
              )
            })
          }
        </>
      )
    } else {
      return (<ConnectedAlgoliaFacets />)
    }
  }

  render () {
    const { facets } = this.props

    return (
      <>
          { this.renderRefinements(facets) }
      </>
    )
  }
}

export default SearchFilters