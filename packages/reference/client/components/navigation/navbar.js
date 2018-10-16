// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'

// Components
import Loading from '../loading'
import SearchBar from '../search/search-bar'
import NavBarOption from './navbar-option'

// Objects
import Logo from '../../objects/logo'
import Button from '../../objects/button'

export class NavBar extends Component {
  renderNavOptions (menuItems) {
    return (
      menuItems.map((menuItem, index) =>
        <NavBarOption key={index} index={index} title={menuItem.title} href={`/slug?slug=${menuItem.canonical_path}`} as={menuItem.canonical_path} />
      )
    )
  }

  renderNavHeader () {
    return (
      <div className='c-nav__menu-header'>
        <label htmlFor='burger-menu' className='c-nav__menu-header-cross' />
        <Logo className='c-nav__menu-header-logo' />
        <div className='c-nav__menu-header-search'>
          <SearchBar />
        </div>
      </div>
    )
  }

  renderNavBurgerMenu () {
    return (
      <>
        <input id='burger-menu' type='checkbox' className='c-nav__checkbox' />
        <div className='c-nav__menu-button'>
          <label htmlFor='burger-menu' className='c-nav__menu-button-icon'>
            <p>Menu</p>
          </label>
        </div>
      </>
    )
  }

  renderNavFooterEmail () {
    return (
      <div className='c-nav__menu-footer-email'>
        <div className='c-nav__menu-footer-email-text'>
          <p>Want to receive the latest news and offers from ShopGo?</p>
        </div>
        <div className='c-nav__menu-footer-email-input'>
          <p>Enter your email address here</p>
          <Button className='c-nav__menu-footer-email-button' label='yes please' status='primary' size='lrg'/>
        </div>
      </div>
    )
  }

  renderNavFooter () {
    return (
      <div className='c-nav__menu-footer'>
        { this.renderNavFooterEmail() }
        <div className='c-nav__menu-footer-content'>
          <div className='c-nav__menu-footer-links'>
            <a className='c-nav__menu-footer-link-first'>FAQs</a>
            <a>About</a><a>Delivery</a><a>Stores</a><a>Contact</a>
          </div>
          <div className='c-nav__menu-footer-social'>
            <div className='c-nav__menu-footer-social-text'>
              <a>Connect with ShopGo</a>
            </div>
            <div className='c-nav__menu-footer-social-links'>
              <div className='c-nav__menu-footer-social-link c-nav__menu-footer-social-link--facebook' />
              <div className='c-nav__menu-footer-social-link c-nav__menu-footer-social-link--instagram' />
              <div className='c-nav__menu-footer-social-link c-nav__menu-footer-social-link--twitter' />
            </div>
          </div>
        </div>
      </div>
    )
  }

  render () {
    const { loading } = this.props.menu.data
    const menu = this.props.menu.data[0]
    const menuItems = menu.menu_items

    if (loading) {
      return (<Loading />)
    } else if (menu.error) {
      return (<p className='c-nav__error'>Sorry! There is an error in loading menus { menu.error }</p>)
    } else {
      return (
        <div className='c-nav' role='navigation'>
          { this.renderNavBurgerMenu() }
          <div className='c-nav__menu'>
            { this.renderNavHeader() }
            <div className='c-nav__menu-list'>
              { this.renderNavOptions(menuItems) }
            </div>
            { this.renderNavFooter() }
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps (state) {
  const { menu } = state
  return { menu }
}

export default connect(mapStateToProps)(NavBar)
