//  React
import { Component } from 'react'

// Redux
import { connect } from 'react-redux'

class OrderPage extends Component {
  static async getInitialProps ({ reduxStore, req, query }) {
    return {}
  }

  render () {
    const order = this.props

    if (order.loading) {
      return (
        <p>Loading...</p>
      )
    } else if (order.error) {
      return (
        <p>{ order.error }</p>
      )
    } else {
      return (
        <div>Order has been created: #{ order.id }</div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  const { order } = state
  return order
}

export default connect(mapStateToProps)(OrderPage)
