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
    const menu = this.props.menu.data.data[0]

    const menuItems = menu.menu_items

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
          { this.renderNavOptions(menuItems) }
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
