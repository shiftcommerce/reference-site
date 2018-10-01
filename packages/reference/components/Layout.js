// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'

// Objects
import Logo from '../objects/Logo'

// Components
import MiniBag from './MiniBag'
import NavBar from './navigation/NavBar'
import SearchBar from './search/SearchBar'
import CustomHead from './CustomHead'
import Footer from './Footer'

export class Layout extends Component {
  // serviceWorker () {
  //  // Install service worker only in production environment
  //   if (process.env.NODE_ENV === 'production') {
  //    // Registration of service worker
  //     if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
  //       navigator.serviceWorker.getRegistration('/app').then(registration => {
  //        // Check if service worker has already registered
  //        // register only if not yet done
  //         if (registration === undefined) {
  //           navigator.serviceWorker.register('/serviceWorker.js', { scope: '/' }).then(registration => {
  //            // Successfully registered the Service Worker
  //             console.log('Service Worker registration successful with scope: ', registration.scope)
  //           }).catch(err => {
  //            // Failed to register the Service Worker
  //             console.log('Service Worker registration failed: ', err)
  //           })
  //         }
  //       })
  //     } else {
  //       console.log('Service workers are not supported.')
  //     }
  //   }
  // }

  renderNav () {
    return (
      <span className='o-nav'>
        <NavBar />
      </span>
    )
  }

  renderHeaderAccount () {
    return (
      <div className='c-header__account'>
        <div className='c-header__account-button'>
          <div className='c-header__account-label'>
            <a>
              Account
            </a>
          </div>
        </div>
      </div>
    )
  }

  renderHeader () {
    if (typeof window === 'undefined' || window.location.pathname !== '/checkout') {
      return <>
        <CustomHead />
        <div className='o-header'>
          <Logo className='o-header__logo' />
          { this.renderHeaderAccount() }
          <MiniBag />
          { this.renderNav() }
          { this.renderSearch() }
        </div>
      </>
    }
  }

  renderSearch () {
    const { searchObject, onSearchQueryChange } = this.props

    if (typeof window === 'undefined' || window.location.pathname !== '/cart') {
      return <>
        <span className='c-header__search'>
          <SearchBar queryObject={searchObject} onChange={onSearchQueryChange} {...this.props} />
        </span>
      </>
    }
  }

  render () {
    const notCartOrCheckout = /^(?!\/cart|\/checkout).*$/
    const bodyClass = (typeof window === 'undefined' || notCartOrCheckout.test(window.location.pathname)) ? 'o-body' : ''
    return (
      <>
        { this.renderHeader() }
        <div className={bodyClass}>
          { this.props.children }
        </div>
        <div className='o-footer'>
          <Footer />
        </div>
      </>
    )
  }
}

export default connect()(Layout)
