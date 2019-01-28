// Libraries
import { Component } from 'react'
import { connectRefinementList } from 'react-instantsearch/connectors'
import { orderBy } from 'lodash'

// Objects
import { Rating } from 'shift-react-components'

class AlgoliaRatingFilter extends Component {
  renderRatingOptions () {
    const { refine, items } = this.props
    return (
      orderBy(items, ['label'], ['desc']).map((item, index) => {
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

export default connectRefinementList(AlgoliaRatingFilter)
