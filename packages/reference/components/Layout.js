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

class Layout extends Component {
  serviceWorker () {
    // Install service worker only in production environment
    if (process.env.NODE_ENV === 'production') {
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

  renderHeader () {
    if (typeof window === 'undefined' || window.location.pathname !== '/checkout') {
      const {
        searchObject,
        onSearchQueryChange
      } = this.props

      return <div>
        <CustomHead />
        {this.serviceWorker()}
        <div className='o-header'>
          <Logo className='o-header__logo' />
          <span className='o-header__search'>
            <SearchBar queryObject={searchObject} onChange={onSearchQueryChange} {...this.props} />
          </span>
          <span className='o-header__minibag'>
            <MiniBag />
          </span>
        </div>

        <NavBar />
      </div>
    }
  }

  render () {
    return (
      <div>
        {this.renderHeader()}
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

export default connect()(Layout)
