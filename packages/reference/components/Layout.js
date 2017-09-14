// Libraries
import { Component } from 'react'
import Link from 'next/link'

// Objects
import Image from '../objects/Image'

// Components
import MiniBag from '../components/MiniBag'
import NavBar from '../components/NavBar'
import SearchBar from '../components/SearchBar'

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
            <Link href='/'>
              <a>
                <Image width={250} height={35} />
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
