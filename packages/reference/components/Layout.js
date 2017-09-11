// Libraries
import { Component } from 'react'
import Link from 'next/link'

// objects
import Image from '../objects/Image'

// components
import MiniBag from '../components/MiniBag'
import NavBar from '../components/NavBar'
import SearchBar from '../components/SearchBar'

class Layout extends Component {
  render () {
    return (
      <div>
        <div className='o-header'>
          <span className='o-header__logo'>
            <Link href="/">
              <a>
                <Image width={ 250 } height={ 35 } />
              </a>
            </Link>
          </span>
          <span className='o-header__search'>
            <SearchBar />
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
