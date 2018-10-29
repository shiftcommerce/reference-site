// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'

// Components
import Loading from '../../components/loading'
import OrderList from '../../components/orders/list'

// Actions
import { getCustomerOrders } from '../../actions/order-actions'

export class MyAccount extends Component {
  componentDidMount () {
    const { dispatch } = this.props

    dispatch(getCustomerOrders())
  }

  renderOrdersList (orders) {
    if (orders.data.length === 0) {
      return (<p>No previous orders found.</p>)
    }

    return (<OrderList orders={orders} />)
  }

  render () {
    const { orders, orders: { loading } } = this.props

    if (loading) {
      return (
        <Loading />
      )
    } else {
      return (
        <div className='c-order-history'>
          <h1>My Account</h1>
          <div className='c-order-history__nav'>
            <h2>Order History</h2>
          </div>
          { this.renderOrdersList(orders) }
        </div>
      )
    }
  }
}

function mapStateToProps (state) {
  const { login, orders } = state

  return { login, orders }
}

export default connect(mapStateToProps)(MyAccount)
