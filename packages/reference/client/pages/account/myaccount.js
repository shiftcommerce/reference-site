// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'

// Components
import Loading from '../../components/loading'
import OrderList from '../../components/orders/list'

// Objects
import Button from '../../objects/button'

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

  renderLogout () {
    return (
      <div className='c-order-history__banner-button'>
        <Link href='/account/logout'>
          <Button
            aria-label='Logout'
            className='c-order-history__banner-button-icon o-button--sml'
            label='Logout'
            status='secondary'
          />
        </Link>
      </div>
    )
  }

  renderAccountBanner () {
    return (
      <>
        <div className='c-order-history__banner'>
          <h1>My Account</h1>
          { this.renderLogout() }
        </div>
        <div className='c-order-history__nav'>
          <h2>Order History</h2>
        </div>
      </>
    )
  }

  render () {
    const { orders, orders: { loading } } = this.props

    if (loading) {
      return (
        <div className='c-order-history'>
          { this.renderAccountBanner() }
          <Loading />
        </div>
      )
    } else {
      return (
        <div className='c-order-history'>
          { this.renderAccountBanner() }
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
