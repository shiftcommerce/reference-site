// Libraries
import { Component } from 'react'
import Router from 'next/router'
import qs from 'qs'
import { connect } from 'react-redux'
import { SearchBox } from 'react-instantsearch/dom'

// Actions
import { setSearchQuery } from '../../actions/search-actions'

class SearchBar extends Component {
  constructor (props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
    this.defaultOnChange = this.defaultOnChange.bind(this)
  }

  onSubmit (e) {
    e.preventDefault()
    const query = { query: this.props.query }
    const href = `/search?${qs.stringify(query)}`
    Router.push(href, href)
  }

  defaultOnChange (e) {
    this.props.dispatch(setSearchQuery(e.target.value))
  }

  render () {
    return (
      <div className='c-searchbar'>
        <div className='c-searchbar__content'>
          <SearchBox onSubmit={this.onSubmit} onChange={this.defaultOnChange} />
        </div>
      </div>
    )
  }
}

export default connect()(SearchBar)
