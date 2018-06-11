// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'

// Objects
import NavBarOption from './NavBarOption'

class NavBar extends Component {
  renderNavOptions (menuItems) {
    return (
      menuItems.map((menuItem, index) =>
        <NavBarOption key={index} index={index} title={menuItem.title} href={menuItem.canonical_path} as={menuItem.canonical_path} />
      )
    )
  }

  render () {
    const {
      menu
    } = this.props

    const [{ menu_items }] = menu.data

    if (menu.loading) {
      return (
        <p>Loading...</p>
      )
    } else if (menu.error) {
      return (
        <p style={{'textAlign': 'center'}} >
          Sorry! There is an error in loading menus
          {menu.error}
        </p>
      )
    } else {
      return (
        <div className='o-nav' role='navigation' >
          { this.renderNavOptions(menu_items) }
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  // Look into https://github.com/reduxjs/reselect to reduce expensive selectors
  if (!state.menu && !state.menu.data) {
    return {
      menu: {}
    }
  }

  return {
    menu: state.menu || {}
  }
}

export default connect(mapStateToProps)(NavBar)
