// Libraries
import React, { Component } from 'react'

import {
  ClearRefinements,
  CurrentRefinements
} from 'react-instantsearch-dom'

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

class SearchFiltersClearControls extends Component {
  render () {
    return (
      <>
        <ClearRefinements />
        <CurrentRefinements transformItems={tranformRefinementLabels} />
      </>
    )
  }
}

export default SearchFiltersClearControls
