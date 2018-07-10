// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'

import Loading from '../Loading'

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
    const {loading} = this.props.menu.data
    const menu = this.props.menu.data[0]

    const menuItems = menu.menu_items

    if (loading) {
      return (
        <Loading />
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

function mapStateToProps (state) {
  const { menu } = state
  return { menu }
}

export default connect(mapStateToProps)(NavBar)
