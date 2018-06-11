import { Component } from 'react'

export default class CategorySidebar extends Component {
  render () {
    const { id } = this.props

    return <p>HI, I AM TEMPLATE. {id}</p>
  }
}
