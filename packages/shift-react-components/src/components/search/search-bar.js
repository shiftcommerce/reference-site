// Libraries
import React, { Component } from 'react'
import classNames from 'classnames'
import { connectSearchBox } from 'react-instantsearch-dom'

class SearchBar extends Component {
  render () {
    const { currentRefinement, filterCategory, onCategoryFilterCleared, refine, placeHolder } = this.props

    return (
      <form
        action=''
        className='c-searchbox__form'
        noValidate
        onSubmit={e => e.preventDefault()}
        role='search'
      >
        { filterCategory && <div
          className='c-searchbox__filter'
        >
          <span className='c-searchbox__category-name'>{ filterCategory }</span>
          <div
            className='c-searchbox__clear-filter'
            onClick={onCategoryFilterCleared}
          ></div>
        </div> }
        <input
          className={classNames('c-searchbox__input', {
            'c-searchbox__input--with-filter': filterCategory
          })}
          onChange={event => refine(event.currentTarget.value)}
          placeholder={ placeHolder || 'Search here…'}
          type='search'
          value={currentRefinement}
        />
        <button
          className='c-searchbox__submit'
          title='Submit your search query.'
          type='submit'
        />
      </form>
    )
  }
}

export default connectSearchBox(SearchBar)
