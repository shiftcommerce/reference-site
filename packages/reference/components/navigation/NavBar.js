// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'

// Objects
import NavBarOption from './NavBarOption'

class NavBar extends Component {
  renderNavOptions (menuItems) {
    return (
      menuItems.map((menuItems, index) =>
        <NavBarOption key={index} index={index} title={menuItems.title} href={`/categories/menuItems?id=${menuItems.id}`} as={`/categories/${menuItems.id}`} />
      )
    )
  }

  render () {
    const {
      categories
    } = this.props

    const [{ menu_items }] = categories.data

    if (categories.loading) {
      return (
        <p>Loading...</p>
      )
    } else if (categories.error) {
      return (
        <p style={{'textAlign': 'center'}} >
          Sorry! There is an error in loading menus
          {categories.error}
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
  if (!state.categories && !state.categories.data) {
    return {
      categories: {}
    }
  }

  return {
    categories: state.categories || {}
  }
}

export default connect(mapStateToProps)(NavBar)
