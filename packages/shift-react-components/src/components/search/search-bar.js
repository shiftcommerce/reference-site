// Libraries
import React, { Component } from 'react'
import classNames from 'classnames'
import { connectSearchBox } from 'react-instantsearch-dom'

class SearchBar extends Component {
  render () {
    const { currentRefinement, filterCategory, onCategoryFilterCleared, refine, placeHolder, className, buttonClassName, formClassName, children, renderCustomSubmit } = this.props

    return (
      <div className='c-searchbar'>
        <div className='c-searchbar__content'>
          <div className='c-searchbox'>
            <form
              action=''
              className={classNames(formClassName, 'c-searchbox__form')}
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
                className={classNames(className, 'c-searchbox__input', {
                  'c-searchbox__input--with-filter': filterCategory
                })}
                onChange={event => refine(event.currentTarget.value)}
                placeholder={placeHolder || 'Search here…'}
                type='search'
                value={currentRefinement}
              />
              { renderCustomSubmit ? <>{ children }</> : <button
                className={classNames(buttonClassName ? buttonClassName : '', 'c-searchbox__submit')}
                title='Submit your search query.'
                type='submit'
              /> }
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default connectSearchBox(SearchBar)
