// Libraries
import React, { Component } from 'react'
import classNames from 'classnames'

// Lib
import { Footer } from '../layout/footer'
import { Image } from '../../objects/image'
import link from '../../objects/link'
import Logo from '../../objects/logo'
import { Minibag } from '../layout/minibag'
import { NavBar } from '../navigation/navbar'
import SearchBar from '../search/search-bar'
import Config from '../../lib/config'

// Assets
import defaultLogo from '../../static/shopgo-logo.svg'
import accountIcon from '../../static/account-icon.svg'
import imgBagIcon from '../../static/bag-icon.svg'

export class Layout extends Component {
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

  renderHeaderAccount (loggedIn) {
    const Link = Config.get().Link || link
    const signedIn = loggedIn ? 'My Account' : 'Sign In'

    return (
      <div className='c-header__account' onMouseEnter={this.props.toggleDropDown}>
        <Link className='c-header__account-link' href='/account/login'>
          <Image className='c-header__account-image' src={accountIcon} />
          <div className='c-header__account-text'>{ signedIn }</div>
        </Link >
        { this.renderAccountDropDown() }
      </div>
    )
  }

  renderAccountDropDown () {
    const Link = Config.get().Link || link
    const { loggedIn, showClass } = this.props

    const addShowClass = showClass ? 'show' : ''

    if (loggedIn) {
      return (
        <div className={classNames('c-header__dropdown-wrapper', addShowClass)} >
          <div className={classNames('c-header__account-dropdown', addShowClass)} onMouseLeave={this.props.toggleDropDown}>
            <div className='c-header__callout' />
            <Link href='/account/myaccount?menu=details'>Details</Link>
            <Link href='/account/myaccount?menu=addresses'>Addresses</Link>
            <Link href='/account/myaccount?menu=password'>Change Password</Link>
            <Link href='/account/myaccount?menu=orders'>Order History</Link>
            <Link href='/account/logout'>Sign Out</Link>
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  /**
 * Renders the basket icon
 * @param  {number} lineItemsCount
 * @return {string} - HTML markup for the component
 */
  renderCartLink (lineItemsCount) {
    return (
      <span className='c-minibag__cart' onClick={() => this.props.toggleMiniBag(true)}>
        <div className='c-minibag__cart-image'>
          <span className='c-minibag__cart-image-count' >
            { lineItemsCount }
          </span>
          <Image className='c-minibag__cart-image-icon' src={imgBagIcon} />
        </div>
        <span className='c-minibag__cart-label'>Basket</span>
      </span>
    )
  }

  renderBasket () {
    const { cart, className } = this.props
    const lineItemsCount = cart.line_items_count || 0

    return (
      <div className={classNames(className, 'c-header__minibag c-minibag')}>
        { this.renderCartLink(lineItemsCount) }
      </div>
    )
  }

  renderHeader () {
    const { cart, deleteItem, loggedIn, onItemQuantityUpdated, shrunk, logoSrc } = this.props

    const headerClasses = classNames('o-header', {
      'o-header--shrunk': shrunk || cart.miniBagDisplayed
    })

    return (
      <>
        <div className={ headerClasses }>
          <div className='o-header__top'>
            <div className='o-header__top-wrapper'>
              <Logo className='o-header__logo' logoSrc={logoSrc || defaultLogo} />
              { this.renderMobileNav() }
              { this.renderHeaderAccount(loggedIn) }
              { this.renderBasket() }
              <Minibag
                cart={cart}
                deleteItem={deleteItem}
                miniBagDisplayed={cart.miniBagDisplayed}
                onItemQuantityUpdated={onItemQuantityUpdated}
                toggleMiniBag={this.props.toggleMiniBag}
              />
              { this.renderSearch() }
            </div>
          </div>
          { this.renderNav() }
        </div>
      </>
    )
  }

  renderSearch () {
    const {
      search: { filterCategory },
      onCategoryFilterCleared,
      query
    } = this.props

    return (
      <span className='c-header__search'>
        <SearchBar
          filterCategory={filterCategory}
          onCategoryFilterCleared={onCategoryFilterCleared}
          query={query}
        />
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
        { skipHeader ? this.renderHeader() : null }
        <div className={bodyClasses}>
          { children }
        </div>
        <div className='o-footer'>
          <Footer />
        </div>
      </>
    )
  }
}
