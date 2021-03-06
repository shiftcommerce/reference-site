// Libraries
import React, { Component } from 'react'
import classNames from 'classnames'
import { connectSearchBox } from 'react-instantsearch-dom'
import debounce from 'lodash/debounce'
import Config from '../../lib/config'

const SEARCH_DEBOUNCE_MS = 800

class SearchBar extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = { searchTerm: props.currentRefinement }
  }

  handleChange (event) {
    const { refine } = this.props
    this.setState({ searchTerm: event.target.value })
    debounce(() => refine(this.state.searchTerm), SEARCH_DEBOUNCE_MS)()
  }

  render () {
    const { filterCategory, onCategoryFilterCleared, placeHolder } = this.props
    const { searchTerm } = this.state

    return (
      <form
        action='/search'
        method="get"
        className='c-searchbox__form'
        noValidate
        onSubmit={e => e.preventDefault()}
        role='search'
      >
        { filterCategory && <div className='c-searchbox__filter'>
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
          name="query"
          onChange={this.handleChange}
          placeholder={ placeHolder || 'Search here…'}
          type='search'
          value={searchTerm}
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
