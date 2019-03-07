// Libraries
import React, { Component } from 'react'
import classNames from 'classnames'

// Lib
import componentMapping from '../../lib/component-mapping'

// Assets
import accountIcon from '../../static/account-icon.svg'

export class Layout extends Component {
  constructor (props) {
    super(props)

    this.CustomHead = componentMapping('CustomHead')
    this.Footer = componentMapping('Footer')
    this.Image = componentMapping('Image')
    this.Link = componentMapping('Link')
    this.Logo = componentMapping('Logo')
    this.Minibag = componentMapping('Minibag')
    this.NavBar = componentMapping('NavBar')
    this.SearchBar = componentMapping('SearchBar')
  }

  renderNav () {
    return (
      <span className='o-nav u-visible-d'>
        <this.NavBar menu={this.props.menu} />
      </span>
    )
  }

  renderMobileNav () {
    return (
      <span className='o-nav u-hidden-d'>
        <this.NavBar menu={this.props.menu} />
      </span>
    )
  }

  renderHeaderAccount (loggedIn) {
    const signedIn = loggedIn ? 'My Account' : 'Sign In'

    return (
      <div className='c-header__account' onClick={this.props.toggleDropDown}>
        <this.Image className='c-header__account-image' src={accountIcon} />
        <this.Link href='/account/login'><a>{ signedIn }</a></this.Link>
        { this.renderAccountDropDown() }
      </div>
    )
  }

  renderAccountDropDown () {
    const { loggedIn, showClass } = this.props

    const addShowClass = showClass ? 'show' : ''

    if (loggedIn) {
      return (
        <div className={classNames('c-header__dropdown-wrapper', addShowClass)} >
          <div className={classNames('c-header__account-dropdown', addShowClass)} >
            <div className='c-header__callout' />
            <this.Link href='/account/myaccount'>Order History</this.Link>
            <this.Link href='/account/forgotpassword'>Change Password</this.Link>
            <this.Link href='/account/logout'>Sign Out</this.Link>
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  renderHeader () {
    const { cart, loggedIn, shrunk } = this.props

    const headerClasses = classNames('o-header', {
      'o-header--shrunk': shrunk
    })

    return (
      <>
        <this.CustomHead />
        <div className={ headerClasses }>
          <div className='o-header__top'>
            <div className='o-header__top-wrapper'>
              <this.Logo className='o-header__logo' />
              { this.renderMobileNav() }
              { this.renderHeaderAccount(loggedIn) }
              <this.Minibag cart={cart} />
              { this.renderSearch() }
            </div>
          </div>
          { this.renderNav() }
        </div>
      </>
    )
  }

  renderCheckoutHeader () {
    return (
      <this.CustomHead />
    )
  }

  renderSearch () {
    return (
      <span className='c-header__search'>
        <this.SearchBar query={this.props.query} />
      </span>
    )
  }

  render () {
    const { skipHeader, children } = this.props

    const bodyClasses = classNames({
      'o-body': skipHeader
    })

    return (
      <>
        { skipHeader ? this.renderHeader() : this.renderCheckoutHeader() }
        <div className={bodyClasses}>
          { children }
        </div>
        <div className='o-footer'>
          <this.Footer />
        </div>
      </>
    )
  }
}

export default Layout