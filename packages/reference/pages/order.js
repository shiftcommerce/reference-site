//  React
import { Component } from 'react'

// Redux
import { connect } from 'react-redux'

// Components
import Layout from '../components/Layout'

class OrderPage extends Component {
  static async getInitialProps ({ store, isServer, pathname, query }) {
  }

  render () {
    const order = this.props.order

    if (order.loading) {
      return (
        <Layout>
          <p>Loading...</p>
        </Layout>
      )
    } else if (order.error) {
      return (
        <Layout>
          <p>{order.error}</p>
        </Layout>
      )
    } else {
      return (
        <Layout>
          Order has been created: #{order.id}
        </Layout>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.order
  }
}

export default connect(mapStateToProps)(OrderPage)
