// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'

// Components
import Loading from '../loading'
import SearchBar from '../search/search-bar'
import NavBarOption from './navbar-option'

// Objects
import Logo from '../../objects/logo'
import Image from '../../objects/image'

export class NavBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      menuShown: false
    }

    this.toggleMenuShown = this.toggleMenuShown.bind(this)
  }

  toggleMenuShown (e) {
    this.setState(state => {
      return { menuShown: !state.menuShown }
    })
  }

  renderNavOptions (menuItems) {
    return (
      menuItems.map((menuItem, index) =>
        <NavBarOption
          key={index}
          index={index}
          title={menuItem.title}
          href={`/slug?slug=${menuItem.canonical_path}`}
          as={menuItem.canonical_path}
          onClick={this.toggleMenuShown}
        />
      )
    )
  }

  renderNavHeader () {
    return (
      <div className='c-nav__menu-header'>
        <Logo className='c-nav__menu-header-logo' />
        <label htmlFor='burger-menu' className='c-nav__menu-header-cross' onClick={this.toggleMenuShown}/>
      </div>
    )
  }

  renderSearchBar () {
    return (
      <div className='c-nav__menu-header-search'>
        <SearchBar />
      </div>
    )
  }

  renderNavBurgerMenu () {
    return (
      <>
        <input id='burger-menu' type='checkbox' className='c-nav__checkbox' checked={this.state.menuShown}/>
        <div className='c-nav__menu-button'onClick={this.toggleMenuShown} >
          <Image className='c-nav__menu-button-image' src='/static/burger-menu-icon.svg' />
          <p>Menu</p>
        </div>
      </>
    )
  }

  render () {
    const { loading } = this.props.menu.data
    const menu = this.props.menu.data[0]
    const menuItems = menu && menu.menu_items

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
              { this.renderSearchBar() }
              { this.renderNavOptions(menuItems) }
            </div>
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
