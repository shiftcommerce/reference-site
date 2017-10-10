// Libraries
import { Component } from 'react'
import Router from 'next/router'
import qs from 'qs'

// Objects
import Button from '../../objects/Button'

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
        <div className='c-searchbar'>
          <input name='query' value={query.query || ''} onChange={onChange || this.defaultOnChange.bind(this)} type='search' className='c-searchbar--input' aria-label='search text' placeholder='Enter Keyword Or Product Code' />
          <Button label='Search' size='lrg' status='dark' />
        </div>
      </form>
    )
  }
}

export default SearchBar
