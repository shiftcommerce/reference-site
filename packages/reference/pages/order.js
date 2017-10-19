//  React
import { Component } from 'react'

// Redux
import withRedux from 'next-redux-wrapper'

// Components
import Layout from '../components/Layout'

// Utils
import { configureStore } from '../utils/configureStore'

class OrderPage extends Component {
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
    order: state.order || {}
  }
}

export default withRedux(configureStore, mapStateToProps)(OrderPage)
