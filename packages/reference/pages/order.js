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

    return (
      <Layout>
        Order has been created: #{order.id}
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.order || {}
  }
}

export default withRedux(configureStore, mapStateToProps)(OrderPage)
