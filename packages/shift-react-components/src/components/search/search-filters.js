// Libraries
import React, { Component } from 'react'
import {
  ClearRefinements,
  CurrentRefinements,
  HierarchicalMenu,
  Panel,
  RangeInput,
  RatingMenu,
  RefinementList
} from 'react-instantsearch-dom'
import classNames from 'classnames'

// Components
import SearchRatingFilter from './search-rating-filter'
import SearchSlider from './search-slider'

// For refinements such as ratings and prices, we will transform the list
// so that we put the label within the button. We will also set the value
// function so we can clear the refinement
const tranformRefinementLabels = (items) => {
  return items.map(item => {
    item.label = formatRefinementLabel(item)
    if (item.items === undefined) {
      item.items = new Array({ label: item.label, value: item.value })
    }
    return item
  })
}

// Pass the correct label format for the refinement strings in current Refinements
const formatRefinementLabel = (item) => {
  let newLabel = item.label
  const labelParts = newLabel.split('<=')
  const isRating = newLabel.includes('rating')

  if (isRating) {
    newLabel = '> ' + labelParts[0] + ' stars'
  } else if (labelParts.length === 3) {
    newLabel = '£' + labelParts[0].trim() + ' ~ £' + labelParts[2].trim()
  } else if (labelParts[0] > 0) {
    newLabel = '> £' + labelParts[0].trim()
  } else if (labelParts[1] > 0) {
    newLabel = '< £' + labelParts[1].trim()
  }

  return newLabel
}

// Simple header element for category Panels
const header = (headerText) => (<h2>{ headerText }</h2>)

export default class SearchFilters extends Component {
  renderRefinements (facets) {
    if (facets) {
      return (
        <>
          {
            facets.map((facet) => {
              const { source, searchable, aggregation_type, label } = facet
              let filter;

              switch (aggregation_type) {
                case 'list':
                  filter = <RefinementList attribute={source} searchable={searchable} showMore={true} limit={3} />
                  break;
                case 'hierarchy':
                  filter = <HierarchicalMenu attribute={source} searchable={searchable} />
                  break;
                case 'range':
                  filter = <RangeInput attribute={source} />
                  break;
                case 'rating':
                  filter = <RatingMenu attribute={source} />
                  break;
                default:
                  // no-op
              }

              return (
                <Panel className='c-product-listing-filter__body-option' key={label} header={header(label)}>
                  {filter}
                </Panel>
              )
            })
          }
        </>
      )
    }
  }

  render () {
    const { filtersShown, toggleFiltering, facets } = this.props

    return (
      <>
        <div className={classNames('c-product-listing-filter-heading', { 'c-product-listing-filter-heading--hide': !filtersShown })}>
          <h2>
            Filters
            <button className='c-product-listing-filter-close' onClick={toggleFiltering} />
          </h2>
        </div>
        <div className={classNames('c-product-listing-filter', { 'c-product-listing-filter--hide': !filtersShown })}>
          <div className='c-product-listing-filter__header'>
            <ClearRefinements />
            <CurrentRefinements transformItems={tranformRefinementLabels} />
          </div>
          { this.renderRefinements(facets) }
          <Panel className='c-product-listing-filter__body-option' header={header('Rating')}>
            <SearchRatingFilter attribute='product_rating' min={0} max={5} />
          </Panel>
          <Panel className='c-product-listing-filter__body-option' header={header('Price')}>
            <SearchSlider attribute='current_price' precision={0} formatLabel={value => `£${value}`} />
          </Panel>
        </div>
      </>
    )
  }
}
