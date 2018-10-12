// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'

// Actions
import { updateQuantity } from '../actions/cartActions'

// Components
import CartTable from '../components/cart/CartTable'
import Loading from '../components/Loading'

export class CartPage extends Component {
  constructor (props) {
    super(props)

    this.updateQuantity = this.updateQuantity.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
  }

  updateQuantity (e) {
    const lineItem = {
      sku: e.target.dataset.variant,
      quantity: parseInt(e.target.value, 10)
    }
    this.props.dispatch(updateQuantity(lineItem))
  }

  deleteItem (e) {
    e.preventDefault()
    const lineItem = {
      sku: e.target.dataset.variant,
      quantity: 0
    }
    this.props.dispatch(updateQuantity(lineItem))
  }

  render () {
    const { cart, cart: { loading, error } } = this.props

    if (loading) {
      return (
        <Loading />
      )
    } else if (error) {
      return (
        <p>{ error }</p>
      )
    } else {
      return (
        <CartTable cart={cart} updateQuantity={this.updateQuantity} deleteItem={this.deleteItem} />
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  }
}

export default connect(mapStateToProps)(CartPage)
