// Libraries
import { orderBy } from 'lodash'
import { Component } from 'react'
import {
  RefinementList,
  CurrentRefinements,
  ClearRefinements,
  Panel
} from 'react-instantsearch-dom'
import classNames from 'classnames'

// Components
import AlgoliaSlider from './algolia-slider'
import AlgoliaRatingFilter from './algolia-rating-filter'

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

const maintainRefinementOrder = (items) => (
  orderBy(items, ['label'], ['asc'])
)

// Simple header element for category Panels
const header = (headerText) => (<h2>{ headerText }</h2>)

class AlgoliaFilters extends Component {
  render () {
    const { showFilters, toggleFiltering } = this.props

    return (
      <div className={classNames('c-product-listing-filter', { 'c-product-listing-filter--hide': !showFilters })}>
        <div className='c-product-listing-filter__header'>
          <div className='c-product-listing-filter__header-title'>
            <h2>
              Filters
            </h2>
            <button className='c-product-listing-filter-close' onClick={toggleFiltering} />
          </div>
          <div className='c-product-listing-filter__header-selection'>
            <ClearRefinements />
            <CurrentRefinements transformItems={tranformRefinementLabels} />
          </div>
        </div>
        <Panel className="c-product-listing-filter__body-option" header={header('Sub Category')} >
          <RefinementList attribute='category_ids' showMore={true} limit={3} transformItems={maintainRefinementOrder} />
        </Panel>
        <Panel className="c-product-listing-filter__body-option" header={header('Rating')}>
          <AlgoliaRatingFilter attributeName='product_rating' min={0} max={5}/>
        </Panel>
        <Panel className="c-product-listing-filter__body-option" header={header('Price')}>
          <AlgoliaSlider attribute='variant_meta_data.eu.price' precision={0} formatLabel={value => `£${value}`} />
        </Panel>
      </div>
    )
  }
}

export default AlgoliaFilters
