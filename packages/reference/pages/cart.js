// Libraries
import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'

// Utils
import { configureStore } from '../utils/configureStore'

// Actions
import { readCart } from '../actions/cartActions'

// Components
import Layout from '../components/Layout'
import CartTable from '../components/cartTable.js'

class CartPage extends Component {
  componentDidMount () {
    this.props.dispatch(readCart())
  }

  render () {
    let cart = this.props.cart
    return (
      <Layout>
        <h1>
          My Bag
        </h1>
        {cart.lineItems.length} item in your bag
        <CartTable cart={cart} />
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart || {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  }
}

export default withRedux(configureStore, mapStateToProps, mapDispatchToProps)(CartPage)
