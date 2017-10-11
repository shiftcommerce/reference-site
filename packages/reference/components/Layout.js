// Libraries
import { Component } from 'react'
import Link from 'next/link'

// Scripts
import Script from './../utils/Script'

// Objects
import Image from '../objects/Image'

// Components
import MiniBag from './MiniBag'
import NavBar from './navigation/NavBar'
import SearchBar from './search/SearchBar'
import CustomHead from './CustomHead'

class Layout extends Component {
  render () {
    let {
      searchObject,
      onSearchQueryChange
    } = this.props

    let serviceWorker = null
    // Install service worker only in production environment
    if (process.env.NODE_ENV === 'production') {
      serviceWorker = <Script>
        {
          () => {
            // Registration of service worker
            if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
              navigator.serviceWorker.getRegistration('/app').then(registration => {
                // Check if service worker has already registered
                // register only if not yet done
                if (registration === undefined) {
                  navigator.serviceWorker.register('/serviceWorker.js', { scope: '/' }).then(registration => {
                    // Successfully registered the Service Worker
                    console.log('Service Worker registration successful with scope: ', registration.scope)
                  }).catch(err => {
                    // Failed to register the Service Worker
                    console.log('Service Worker registration failed: ', err)
                  })
                }
              })
            } else {
              console.log('Service workers are not supported.')
            }
          }
        }
      </Script>
    }

    return (
      <div>
        <CustomHead />
        {serviceWorker}
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
