import { Component } from 'react'
import { connect } from 'react-redux'

class CategorySidebar extends Component {
  render () {
    const { id } = this.props

    return <p>HI, I AM TEMPLATE. {id}</p>
  }
}

export default connect()(CategorySidebar)
