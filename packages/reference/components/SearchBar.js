// Libraries
import { Component } from 'react'
import Router from 'next/router'
import qs from 'qs'

class SearchBar extends Component {
  constructor () {
    super()

    this.state = {
      query: ''
    }
  }

  onSubmit (e) {
    if (Router.router.pathname === '/search') {
      e.preventDefault()
      let query = { query: this.props.queryObject.query }
      let href = `/search?${qs.stringify(query)}`
      Router.push(href, href, {shallow: false})
    }
  }

  defaultOnChange (e) {
    this.setState({ query: e.target.value })
  }

  render () {
    let {
      queryObject,
      onChange
    } = this.props

    let query = {
      query: (queryObject ? queryObject.query : this.state.query)
    }

    return (
      <form role='search' onSubmit={this.onSubmit.bind(this)} action='/search' method='get' >
        <input name='query' value={query.query || ''} onChange={onChange || this.defaultOnChange.bind(this)} type='search' aria-label='search text' placeholder='Search...' />
        <button type='submit' className='c-button c-button--lrg'>Search</button>
      </form>
    )
  }
}

export default SearchBar
