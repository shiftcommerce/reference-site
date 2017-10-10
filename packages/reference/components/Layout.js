// Libraries
import { Component } from 'react'
import Link from 'next/link'

// Objects
import Image from '../objects/Image'

// Components
import MiniBag from './MiniBag'
import NavBar from './navigation/NavBar'
import SearchBar from './search/SearchBar'

class Layout extends Component {
  render () {
    let {
      searchObject,
      onSearchQueryChange
    } = this.props

    return (
      <div>
        <div className='o-header'>
          <span className='o-header__logo'>
            <Link href='/home/index' as='/'>
              <a>
                <Image width={52} height={59} src='/static/logo.svg' />
              </a>
            </Link>
          </span>
          <span className='o-header__search'>
            <SearchBar queryObject={searchObject} onChange={onSearchQueryChange} {...this.props} />
          </span>
          <span className='o-header__minibag'>
            <MiniBag />
          </span>
        </div>

        <NavBar />

        <div className='o-body'>
          { this.props.children }
        </div>

        <div className='o-footer'>
          Footer
        </div>
      </div>
    )
  }
}

export default Layout
