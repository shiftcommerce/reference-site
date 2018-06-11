// Libraries
import { Component } from 'react'
import withRedux from 'next-redux-wrapper'

// Utils
import { configureStore } from '../utils/configureStore'

// Actions
import { updateQuantity } from '../actions/cartActions'
import { readMenu } from '../actions/menuActions'

// Components
import Layout from '../components/Layout'
import CartTable from '../components/cart/CartTable.js'

export class CartPage extends Component {
  static async getInitialProps ({ store }) {
    await store.dispatch(readMenu(store))
  }

  constructor (props) {
    super(props)

    this.updateQuantity = this.updateQuantity.bind(this)
  }

  updateQuantity (e) {
    const lineItem = {
      sku: e.target.dataset.variant,
      quantity: parseInt(e.target.value, 10)
    }
    this.props.dispatch(updateQuantity(lineItem))
  }

  render () {
    const cart = this.props.cart

    if (cart.loading) {
      return (
        <Layout>
          <p>loading...</p>
        </Layout>
      )
    } else if (cart.error) {
      return (
        <Layout>
          <p>{cart.error}</p>
        </Layout>
      )
    } else {
      return (
        <Layout>
          <CartTable cart={cart} updateQuantity={this.updateQuantity} />
        </Layout>
      )
    }
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
