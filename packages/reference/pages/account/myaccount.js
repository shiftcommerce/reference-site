// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'

export class MyAccount extends Component {
  render () {
    return (
      <div>
        <h1>My Account</h1>
      </div>
    )
  }
}

export default connect()(MyAccount)
