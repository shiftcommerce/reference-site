// Libraries
import React, { Component } from 'react'
import {
  HierarchicalMenu,
  Panel,
  RatingMenu,
  RefinementList
} from 'react-instantsearch-dom'
import SearchSlider from './search-slider'

// Simple header element for category Panels
const header = (headerText) => (<h2>{ headerText }</h2>)

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
                  filter = <><SearchSlider attribute={source} precision={0} /></>
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