import { Component } from 'react'
import Link from 'next/link'

class SearchBar extends Component {
  render () {
    return <span role='search' >
      <input type='search' aria-label='search text' placeholder='Search...' />
      <Link href='/search'><a className='c-button c-button--lrg'>Search</a></Link>
    </span>
  }
}

export default SearchBar
