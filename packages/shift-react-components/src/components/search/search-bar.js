// Libraries
import React, { Component } from 'react'
import classNames from 'classnames'
import { connectSearchBox } from 'react-instantsearch-dom'
import debounce from 'lodash/debounce'

class SearchBar extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = { searchTerm: props.currentRefinement }
  }

  handleChange (event) {
    const { refine } = this.props
    const doRefine = () => {
      refine(this.state.searchTerm)
    }

    event.persist()
    this.setState({ searchTerm: event.target.value })
    debounce(doRefine, 500)()
  }

  render () {
    const { filterCategory, onCategoryFilterCleared, placeHolder } = this.props
    const { searchTerm } = this.state

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
