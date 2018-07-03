// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'

// Actions
import { updateQuantity } from '../actions/cartActions'

// Components
import CartTable from '../components/cart/CartTable.js'

export class CartPage extends Component {
  static async getInitialProps ({ store, isServer, pathname, query }) {
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
        <p>loading...</p>
      )
    } else if (cart.error) {
      return (
        <p>{cart.error}</p>
      )
    } else {
      return (
        <CartTable cart={cart} updateQuantity={this.updateQuantity} />
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)
