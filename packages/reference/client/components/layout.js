// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import classNames from 'classnames'

// Objects
import Logo from '../objects/logo'

// Components
import MiniBag from './mini-bag'
import NavBar from './navigation/navbar'
import SearchBar from './search/search-bar'
import CustomHead from './custom-head'
import Footer from './footer'

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
  constructor (props) {
    super(props)
    this.state = {
      shrunk: false
    }

    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll () {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop

    if (scrollTop > 100 && !this.state.shrunk) {
      this.setState(state => {
        return { shrunk: true }
      })
    } else if (scrollTop <= 100 && this.state.shrunk) {
      this.setState(state => {
        return { shrunk: false }
      })
    }
  }

  renderNav () {
    return (
      <span className='o-nav u-visible-d'>
        <NavBar />
      </span>
    )
  }

  renderMobileNav () {
    return (
      <span className='o-nav u-hidden-d'>
        <NavBar />
      </span>
    )
  }

  renderHeaderAccount () {
    return (
      <div className='c-header__account'>
        <div className='c-header__account-button'>
          <div className='c-header__account-label'>
            <Link href='/account/login'>
              <a>Account</a>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  renderHeader () {
    if (typeof window === 'undefined' || window.location.pathname !== '/checkout') {
      const headerClasses = classNames('o-header', {
        'o-header--shrunk': this.state.shrunk
      })

      return (
        <>
          <CustomHead />
          <div className={ headerClasses }>
            <div className='o-header__top'>
              <div className='o-header__top-wrapper'>
                <Logo className='o-header__logo' />
                { this.renderMobileNav() }
                { this.renderHeaderAccount() }
                <MiniBag />
                { this.renderSearch() }
              </div>
            </div>
            { this.renderNav() }
          </div>
        </>
      )
    }
  }

  renderSearch () {
    const hiddenMobileSearchbar = typeof window !== 'undefined' && window.location.pathname === '/cart'
    const searchClasses = classNames('c-header__search', {
      'u-visible-d': hiddenMobileSearchbar
    })

    return (
      <span className={searchClasses}>
        <SearchBar query={this.props.query} />
      </span>
    )
  }

  render () {
    const notCartOrCheckout = /^(?!\/cart|\/checkout).*$/
    const bodyClassApplied = (typeof window === 'undefined' || notCartOrCheckout.test(window.location.pathname))

    const bodyClasses = classNames({
      'o-body': bodyClassApplied
    })

    return (
      <>
        { this.renderHeader() }
        <div className={bodyClasses}>
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
