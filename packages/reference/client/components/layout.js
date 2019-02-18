// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import classNames from 'classnames'

// Objects
import { Footer, Image, Logo, NavBar, SearchBar } from 'shift-react-components'

// Components
import MiniBag from './mini-bag'
import CustomHead from './custom-head'

// Stylesheet
import '../scss/main.scss'

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
      shrunk: false,
      toggleShowClass: false
    }

    this.handleScroll = this.handleScroll.bind(this)
    this.toggleDropDown = this.toggleDropDown.bind(this)
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll () {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    if (scrollTop > 40 && !this.state.shrunk) {
      this.setState(state => {
        return { shrunk: true }
      })
    } else if (scrollTop <= 40 && this.state.shrunk) {
      this.setState(state => {
        return { shrunk: false }
      })
    }
  }

  renderNav () {
    return (
      <span className='o-nav u-visible-d'>
        <NavBar menu={this.props.menu} />
      </span>
    )
  }

  renderMobileNav () {
    return (
      <span className='o-nav u-hidden-d'>
        <NavBar menu={this.props.menu} />
      </span>
    )
  }

  toggleDropDown () {
    const toggleShow = this.state.toggleShowClass
    this.setState({ toggleShowClass: !toggleShow })
  }

  renderHeaderAccount (loggedIn) {
    const signedIn = loggedIn ? 'My Account' : <Link href='/account/login'><a>Sign In</a></Link>

    return (
      <div className='c-header__account' onClick={ this.toggleDropDown } >
        <Image className='c-header__account-image' src='/static/account-icon.svg' />
        { signedIn }
        { this.renderAccountDropDown() }
      </div>
    )
  }

  renderAccountDropDown () {
    const showClass = this.state.toggleShowClass
    const { loggedIn } = this.props

    const addShowClass = showClass ? 'show' : ''

    if (loggedIn) {
      return (
        <div className={classNames('c-header__dropdown-wrapper', addShowClass)} >
          <div className={classNames('c-header__account-dropdown', addShowClass)} >
            <div className='c-header__callout' />
            <Link href='/account/myaccount'>Order History</Link>
            <Link href='/account/forgotpassword'>Change Password</Link>
            <Link href='/account/logout'>Sign Out</Link>
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  renderHeader () {
    const { loggedIn } = this.props
    const logoSrc = '../static/shopgo-logo.svg'

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
                <Logo className='o-header__logo' logoSrc={logoSrc} />
                { this.renderMobileNav() }
                { this.renderHeaderAccount(loggedIn) }
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
    return (
      <span className='c-header__search'>
        <SearchBar query={this.props.query} />
      </span>
    )
  }

  render () {
    const notCheckout = /^(?!\/checkout).*$/
    const bodyClassApplied = (typeof window === 'undefined' || notCheckout.test(window.location.pathname))

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

function mapStateToProps (state) {
  const { login, menu } = state

  return { login, menu }
}

export default connect(mapStateToProps)(Layout)
