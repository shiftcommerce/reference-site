// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'

class Index extends Component {
  render () {
    return (
      <div>Welcome To Shift Commerce Front End React</div>
    )
  }
}

export default connect()(Index)
