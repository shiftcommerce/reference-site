// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'
import t from 'typy'

// Components
import { Image, Loading, Logo, NavBarOption, SearchBar } from 'shift-react-components'

export class NavBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      menuShown: false
    }

    this.toggleMenuShown = this.toggleMenuShown.bind(this)
  }

  toggleMenuShown (e) {
    if (this.state.menuShown) {
      document.body.classList.remove('modal-open')
    } else {
      document.body.classList.add('modal-open')
    }

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
    const logoSrc = '../../static/shopgo-logo.svg'

    return (
      <div className='c-nav__menu-header'>
        <Logo className='c-nav__menu-header-logo' logoSrc={logoSrc} />
        <label htmlFor='burger-menu' className='c-nav__menu-header-cross' onClick={this.toggleMenuShown} />
        { this.renderSearchBar() }
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
        <input id='burger-menu' type='checkbox' className='c-nav__checkbox' checked={this.state.menuShown} readOnly />
        <div className='c-nav__menu-button' onClick={this.toggleMenuShown} >
          <Image className='c-nav__menu-button-image' src='/static/burger-menu-icon.svg' />
          <p>Menu</p>
        </div>
      </>
    )
  }

  render () {
    const { loading, error } = this.props.menu
    const menuItems = t(this.props, 'menu.menu_items').safeObject

    if (loading) {
      return (<Loading />)
    } else if (error) {
      return (<p className='c-nav__error'>Sorry! There is an error in loading menus { error }</p>)
    } else {
      return (
        <div className='c-nav' role='navigation'>
          { this.renderNavBurgerMenu() }
          { this.renderNavHeader() }
          <div className='c-nav__menu'>
            <div className='c-nav__menu-list'>
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
