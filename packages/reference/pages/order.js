//  React
import { Component } from 'react'

// Redux
import withRedux from 'next-redux-wrapper'

// Utils
import { configureStore } from '../utils/configureStore'

class OrderPage extends Component {
  render () {
    const order = this.props.order

    return (
      <section>
        Order has been created: #{order.id}
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.order || {}
  }
}

export default withRedux(configureStore, mapStateToProps)(OrderPage)
