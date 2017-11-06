// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'

// Objects
import NavBarOption from './NavBarOption'

class NavBar extends Component {
  renderNavOptions (categories) {
    return (
      categories.data.map((category, index) =>
        <NavBarOption key={index} index={index} title={category.title} href={`/categories/category?id=${category.id}`} as={`/categories/${category.id}`} />
      )
    )
  }

  render () {
    const {
      categories
    } = this.props

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
          { this.renderNavOptions(categories) }
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories || []
  }
}

export default connect(mapStateToProps)(NavBar)
