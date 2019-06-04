// Libraries
import React, { Component } from 'react'
import { connectRefinementList } from 'react-instantsearch/connectors'

// Components
import Rating from '../../objects/rating'

class SearchRatingFilter extends Component {
  renderRatingOptions () {
    const { refine, items } = this.props

    // orders Items by label descending
    const orderedItems = items.sort((a, b) => {
      return a['label'] - b['label']
    }).reverse()

    return (
      orderedItems.map((item, index) => {
        return (
          <li key={index} className='ais-RefinementList-item'>
            <label className='ais-RefinementList-label'>
              <input className='ais-RefinementList-checkbox' type='checkbox' checked={item.isRefined} onChange={() => { refine(item.value) }} />
              <span className='ais-RefinementList-labelText'>
                <Rating
                  rating={item.label}
                  className='o-rating__star--has-spacing'
                />
              </span>
              { '' }
              <span className='ais-RefinementList-count'>{ item.count.toLocaleString() }</span>
            </label>
          </li>
        )
      })
    )
  }

  render () {
    return (
      <div className='ais-RefinementList'>
        <ul className='ais-RefinementList-list'>
          { this.renderRatingOptions() }
        </ul>
      </div>
    )
  }
}

export default connectRefinementList(SearchRatingFilter)
