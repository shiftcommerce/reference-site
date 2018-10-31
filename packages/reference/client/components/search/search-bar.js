// Libraries
import { Component } from 'react'
import Router from 'next/router'
import qs from 'qs'
import { connect } from 'react-redux'

// Actions
import { setSearchQuery } from '../../actions/search-actions'

// Objects
import Button from '../../objects/button'

class SearchBar extends Component {
  onSubmit (e) {
    if (Router.router.pathname === '/search') {
      e.preventDefault()
      const query = { query: this.props.query }
      const href = `/search?${qs.stringify(query)}`
      Router.push(href, href)
    }
  }

  defaultOnChange (e) {
    this.props.dispatch(setSearchQuery(e.target.value))
  }

  render () {
    const { query } = this.props

    return (
      <form role='search' onSubmit={this.onSubmit.bind(this)} action='/search' method='get' >
        <div className='c-searchbar'>
          <div className='c-searchbar__content'>
            <input
              name='query'
              value={query || ''}
              onChange={this.defaultOnChange.bind(this)}
              type='search'
              className='c-searchbar__input'
              aria-label='search text'
              placeholder='Search our catalog...'
            />
            <div className='c-searchbar__input-icon'>
              <Button className='c-searchbar__input-button' label='Search' status='primary' />
            </div>
          </div>
        </div>
      </form>
    )
  }
}

function mapStateToProps (state) {
  const { search } = state

  return { search }
}

export default connect(mapStateToProps)(SearchBar)
