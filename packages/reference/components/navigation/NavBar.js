// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'

// Objects
import NavBarOption from './NavBarOption'

// Actions
import { readCategories } from '../../actions/categoryActions'

class NavBar extends Component {
  componentDidMount () {
    this.props.dispatch(readCategories())
  }

  renderNavOptions (categories) {
    return (
      categories.map((category, index) =>
        <NavBarOption key={index} index={index} title={category.title} href={`/categories/category?id=${category.id}`} as={`/categories/${category.id}`} />
      )
    )
  }

  render () {
    let {
      categories
    } = this.props

    return (
      <div className='o-nav' role='navigation' >
        { this.renderNavOptions(categories) }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories || []
  }
}

export default connect(mapStateToProps)(NavBar)
